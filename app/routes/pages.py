"""
Server-side HTML Page Renderers using Jinja2 Templates
"""

from fastapi import APIRouter, Request, Query, HTTPException
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates
from typing import Optional

from ..config import TEMPLATES_DIR
from ..services.bis_retriever import get_retriever
from ..database.repositories import get_standards_repository
from ..services.calculator_service import get_calculator_service
from ..services.verifier_service import get_verification_service
from ..utils.helpers import format_inr, truncate_text

router = APIRouter(tags=["Pages"])
templates = Jinja2Templates(directory=str(TEMPLATES_DIR))

# Register Jinja2 template filters
templates.env.filters["format_inr"] = format_inr
templates.env.filters["truncate_text"] = truncate_text


@router.get("/", response_class=HTMLResponse)
async def home_page(request: Request):
    repo = get_standards_repository()
    standards_count = len(repo.get_all()) or 572
    return templates.TemplateResponse(
        request=request,
        name="index.html",
        context={
            "active_tab": "home",
            "standards_count": standards_count,
            "qco_count": 760,
            "labs_count": 1200,
            "clubs_count": 10000,
        }
    )


@router.get("/standards", response_class=HTMLResponse)
@router.get("/standards/search", response_class=HTMLResponse)
async def standards_page(
    request: Request,
    q: Optional[str] = Query(None, description="Search query"),
    category: Optional[str] = Query(None, description="Technical division filter"),
    qco_only: bool = Query(False, description="Filter only mandatory QCO standards"),
    page: int = Query(1, ge=1)
):
    repo = get_standards_repository()
    retriever = get_retriever()
    categories = repo.list_categories()

    query_str = (q or "").strip()
    if query_str:
        raw_results = retriever.retrieve(query_str, top_k=50)
    else:
        # Default listing
        if category and category.upper() != "ALL":
            raw_docs = repo.filter_by_category(category)
        else:
            raw_docs = repo.get_all()

        raw_results = [
            {
                "is_number": d.get("standard", ""),
                "title": d.get("title", ""),
                "category": d.get("category", "General"),
                "description": d.get("description", ""),
                "scope": d.get("scope", ""),
                "relevance_score": 1.0,
                "mandatory_qco": d.get("mandatory_qco", False),
                "source": d.get("source", "BIS Catalogue")
            }
            for d in raw_docs
        ]

    # Filter by category if searching
    if category and category.upper() != "ALL":
        cat_lower = category.lower()
        raw_results = [r for r in raw_results if cat_lower in r.get("category", "").lower()]

    # Filter by QCO only if toggled
    if qco_only:
        raw_results = [r for r in raw_results if r.get("mandatory_qco")]

    # Simple pagination: 15 items per page
    items_per_page = 15
    total_items = len(raw_results)
    total_pages = max(1, (total_items + items_per_page - 1) // items_per_page)
    page = min(page, total_pages)
    start_idx = (page - 1) * items_per_page
    end_idx = start_idx + items_per_page
    paged_results = raw_results[start_idx:end_idx]

    return templates.TemplateResponse(
        request=request,
        name="standards.html",
        context={
            "active_tab": "standards",
            "query": query_str,
            "selected_category": category or "All",
            "qco_only": qco_only,
            "categories": categories,
            "results": paged_results,
            "total_results": total_items,
            "current_page": page,
            "total_pages": total_pages,
        }
    )


@router.get("/standards/{is_code:path}", response_class=HTMLResponse)
async def standard_detail_page(request: Request, is_code: str):
    repo = get_standards_repository()
    doc = repo.get_by_is_number(is_code)
    if not doc:
        # Try search query if exact number failed
        retriever = get_retriever()
        results = retriever.retrieve(is_code, top_k=1)
        if results:
            doc = repo.get_by_is_number(results[0]["is_number"])

    if not doc:
        raise HTTPException(
            status_code=404,
            detail=f"Indian Standard '{is_code}' was not found in the indexed compendium."
        )

    # Calculate fee relief preview for micro enterprises
    calc_service = get_calculator_service()
    cost_preview = calc_service.estimate_cost(doc.get("standard", is_code), enterprise_type="micro")

    return templates.TemplateResponse(
        request=request,
        name="standard_detail.html",
        context={
            "active_tab": "standards",
            "standard": doc,
            "cost_preview": cost_preview,
        }
    )


@router.get("/calculator", response_class=HTMLResponse)
@router.get("/msme", response_class=HTMLResponse)
async def calculator_page(
    request: Request,
    standard: Optional[str] = Query(None, description="Preselected IS standard"),
    tier: str = Query("micro", description="Default enterprise tier")
):
    calc_service = get_calculator_service()
    default_standard = (standard or "IS 1489 (PPC Cement)").strip()
    calculation = calc_service.estimate_cost(default_standard, enterprise_type=tier)

    return templates.TemplateResponse(
        request=request,
        name="calculator.html",
        context={
            "active_tab": "calculator",
            "preselected_standard": default_standard,
            "selected_tier": tier,
            "calculation": calculation,
        }
    )


@router.get("/verify", response_class=HTMLResponse)
@router.get("/consumer", response_class=HTMLResponse)
async def verifier_page(
    request: Request,
    cml: Optional[str] = Query(None, description="CM/L license number to verify"),
    huid: Optional[str] = Query(None, description="HUID gold hallmark code to verify")
):
    verifier = get_verification_service()
    active_subtab = "huid" if huid else "cml"
    verification_result = None

    if cml:
        active_subtab = "cml"
        verification_result = verifier.verify_identifier(cml, id_type="cml")
    elif huid:
        active_subtab = "huid"
        verification_result = verifier.verify_identifier(huid, id_type="huid")

    return templates.TemplateResponse(
        request=request,
        name="verifier.html",
        context={
            "active_tab": "verify",
            "subtab": active_subtab,
            "cml_query": cml or "",
            "huid_query": huid or "",
            "result": verification_result,
        }
    )


@router.get("/chatbot", response_class=HTMLResponse)
@router.get("/manakbot", response_class=HTMLResponse)
async def chatbot_page(
    request: Request,
    prompt: Optional[str] = Query(None, description="Initial prompt query")
):
    return templates.TemplateResponse(
        request=request,
        name="chatbot.html",
        context={
            "active_tab": "chatbot",
            "initial_prompt": prompt or "",
        }
    )


@router.get("/report", response_class=HTMLResponse)
@router.get("/grievance", response_class=HTMLResponse)
async def report_page(
    request: Request,
    cml: Optional[str] = Query(None),
    huid: Optional[str] = Query(None),
    reason: Optional[str] = Query(None)
):
    identifier = cml or huid or ""
    return templates.TemplateResponse(
        request=request,
        name="report.html",
        context={
            "active_tab": "report",
            "prefilled_identifier": identifier,
            "prefilled_reason": reason or "",
        }
    )


@router.get("/about", response_class=HTMLResponse)
async def about_page(request: Request):
    return templates.TemplateResponse(
        request=request,
        name="about.html",
        context={
            "active_tab": "about",
        }
    )


@router.get("/services", response_class=HTMLResponse)
async def services_page(request: Request):
    return templates.TemplateResponse(
        request=request,
        name="services.html",
        context={
            "active_tab": "services",
        }
    )


@router.get("/faq", response_class=HTMLResponse)
async def faq_page(request: Request):
    return templates.TemplateResponse(
        request=request,
        name="faq.html",
        context={
            "active_tab": "faq",
        }
    )
