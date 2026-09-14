from fastapi import APIRouter, HTTPException, Body
from typing import Dict, Any
from ..services.hallmarking_service import get_hallmarking_service

router = APIRouter(prefix="/api/hallmarking", tags=["Hallmarking API"])


@router.get("/info")
def get_hallmarking_info():
    try:
        service = get_hallmarking_service()
        return service.get_info()
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Hallmarking info error: {str(e)}")


@router.post("/verify")
def verify_hallmark(payload: Dict[str, Any] = Body(...)):
    try:
        huid = payload.get("huid") or payload.get("identifier") or ""
        service = get_hallmarking_service()
        return service.verify_huid(huid)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"HUID verification error: {str(e)}")
