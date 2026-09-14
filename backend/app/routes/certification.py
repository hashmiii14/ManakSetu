from fastapi import APIRouter, HTTPException
from typing import List
from ..models.schemas import CertificationNavigationRequest, CertificationNavigationResponse, CertificationStage
from ..services.certification_service import get_certification_service

router = APIRouter(prefix="/api/certification", tags=["Certification Navigator API"])


@router.get("/stages", response_model=List[CertificationStage])
def get_stages():
    try:
        service = get_certification_service()
        return [CertificationStage(**st) for st in service.get_stages()]
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Certification stages error: {str(e)}")


@router.post("/navigate", response_model=CertificationNavigationResponse)
def navigate_certification(req: CertificationNavigationRequest):
    try:
        service = get_certification_service()
        res = service.generate_roadmap(req.standard_code, req.enterprise_type or "micro")
        return CertificationNavigationResponse(
            standard_code=res["standard_code"],
            enterprise_type=res["enterprise_type"],
            concession_eligible=res["concession_eligible"],
            concession_details=res["concession_details"],
            total_stages=res["total_stages"],
            stages=[CertificationStage(**s) for s in res["stages"]],
            portal=res["portal"]
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Certification navigator error: {str(e)}")


@router.get("/roadmap", response_model=CertificationNavigationResponse)
def get_certification_roadmap(
    standard_code: str = "IS 1489",
    enterprise_type: str = "micro"
):
    try:
        service = get_certification_service()
        res = service.generate_roadmap(standard_code, enterprise_type or "micro")
        return CertificationNavigationResponse(
            standard_code=res["standard_code"],
            enterprise_type=res["enterprise_type"],
            concession_eligible=res["concession_eligible"],
            concession_details=res["concession_details"],
            total_stages=res["total_stages"],
            stages=[CertificationStage(**s) for s in res["stages"]],
            portal=res["portal"]
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Certification roadmap error: {str(e)}")
