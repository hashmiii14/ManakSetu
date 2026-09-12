from typing import Optional, List, Dict, Any
from pydantic import BaseModel, Field


class StandardItem(BaseModel):
    is_number: str
    title: str
    category: str
    description: str
    scope: str
    relevance_score: float
    mandatory_qco: bool
    source: str


class StandardDetail(BaseModel):
    is_number: str
    title: str
    category: str
    description: str
    scope: str
    mandatory_qco: bool
    qco_notification: Optional[str] = None
    key_tests: List[str] = []
    labs_available: List[Dict[str, str]] = []
    fee_structure: Dict[str, Any] = {}
    documentation_required: List[str] = []
    text: Optional[str] = ""
    source: str


class SearchRequest(BaseModel):
    query: str = Field(..., min_length=1, description="Search query or product description")
    top_k: int = Field(5, ge=1, le=20, description="Number of results to retrieve")


class SearchResponse(BaseModel):
    query: str
    total: int
    results: List[StandardItem]


class ReferencedStandard(BaseModel):
    is_number: str
    title: str
    relevance_note: Optional[str] = None


class ChatbotRequest(BaseModel):
    message: str = Field(..., min_length=1, description="User question")
    history: Optional[List[Dict[str, str]]] = []


class ChatbotResponse(BaseModel):
    answer: str
    referenced_standards: List[ReferencedStandard] = []
    source: str
    confidence: str
    disclaimer: str


class VerificationRequest(BaseModel):
    identifier: str = Field(..., min_length=1, description="HUID code or ISI CML number")
    id_type: str = Field("auto", description="'huid', 'cml', or 'auto'")


class VerificationResponse(BaseModel):
    identifier: str
    type: str
    status: str
    is_valid: bool
    details: Dict[str, Any] = {}
    is_prototype: bool = True
    disclaimer: str


class ReportRequest(BaseModel):
    identifier: str = Field(..., min_length=1, description="Product name, CML, or HUID")
    category: str = Field(..., min_length=1, description="Violation category")
    description: str = Field(..., min_length=3, description="Violation details")
    contact: Optional[str] = Field("", description="Reporter name / phone / email")


class ReportResponse(BaseModel):
    id: str
    status: str
    message: str
    created_at: str


class CostEstimateRequest(BaseModel):
    standard_code: str = Field(..., description="IS Code or standard identifier")
    enterprise_type: str = Field("micro", description="'micro', 'small', or 'medium_large'")


class CostEstimateResponse(BaseModel):
    standard_code: str
    enterprise_type: str
    concession_percent: int
    base_marking_fee: float
    effective_marking_fee: float
    application_fee: float
    inspection_fee: float
    total_estimated_cost: float
    total_savings: float
    disclaimer: str
