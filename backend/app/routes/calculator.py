from fastapi import APIRouter, Query, HTTPException
from ..models.schemas import CostEstimateRequest, CostEstimateResponse
from ..services.calculator_service import get_calculator_service

router = APIRouter(prefix="/api/calculate", tags=["Calculator API"])


@router.post("", response_model=CostEstimateResponse)
def calculate_cost_post(req: CostEstimateRequest):
    try:
        service = get_calculator_service()
        res = service.estimate_cost(req.standard_code, req.enterprise_type)
        return CostEstimateResponse(**res)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Fee calculation error: {str(e)}")


@router.get("", response_model=CostEstimateResponse)
def calculate_cost_get(
    standard_code: str = Query(..., description="IS Code or product standard"),
    enterprise_type: str = Query("micro", description="'micro', 'small', or 'medium_large'")
):
    try:
        service = get_calculator_service()
        res = service.estimate_cost(standard_code, enterprise_type)
        return CostEstimateResponse(**res)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Fee calculation error: {str(e)}")
