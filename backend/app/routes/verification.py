from fastapi import APIRouter, Query, HTTPException
from ..models.schemas import VerificationRequest, VerificationResponse
from ..services.verifier import get_verification_service

router = APIRouter(prefix="/api/verify", tags=["Verification"])


@router.post("", response_model=VerificationResponse)
def verify_post(req: VerificationRequest):
    try:
        service = get_verification_service()
        res = service.verify_identifier(req.identifier, req.id_type)
        return VerificationResponse(**res)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Verification failed: {str(e)}")


@router.get("", response_model=VerificationResponse)
def verify_get(
    identifier: str = Query(..., min_length=1, description="HUID or CML identifier"),
    id_type: str = Query("auto", description="'huid', 'cml', or 'auto'")
):
    try:
        service = get_verification_service()
        res = service.verify_identifier(identifier, id_type)
        return VerificationResponse(**res)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Verification failed: {str(e)}")
