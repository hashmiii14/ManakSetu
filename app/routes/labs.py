from fastapi import APIRouter, Query, HTTPException
from typing import Optional, List
from ..models.schemas import LabSearchResponse, LabItem
from ..services.lab_service import get_lab_service

router = APIRouter(prefix="/api/labs", tags=["Testing Laboratories API"])


@router.get("", response_model=LabSearchResponse)
@router.get("/search", response_model=LabSearchResponse)
def search_labs(
    q: Optional[str] = Query(None, description="Keyword search (e.g. Geyser, High Voltage, Kolkata)"),
    state: Optional[str] = Query(None, description="State / Union Territory filter"),
    standard: Optional[str] = Query(None, description="IS standard code (e.g. IS 2082)"),
    category: Optional[str] = Query(None, description="Product category"),
    user_lat: Optional[float] = Query(None, description="User latitude for distance calculation"),
    user_lng: Optional[float] = Query(None, description="User longitude for distance calculation"),
    lat: Optional[float] = Query(None, description="Alias for user_lat"),
    lon: Optional[float] = Query(None, description="Alias for user_lng")
):
    try:
        service = get_lab_service()
        effective_lat = user_lat if user_lat is not None else lat
        effective_lng = user_lng if user_lng is not None else lon
        results = service.search(
            q=q,
            state=state,
            standard=standard,
            category=category,
            user_lat=effective_lat,
            user_lng=effective_lng
        )
        return LabSearchResponse(
            total=len(results),
            states=service.get_states(),
            laboratories=[LabItem(**lab) for lab in results]
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Laboratory lookup error: {str(e)}")
