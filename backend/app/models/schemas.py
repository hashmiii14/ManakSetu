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
    top_k: int = Field(10, ge=1, le=50, description="Number of results to retrieve")


class SearchResponse(BaseModel):
    query: str
    total: int
    results: List[StandardItem]


class ReferencedStandard(BaseModel):
    is_number: str
    title: str
    relevance_note: Optional[str] = None


class ChatbotRequest(BaseModel):
    message: str = Field(..., min_length=1, description="User inquiry regarding BIS standards")
    history: Optional[List[Dict[str, str]]] = []


class ChatbotResponse(BaseModel):
    answer: str
    referenced_standards: List[ReferencedStandard] = []
    source: str
    confidence: str
    disclaimer: str


class VerificationRequest(BaseModel):
    identifier: str = Field(..., min_length=1, description="HUID alphanumeric code or ISI CM/L 7-digit number")
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
    identifier: str = Field(..., min_length=1, description="Product brand, CM/L, or HUID")
    category: str = Field(..., min_length=1, description="Violation classification")
    description: str = Field(..., min_length=3, description="Detailed violation observation")
    contact: Optional[str] = Field("", description="Complainant name, email or mobile number")
    location: Optional[str] = Field("", description="Market / retail store location")


class ReportResponse(BaseModel):
    id: str
    status: str
    message: str
    created_at: str


class CostEstimateRequest(BaseModel):
    standard_code: str = Field(..., description="Indian Standard identifier (e.g. IS 1489)")
    enterprise_type: str = Field("micro", description="'micro', 'small', or 'medium_large'")


class CostEstimateResponse(BaseModel):
    standard_code: str
    standard_title: str
    enterprise_type: str
    concession_percent: int
    base_marking_fee: float
    effective_marking_fee: float
    application_fee: float
    inspection_fee: float
    total_estimated_cost: float
    total_savings: float
    disclaimer: str


class ComplianceCheckRequest(BaseModel):
    product_name: str = Field(..., min_length=1, description="Product name or standard code")
    category: Optional[str] = Field("General", description="Product technical division")
    description: Optional[str] = Field("", description="Product description")
    intended_use: Optional[str] = Field("", description="Intended market or application")


class CompliancePhase(BaseModel):
    phase: str
    title: str
    status: str  # "identified", "review_required", "verify", "not_provided"
    description: str
    details: List[str] = []


class ComplianceCheckResponse(BaseModel):
    product_name: str
    primary_standard: Optional[StandardItem] = None
    related_standards: List[StandardItem] = []
    conformance_scheme: str
    mandatory_qco: bool
    qco_notification: Optional[str] = None
    why_it_applies: str
    phases: List[CompliancePhase] = []
    missing_details_to_confirm: List[str] = []
    official_verification_guidance: str
    disclaimer: str
