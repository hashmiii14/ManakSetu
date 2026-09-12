from fastapi import APIRouter, Query, HTTPException
from typing import Optional
from ..models.schemas import SearchResponse, SearchRequest, StandardItem
from ..services.retriever import get_retriever

router = APIRouter(prefix="/api/search", tags=["Search"])


@router.get("", response_model=SearchResponse)
def search_standards_get(
    q: str = Query(..., min_length=1, description="Search query or product description"),
    top_k: int = Query(5, ge=1, le=20, description="Max results")
):
    try:
        retriever = get_retriever()
        results = retriever.retrieve(q, top_k=top_k)
        items = [StandardItem(**r) for r in results]
        return SearchResponse(
            query=q,
            total=len(items),
            results=items
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Search failed: {str(e)}")


@router.post("", response_model=SearchResponse)
def search_standards_post(req: SearchRequest):
    try:
        retriever = get_retriever()
        results = retriever.retrieve(req.query, top_k=req.top_k)
        items = [StandardItem(**r) for r in results]
        return SearchResponse(
            query=req.query,
            total=len(items),
            results=items
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Search failed: {str(e)}")
