from fastapi import APIRouter, HTTPException
from typing import List
from ..models.schemas import (
    ComplianceCheckRequest,
    ComplianceCheckResponse,
    CompliancePhase,
    StandardItem
)
from ..services.bis_retriever import get_retriever
from ..database.repositories import get_standards_repository

router = APIRouter(tags=["Compliance & Discovery API"])


@router.post("/api/compliance/check", response_model=ComplianceCheckResponse)
@router.post("/api/discovery", response_model=ComplianceCheckResponse)
def check_compliance_endpoint(req: ComplianceCheckRequest):
    try:
        retriever = get_retriever()
        repo = get_standards_repository()

        query_text = f"{req.product_name} {req.category or ''} {req.description or ''} {req.intended_use or ''}".strip()
        results = retriever.retrieve(query_text, top_k=4)

        if not results:
            results = retriever.retrieve(req.product_name, top_k=3)

        items = [StandardItem(**r) for r in results]
        top = items[0] if items else None
        related = items[1:] if len(items) > 1 else []

        top_doc = repo.get_by_is_number(top.is_number) if top else None

        mandatory = top.mandatory_qco if top else False
        qco_note = top_doc.get("qco_notification") if top_doc else ("Quality Control Order (Mandatory)" if mandatory else None)

        scheme = "Scheme-I (ISI Mark) with Mandatory QCO" if mandatory else "Scheme-I (ISI Mark) Voluntary Certification"
        if top and any(term in top.category.lower() or term in top.title.lower() for term in ["it equipment", "electronics", "audio", "cell phone"]):
            scheme = "Scheme-II (CRS - Compulsory Registration Scheme)"

        why_text = (
            f"The product '{req.product_name}' aligns directly with the statutory scope of {top.is_number} "
            f"covering {top.title}. {top.description or top.scope}"
        ) if top else f"Statutory conformity evaluation for '{req.product_name}'."

        phases = [
            CompliancePhase(
                phase="Stage 1",
                title="Applicable Standard Identification",
                status="identified" if top else "review_required",
                description=f"Primary standard identified as {top.is_number if top else 'To be confirmed'} ({top.title if top else 'Consult BIS directory'}).",
                details=[
                    f"Standard: {top.is_number}" if top else "Standard search required",
                    f"Technical Division: {top.category if top else 'General'}",
                    f"Statutory Status: {'Mandatory QCO Enforced' if mandatory else 'Voluntary Conformance'}"
                ]
            ),
            CompliancePhase(
                phase="Stage 2",
                title="Mandatory Quality Control Order (QCO) Verification",
                status="identified" if mandatory else "verify",
                description=qco_note or ("Mandatory QCO notification applies." if mandatory else "Voluntary standard under Scheme-I."),
                details=[
                    f"Notification: {qco_note or 'Under BIS Act 2016'}",
                    f"Legal Mandate: {'Section 29 of BIS Act requires ISI certification before retail sale' if mandatory else 'Voluntary quality certification'}"
                ]
            ),
            CompliancePhase(
                phase="Stage 3",
                title="Conformity Assessment Scheme",
                status="identified",
                description=f"Designated assessment scheme: {scheme}.",
                details=[f"Conformity Scheme: {scheme}"]
            ),
            CompliancePhase(
                phase="Stage 4",
                title="In-House Testing Facility Setup",
                status="review_required",
                description="Manufacturer must establish mandatory factory laboratory test infrastructure according to the Scheme of Inspection and Testing (SIT).",
                details=top_doc.get("key_tests", ["Physical properties test", "Safety parameters", "Routine performance audit"]) if top_doc else []
            ),
            CompliancePhase(
                phase="Stage 5",
                title="Application Filing & Documentation",
                status="not_provided",
                description="Submission of technical documentation on the official e-BIS ManakOnline portal.",
                details=top_doc.get("documentation_required", ["Manufacturing plant layout", "In-house lab calibration certificate", "List of machinery"]) if top_doc else []
            ),
            CompliancePhase(
                phase="Stage 6",
                title="Factory Audit & Sample Testing",
                status="not_provided",
                description="BIS technical officers perform a 2-day on-site factory audit and seal counter-samples for testing in recognized NABL laboratories.",
                details=[f"Recognized Lab: {lab.get('name', 'NCCBM / NTH')}" for lab in (top_doc.get("labs_available", [])[:2] if top_doc else [])]
            ),
            CompliancePhase(
                phase="Stage 7",
                title="Grant of License (CM/L)",
                status="not_provided",
                description="Upon satisfactory laboratory test reports and factory inspection, BIS issues the 7-digit CM/L license number and authorizes the ISI Mark.",
                details=["7-Digit License (CM/L-XXXXXXX) Issued", "Product authorized to bear ISI Mark with mandatory labeling"]
            )
        ]

        missing = []
        if not req.description:
            missing.append("Specific product technical parameters or power/capacity rating")
        if not req.intended_use:
            missing.append("Intended operating environment (domestic vs. industrial)")

        return ComplianceCheckResponse(
            product_name=req.product_name,
            primary_standard=top,
            related_standards=related,
            conformance_scheme=scheme,
            mandatory_qco=mandatory,
            qco_notification=qco_note,
            why_it_applies=why_text,
            phases=phases,
            missing_details_to_confirm=missing,
            official_verification_guidance="Please cross-verify statutory gazette notifications and SIT documents on manakonline.in.",
            disclaimer="Educational compliance assessment prototype. Not legally binding."
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Compliance check failed: {str(e)}")
