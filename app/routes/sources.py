from fastapi import APIRouter, HTTPException
from ..database.repositories import get_standards_repository

router = APIRouter(prefix="/api/sources", tags=["Sources API"])


@router.get("/{source_id}")
def get_source_by_id(source_id: str):
    repo = get_standards_repository()
    doc = repo.get_by_is_number(source_id)
    if not doc:
        # Search by partial
        all_docs = repo.get_all()
        for d in all_docs:
            if source_id.lower() in d.get("standard", "").lower():
                doc = d
                break

    if not doc:
        raise HTTPException(
            status_code=404,
            detail=f"Authoritative source chunk '{source_id}' not found in registry."
        )

    return {
        "source_id": doc.get("standard", source_id),
        "title": doc.get("title", ""),
        "technical_division": doc.get("category", "General"),
        "scope": doc.get("scope") or doc.get("description", ""),
        "mandatory_qco": doc.get("mandatory_qco", False),
        "qco_notification": doc.get("qco_notification"),
        "key_tests": doc.get("key_tests", []),
        "source_type": "Bureau of Indian Standards Official Gazette & Technical Catalogue",
        "official_url": f"https://www.services.bis.gov.in/php/BIS_2.0/bisconnect/knowyourstandards/indian_standards/isdetails?is_no={doc.get('standard', '')}",
        "internal_path": f"/standards/{doc.get('standard', '')}"
    }
