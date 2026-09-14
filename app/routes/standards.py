from fastapi import APIRouter, Query, HTTPException
from typing import List, Optional
from ..models.schemas import StandardDetail
from ..database.repositories import get_standards_repository

router = APIRouter(prefix="/api/standards", tags=["Standards API"])


@router.get("/categories", response_model=List[str])
def get_categories():
    repo = get_standards_repository()
    return repo.list_categories()


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
