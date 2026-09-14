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
from ..services.lab_service import get_lab_service
from ..services.hallmarking_service import get_hallmarking_service
from ..services.certification_service import get_certification_service
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
            "labs_count": 12,
            "total_standards_scope": "21,000+",
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

    # Assign relevance badges
    for r in raw_results:
        score = r.get("relevance_score", 0.0)
        if score >= 0.75:
            r["badge"] = "Highly Relevant"
        elif score >= 0.45:
            r["badge"] = "Potentially Relevant"
        else:
            r["badge"] = "Related"

    # Filter by category if searching
    if category and category.upper() != "ALL":
        cat_lower = category.lower()
        raw_results = [r for r in raw_results if cat_lower in r.get("category", "").lower()]

    # Filter by QCO only if toggled
    if qco_only:
        raw_results = [r for r in raw_results if r.get("mandatory_qco")]

    # Pagination: 12 standards per page
    PAGE_SIZE = 12
    total_count = len(raw_results)
    total_pages = max((total_count + PAGE_SIZE - 1) // PAGE_SIZE, 1)
    current_page = min(page, total_pages)
    start_idx = (current_page - 1) * PAGE_SIZE
    paginated_results = raw_results[start_idx: start_idx + PAGE_SIZE]

    return templates.TemplateResponse(
        request=request,
        name="standards.html",
        context={
            "active_tab": "standards",
            "standards": paginated_results,
            "total_results": total_count,
            "categories": categories,
            "query": query_str,
            "selected_category": category or "All",
            "qco_only": qco_only,
            "current_page": current_page,
            "total_pages": total_pages,
            "has_prev": current_page > 1,
            "has_next": current_page < total_pages,
            "prev_page": current_page - 1,
            "next_page": current_page + 1,
        }
    )


@router.get("/recommend", response_class=HTMLResponse)
@router.get("/recommendation", response_class=HTMLResponse)
async def recommend_page(
    request: Request,
    product: Optional[str] = Query(None, description="Product description")
):
    retriever = get_retriever()
    query_str = (product or "").strip()
    recommendations = []
    if query_str:
        raw = retriever.retrieve(query_str, top_k=6)
        for r in raw:
            score = r.get("relevance_score", 0.0)
            badge = "Highly Relevant" if score >= 0.75 else ("Potentially Relevant" if score >= 0.45 else "Related")
            recommendations.append({
                **r,
                "badge": badge,
                "why_it_matches": f"Specifies quality benchmarks, safety requirements, and test methods applicable to {query_str}."
            })

    return templates.TemplateResponse(
        request=request,
        name="recommendation.html",
        context={
            "active_tab": "standards",
            "product_query": query_str,
            "recommendations": recommendations,
        }
    )


@router.get("/standards/{standard_code:path}", response_class=HTMLResponse)
async def standard_detail_page(request: Request, standard_code: str):
    clean_code = standard_code.strip()
    repo = get_standards_repository()
    standard = repo.get_by_code(clean_code)

    if not standard:
        normalized = clean_code.replace("-", " ").replace("_", " ")
        standard = repo.get_by_code(normalized)

    if not standard:
        retriever = get_retriever()
        fuzzy = retriever.retrieve(clean_code, top_k=1)
        if fuzzy and fuzzy[0]["relevance_score"] > 0.3:
            standard = repo.get_by_code(fuzzy[0]["is_number"])

    if not standard:
        raise HTTPException(status_code=404, detail=f"Indian Standard '{clean_code}' not found in prototype compendium.")

    category = standard.get("category", "General")
    related = repo.filter_by_category(category)
    related_filtered = [r for r in related if r.get("standard") != standard.get("standard")][:4]

    calc_service = get_calculator_service()
    cost_preview = calc_service.estimate_cost(standard.get("standard", clean_code), enterprise_type="micro")

    return templates.TemplateResponse(
        request=request,
        name="standard_detail.html",
        context={
            "active_tab": "standards",
            "standard": standard,
            "related_standards": related_filtered,
            "cost_preview": cost_preview,
        }
    )


@router.get("/certification", response_class=HTMLResponse)
async def certification_page(
    request: Request,
    standard: Optional[str] = Query(None, description="Preselected Indian Standard"),
    tier: str = Query("micro", description="Enterprise tier: micro, small, medium, large")
):
    cert_service = get_certification_service()
    stages = cert_service.get_stages()
    selected_std = standard or "IS 1489 (Part 1)"
    roadmap = cert_service.get_compliance_roadmap(product_type=selected_std, enterprise_tier=tier)

    return templates.TemplateResponse(
        request=request,
        name="certification.html",
        context={
            "active_tab": "certification",
            "stages": stages,
            "roadmap": roadmap,
            "selected_standard": selected_std,
            "selected_tier": tier,
        }
    )


@router.get("/laboratories", response_class=HTMLResponse)
@router.get("/labs", response_class=HTMLResponse)
async def laboratories_page(
    request: Request,
    q: Optional[str] = Query(None),
    state: Optional[str] = Query(None),
    standard: Optional[str] = Query(None)
):
    lab_service = get_lab_service()
    labs = lab_service.search(q=q, state=state, standard=standard)
    states = lab_service.get_states()

    return templates.TemplateResponse(
        request=request,
        name="laboratories.html",
        context={
            "active_tab": "laboratories",
            "query": q or "",
            "selected_state": state or "ALL",
            "selected_standard": standard or "",
            "states": states,
            "labs": labs,
            "total_labs": len(labs),
        }
    )


@router.get("/hallmarking", response_class=HTMLResponse)
async def hallmarking_page(
    request: Request,
    huid: Optional[str] = Query(None)
):
    hallmarking_service = get_hallmarking_service()
    info = hallmarking_service.get_info()
    verification_result = None
    if huid:
        verification_result = hallmarking_service.verify_huid(huid)

    return templates.TemplateResponse(
        request=request,
        name="hallmarking.html",
        context={
            "active_tab": "hallmarking",
            "huid_query": huid or "",
            "info": info,
            "result": verification_result,
        }
    )


@router.get("/calculator", response_class=HTMLResponse)
@router.get("/fee-calculator", response_class=HTMLResponse)
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
