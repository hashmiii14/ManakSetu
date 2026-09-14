from fastapi import APIRouter, HTTPException
from typing import List, Dict, Any
from ..models.schemas import ReportRequest, ReportResponse
from ..services.report_service import get_report_service

router = APIRouter(prefix="/api/report", tags=["Reports API"])


@router.post("", response_model=ReportResponse)
def submit_report(req: ReportRequest):
    try:
        service = get_report_service()
        report = service.submit_violation_report(
            identifier=req.identifier,
            category=req.category,
            description=req.description,
            contact=req.contact or "",
            location=req.location or ""
        )
        return ReportResponse(
            id=report["id"],
            status="SUCCESS",
            message="Your statutory violation report has been recorded and assigned a tracking docket.",
            created_at=report["created_at"]
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to submit grievance report: {str(e)}")


@router.get("s", response_model=List[Dict[str, Any]])
def list_reports():
    service = get_report_service()
    return service.list_recent_reports()
