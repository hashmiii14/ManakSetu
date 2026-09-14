from fastapi import APIRouter, Query, HTTPException
from typing import List, Optional
from ..models.schemas import StandardDetail, StandardItem, SearchRequest, SearchResponse, RecommendationRequest
from ..database.repositories import get_standards_repository
from ..services.bis_retriever import get_retriever

router = APIRouter(prefix="/api/standards", tags=["Standards API"])


def _assign_badge(score: float) -> str:
    if score >= 0.75:
        return "Highly Relevant"
    elif score >= 0.45:
        return "Potentially Relevant"
    return "Related"


@router.get("/categories", response_model=List[str])
def get_categories():
    repo = get_standards_repository()
    return repo.list_categories()


@router.get("/search", response_model=SearchResponse)
def search_standards_get(
    q: Optional[str] = Query(None, description="Search query or product description"),
    query: Optional[str] = Query(None, description="Alias for q"),
    top_k: int = Query(10, ge=1, le=50, description="Max results")
):
    target_q = (q or query or "").strip()
    if not target_q:
        return SearchResponse(query="", total=0, results=[])
    try:
        retriever = get_retriever()
        results = retriever.retrieve(target_q, top_k=top_k)
        items = []
        for r in results:
            badge = _assign_badge(r.get("relevance_score", 0.0))
            items.append(StandardItem(**r, relevance_badge=badge))
        return SearchResponse(
            success=True,
            query=target_q,
            total=len(items),
            results=items
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Standards search error: {str(e)}")


@router.post("/search", response_model=SearchResponse)
def search_standards(req: SearchRequest):
    try:
        retriever = get_retriever()
        results = retriever.retrieve(req.query, top_k=req.top_k)
        items = []
        for r in results:
            badge = _assign_badge(r.get("relevance_score", 0.0))
            items.append(StandardItem(**r, relevance_badge=badge))
        return SearchResponse(
            success=True,
            query=req.query,
            total=len(items),
            results=items
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Standards search error: {str(e)}")


@router.post("/recommend", response_model=SearchResponse)
def recommend_standards(req: RecommendationRequest):
    try:
        retriever = get_retriever()
        desc = (req.product_description or req.query or "").strip()
        if not desc:
            raise HTTPException(status_code=400, detail="Either product_description or query must be provided.")
        results = retriever.retrieve(desc, top_k=req.top_k)
        items = []
        for r in results:
            if req.category and req.category != "ALL" and r.get("category") != req.category:
                continue
            badge = _assign_badge(r.get("relevance_score", 0.0))
            items.append(StandardItem(**r, relevance_badge=badge))
        return SearchResponse(
            success=True,
            query=desc,
            total=len(items),
            results=items
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Standards recommendation error: {str(e)}")


@router.get("/qco", tags=["QCO API"])
def get_qco_standards():
    try:
        repo = get_standards_repository()
        all_standards = repo.get_all()
        qco_items = [s for s in all_standards if s.get("mandatory_qco")]
        return {
            "success": True,
            "total": len(qco_items),
            "qco_standards": qco_items,
            "disclaimer": "Statutory Quality Control Orders issued under Section 16 of the BIS Act, 2016."
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"QCO standards retrieval error: {str(e)}")


@router.get("", response_model=List[StandardDetail])
def list_standards(
    category: Optional[str] = Query(None, description="Filter by category"),
    limit: int = Query(50, ge=1, le=600, description="Max items")
):
    repo = get_standards_repository()
    if category and category.upper() != "ALL":
        items = repo.filter_by_category(category)
    else:
        items = repo.get_all()

    formatted = []
    for doc in items[:limit]:
        formatted.append(
            StandardDetail(
                is_number=doc.get("standard", ""),
                title=doc.get("title", ""),
                category=doc.get("category", "General"),
                description=doc.get("description", ""),
                scope=doc.get("scope", ""),
                mandatory_qco=doc.get("mandatory_qco", False),
                qco_notification=doc.get("qco_notification"),
                key_tests=doc.get("key_tests", []),
                labs_available=doc.get("labs_available", []),
                fee_structure=doc.get("fee_structure", {}),
                documentation_required=doc.get("documentation_required", []),
                text=doc.get("text", "")[:500],
                source=doc.get("source", "BIS Catalogue")
            )
        )
    return formatted


@router.get("/{is_code}", response_model=StandardDetail)
def get_standard_by_code(is_code: str):
    repo = get_standards_repository()
    doc = repo.get_by_is_number(is_code)
    if not doc:
        raise HTTPException(
            status_code=404,
            detail=f"Standard '{is_code}' was not found in the indexed compendium."
        )

    return StandardDetail(
        is_number=doc.get("standard", ""),
        title=doc.get("title", ""),
        category=doc.get("category", "General"),
        description=doc.get("description", ""),
        scope=doc.get("scope", ""),
        mandatory_qco=doc.get("mandatory_qco", False),
        qco_notification=doc.get("qco_notification"),
        key_tests=doc.get("key_tests", []),
        labs_available=doc.get("labs_available", []),
        fee_structure=doc.get("fee_structure", {}),
        documentation_required=doc.get("documentation_required", []),
        text=doc.get("text", ""),
        source=doc.get("source", "BIS Catalogue")
    )
