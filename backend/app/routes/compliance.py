from fastapi import APIRouter, HTTPException
from typing import List
from ..models.schemas import (
    ComplianceCheckRequest,
    ComplianceCheckResponse,
    CompliancePhase,
    StandardItem
)
from ..services.retriever import get_retriever
from ..repositories.standards_repository import get_standards_repository

router = APIRouter(tags=["Compliance & Discovery"])


@router.post("/api/compliance/check", response_model=ComplianceCheckResponse)
@router.post("/api/discovery", response_model=ComplianceCheckResponse)
def check_compliance_endpoint(req: ComplianceCheckRequest):
    try:
        retriever = get_retriever()
        repo = get_standards_repository()

        # Hybrid query combining product name, category, description, intended use
        query_text = f"{req.product_name} {req.category or ''} {req.description or ''} {req.intended_use or ''}".strip()
        results = retriever.retrieve(query_text, top_k=4)

        if not results:
            # Fallback if query was ultra-short or unusual
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

        # Formulate why it applies
        why_text = (
            f"The product '{req.product_name}' aligns directly with the scope of {top.is_number} "
            f"covering {top.title}. {top.description or top.scope}"
        ) if top else f"Analysis for '{req.product_name}' based on Indian Standards compendium."

        # Structured 7-stage Compliance Roadmap
        phases = [
            CompliancePhase(
                phase="Stage 1",
                title="Applicable Standard Identification",
                status="identified" if top else "review_required",
                description=f"Primary standard designated as {top.is_number if top else 'To be confirmed'} ({top.title if top else 'Consult BIS catalogue'}).",
                details=[
                    f"Standard: {top.is_number}" if top else "Standard search required",
                    f"Technical Division: {top.category if top else 'General'}",
                    f"Statutory Status: {'Mandatory QCO Enforced' if mandatory else 'Voluntary Conformance'}"
                ]
            ),
            CompliancePhase(
                phase="Stage 2",
                title="Conformity Assessment Scheme",
                status="identified",
                description=f"Governed under {scheme} of the BIS (Conformity Assessment) Regulations, 2018.",
                details=[
                    "Product requires factory evaluation and third-party laboratory test validation.",
                    "Grant of license enables use of the standard ISI mark monogram on packaging and product."
                ]
            ),
            CompliancePhase(
                phase="Stage 3",
                title="Factory Infrastructure & In-house Laboratory",
                status="review_required",
                description="Manufacturing premises must have designated testing apparatus as per Scheme of Inspection and Testing (SIT).",
                details=[
                    "In-house test equipment calibrated by an accredited calibration laboratory (NABL).",
                    "Competent quality control personnel appointed to oversee routine batch testing."
                ]
            ),
            CompliancePhase(
                phase="Stage 4",
                title="Documentation & Technical Dossier",
                status="review_required",
                description="Comprehensive manufacturing dossier required for filing Form-I on Manakonline.",
                details=top_doc.get("documentation_required", [
                    "Factory layout, process flowchart, and manufacturing machinery list",
                    "List of testing equipment with valid calibration records",
                    "Udyam registration certificate for MSME concessions (50% for Micro, 20% for Small)",
                    "Premise ownership or registered lease agreement with industrial consent"
                ]) if top_doc else [
                    "Factory layout and machinery list",
                    "Test equipment calibration records",
                    "MSME registration proof"
                ]
            ),
            CompliancePhase(
                phase="Stage 5",
                title="Mandatory Laboratory Testing",
                status="verify",
                description="Samples undergo conformity evaluation at independent BIS recognized laboratories.",
                details=top_doc.get("key_tests", [
                    "Dimensional tolerances and mechanical strength",
                    "Safety insulation resistance / burst pressure test",
                    "Chemical purity assay and durability conditioning"
                ]) if top_doc else [
                    "Type testing at BIS recognized lab",
                    "Routine factory verification"
                ]
            ),
            CompliancePhase(
                phase="Stage 6",
                title="Marking & Labeling Requirements",
                status="identified",
                description="Specific labeling rules under Section 16 of the BIS Act, 2016.",
                details=[
                    "Standard ISI logo monogram of prescribed minimum dimensions",
                    "Certification Marks License (CML) 7-8 digit number displayed beneath the logo",
                    "Batch number, month/year of manufacture, and rated operating parameters"
                ]
            ),
            CompliancePhase(
                phase="Stage 7",
                title="Online Submission & Factory Audit",
                status="identified",
                description="Final filing and inspection coordination on the official e-BIS portal.",
                details=[
                    "Register and submit Form-I at www.manakonline.in with application fee (₹1,000).",
                    "Host BIS inspecting officer for verification of manufacturing setup and sample drawing.",
                    "Pay operative marking fee after test report clearance to receive official license."
                ]
            )
        ]

        missing_details = []
        if not req.description:
            missing_details.append("Specific rated capacity, power rating, or dimensional sizing not specified.")
        if not req.intended_use:
            missing_details.append("Operating environment (domestic household vs industrial commercial) not specified.")
        missing_details.append("Factory manufacturing location (domestic India vs Foreign Manufacturer Scheme FMCS).")

        verification_guide = (
            f"Verify that '{top.is_number if top else 'the IS code'}' is current and not superseded by checking "
            "the official BIS Directory at https://www.manakonline.in."
        )

        return ComplianceCheckResponse(
            product_name=req.product_name,
            primary_standard=top,
            related_standards=related,
            conformance_scheme=scheme,
            mandatory_qco=mandatory,
            qco_notification=qco_note,
            why_it_applies=why_text,
            phases=phases,
            missing_details_to_confirm=missing_details,
            official_verification_guidance=verification_guide,
            disclaimer="Potentially applicable informational guidance based on Indian Standards compendium. Always verify statutory requirements on the official BIS portal (manakonline.in)."
        )

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Compliance check failed: {str(e)}")
