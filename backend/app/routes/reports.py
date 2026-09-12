from fastapi import APIRouter, HTTPException
from typing import List, Dict, Any
from ..models.schemas import ReportRequest, ReportResponse
from ..repositories.report_repository import get_report_repository

router = APIRouter(prefix="/api/report", tags=["Reports"])


@router.post("", response_model=ReportResponse)
def submit_report(req: ReportRequest):
    try:
        repo = get_report_repository()
        report = repo.create_report(
            identifier=req.identifier,
            category=req.category,
            description=req.description,
            contact=req.contact or ""
        )
        return ReportResponse(
            id=report["id"],
            status="SUCCESS",
            message="Your violation report has been recorded for statutory evaluation.",
            created_at=report["created_at"]
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to submit report: {str(e)}")


@router.get("s", response_model=List[Dict[str, Any]])
def list_reports():
    repo = get_report_repository()
    return repo.get_all()
