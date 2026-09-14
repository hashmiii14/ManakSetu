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
    relevance_badge: Optional[str] = "Highly Relevant"
    standard_id: Optional[str] = None
    score: Optional[float] = None
    why_it_matches: Optional[str] = None

    def __init__(self, **data):
        if "standard_id" not in data and "is_number" in data:
            data["standard_id"] = data["is_number"]
        if "score" not in data and "relevance_score" in data:
            data["score"] = data["relevance_score"]
        super().__init__(**data)


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
    success: bool = True
    query: str
    total: int
    results: List[StandardItem]


class RecommendationRequest(BaseModel):
    product_description: Optional[str] = Field(None, description="Product description, industry, or use-case")
    query: Optional[str] = Field(None, description="Alias for product_description")
    category: Optional[str] = Field("ALL", description="Technical category or division")
    top_k: int = Field(5, ge=1, le=20, description="Number of recommendations")


class SourceCitation(BaseModel):
    source_title: str
    standard_number: str
    section: Optional[str] = None
    clause: Optional[str] = None
    source_type: Optional[str] = "BIS Standard"
    url: Optional[str] = ""
    relevance_score: Optional[float] = 0.0


class ReferencedStandard(BaseModel):
    is_number: str
    title: str
    relevance_note: Optional[str] = None


class ChatbotRequest(BaseModel):
    message: Optional[str] = Field(None, description="User inquiry regarding BIS standards")
    query: Optional[str] = Field(None, description="Alias for message")
    history: Optional[List[Dict[str, Any]]] = []

    def get_query(self) -> str:
        return (self.message or self.query or "").strip()


class ChatbotResponse(BaseModel):
    success: bool = True
    answer: str
    referenced_standards: List[ReferencedStandard] = []
    sources: Optional[List[Any]] = []
    source: str
    confidence: str
    disclaimer: str
    detected_language: Optional[str] = "en"
    is_refusal: Optional[bool] = False
    structured_sections: Optional[Dict[str, str]] = {}
    citations: Optional[List[Dict[str, Any]]] = []


class VerificationRequest(BaseModel):
    identifier: Optional[str] = Field(None, description="HUID alphanumeric code or ISI CM/L 7-digit number")
    huid: Optional[str] = Field(None, description="Alias for identifier")
    cml: Optional[str] = Field(None, description="Alias for identifier")
    license_number: Optional[str] = Field(None, description="Alias for identifier")
    id_type: str = Field("auto", description="'huid', 'cml', or 'auto'")

    def get_identifier(self) -> str:
        return (self.identifier or self.huid or self.cml or self.license_number or "").strip()


class VerificationResponse(BaseModel):
    success: bool = True
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
    success: bool = True
    id: str
    status: str
    message: str
    created_at: str


class CostEstimateRequest(BaseModel):
    standard_code: Optional[str] = Field(None, description="Indian Standard identifier (e.g. IS 1489)")
    standard: Optional[str] = Field(None, description="Alias for standard_code")
    enterprise_type: Optional[str] = Field("micro", description="'micro', 'small', or 'medium_large'")
    tier: Optional[str] = Field(None, description="Alias for enterprise_type")

    def get_standard_code(self) -> str:
        return (self.standard_code or self.standard or "IS 1489").strip()

    def get_enterprise_type(self) -> str:
        return (self.enterprise_type or self.tier or "micro").strip()


class CostEstimateResponse(BaseModel):
    success: bool = True
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
    status: str
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


class LabItem(BaseModel):
    id: str
    name: str
    city: str
    state: str
    lat: float
    lng: float
    accreditation: str
    accreditation_number: Optional[str] = None
    testing_area: str
    scopes: List[str] = []
    applicable_standards: List[str] = []
    turnaround_time: str
    contact: str
    address: str
    distance_km: Optional[int] = None


class LabSearchResponse(BaseModel):
    total: int
    states: List[str]
    laboratories: List[LabItem]


class CertificationNavigationRequest(BaseModel):
    standard_code: str = Field(..., description="Indian Standard code (e.g. IS 2082)")
    enterprise_type: Optional[str] = Field("micro", description="'micro', 'small', or 'medium_large'")


class CertificationStage(BaseModel):
    step: int
    title: str
    category: str
    estimated_time: str
    description: str
    requirements: List[str] = []
    documents: List[str] = []
    official_portal: str
    statutory_note: str


class CertificationNavigationResponse(BaseModel):
    standard_code: str
    enterprise_type: str
    concession_eligible: bool
    concession_details: str
    total_stages: int
    stages: List[CertificationStage]
    portal: str
