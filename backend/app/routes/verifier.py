from fastapi import APIRouter, Query, HTTPException
from ..models.schemas import VerificationRequest, VerificationResponse
from ..services.verifier_service import get_verification_service
from ..database.repositories import get_report_repository

router = APIRouter(prefix="/api/verify", tags=["Verification API"])


@router.post("", response_model=VerificationResponse)
def verify_post(req: VerificationRequest):
    try:
        service = get_verification_service()
        res = service.verify_identifier(req.identifier, req.id_type)
        # Log action to DB
        repo = get_report_repository()
        repo.log_verification(req.identifier, req.id_type, res.get("is_valid", False), res.get("status", ""))
        return VerificationResponse(**res)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Verification execution error: {str(e)}")


@router.get("", response_model=VerificationResponse)
def verify_get(
    identifier: str = Query(..., min_length=1, description="HUID or CML identifier"),
    id_type: str = Query("auto", description="'huid', 'cml', or 'auto'")
):
    try:
        service = get_verification_service()
        res = service.verify_identifier(identifier, id_type)
        # Log action to DB
        repo = get_report_repository()
        repo.log_verification(identifier, id_type, res.get("is_valid", False), res.get("status", ""))
        return VerificationResponse(**res)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Verification execution error: {str(e)}")
