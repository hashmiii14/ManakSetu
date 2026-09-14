"""
Certification Navigator Service
- Guided 10-stage statutory conformity roadmap
- Scheme selection (Scheme-I ISI, Scheme-II CRS, Scheme-IV ECO, FMCS)
- Document checklist and estimated timelines
"""

from __future__ import annotations
from typing import Dict, Any, List, Optional


CERTIFICATION_STAGES: List[Dict[str, Any]] = [
    {
        "step": 1,
        "title": "Identify Product & Scope",
        "category": "Classification",
        "estimated_time": "1 - 2 Days",
        "description": "Determine the exact technical classification, capacity, voltage/grade ratings, and end-use of the product intended for manufacture or import into India.",
        "requirements": [
            "Technical product specification and datasheet",
            "Target market (Domestic vs Export)",
            "Intended brand / trade names"
        ],
        "documents": ["Product Datasheet", "Bill of Materials (BOM)"],
        "official_portal": "https://www.manakonline.in",
        "statutory_note": "Ensure accurate product grouping as per BIS Guidelines for Product Manuals."
    },
    {
        "step": 2,
        "title": "Find Applicable Indian Standard (IS Code)",
        "category": "Standards Mapping",
        "estimated_time": "1 - 3 Days",
        "description": "Locate the primary Indian Standard governing the product. Verify whether the standard is currently notified under a Mandatory Quality Control Order (QCO).",
        "requirements": [
            "Harmonized System of Nomenclature (HSN) Code",
            "Indian Standard (IS) Number and latest revision year",
            "Gazette Notification / QCO implementation date check"
        ],
        "documents": ["Copy of Relevant Indian Standard", "QCO Notification (if applicable)"],
        "official_portal": "https://www.services.bis.gov.in/php/BIS_2.0/bisconnect/knowyourstandards/indian_standards/isdetails",
        "statutory_note": "If a Mandatory QCO applies, production or import without the ISI mark is prohibited under Section 29 of the BIS Act, 2016."
    },
    {
        "step": 3,
        "title": "Select Conformity Assessment Scheme",
        "category": "Scheme Selection",
        "estimated_time": "1 - 2 Days",
        "description": "Identify the statutory scheme: Scheme-I (ISI Mark for Domestic Manufacturers), Scheme-II (Compulsory Registration Scheme CRS for Electronics/IT), Scheme-IV (ECO Mark), or FMCS (Foreign Manufacturers Certification Scheme).",
        "requirements": [
            "Manufacturing premises location (India vs Foreign)",
            "Product nature (Electronics/IT vs Industrial/Consumer)",
            "Authorized Indian Representative (AIR) for foreign entities"
        ],
        "documents": ["Factory Registration Proof", "IEC (Import Export Code) if importing"],
        "official_portal": "https://www.manakonline.in/MANAK/ApplicationSubmission",
        "statutory_note": "MSME enterprises are entitled to a statutory 50% concession on application and marking fees under Scheme-I."
    },
    {
        "step": 4,
        "title": "Review Scheme of Testing & Inspection (STI)",
        "category": "Quality Assurance",
        "estimated_time": "3 - 7 Days",
        "description": "Examine the product-specific Scheme of Testing and Inspection (STI) issued by BIS. The STI specifies mandatory routine tests, acceptance tests, sampling frequency, and maintenance of test registers.",
        "requirements": [
            "Review STI document for the specific IS code",
            "Understand frequency of routine vs lot acceptance tests",
            "Appoint qualified Quality Control Personnel (chemist/engineer)"
        ],
        "documents": ["Product-specific STI Copy", "QC Staff Qualification Certificates"],
        "official_portal": "https://www.services.bis.gov.in",
        "statutory_note": "In-house lab testing records must be maintained in prescribed statutory registers."
    },
    {
        "step": 5,
        "title": "Install In-House Testing Infrastructure",
        "category": "Factory Setup",
        "estimated_time": "1 - 4 Weeks",
        "description": "Establish a dedicated internal test laboratory equipped with calibrated instruments capable of executing all routine and acceptance tests required by the Indian Standard.",
        "requirements": [
            "Procurement of standard test apparatus (e.g. pressure gauges, high voltage testers, tensile machines)",
            "Valid calibration certificates from NABL-accredited calibration labs",
            "Plant layout showing segregated testing area"
        ],
        "documents": ["List of In-House Test Equipment", "Calibration Certificates (NABL-traceable)", "Factory Layout Diagram"],
        "official_portal": "https://www.manakonline.in",
        "statutory_note": "Equipment without traceable calibration will lead to factory audit rejection."
    },
    {
        "step": 6,
        "title": "Pre-Certification Third-Party Testing",
        "category": "Sample Testing",
        "estimated_time": "1 - 3 Weeks",
        "description": "Produce test samples and subject them to independent testing at a BIS Central Laboratory or BIS-recognized NABL accredited laboratory to confirm conformance prior to filing.",
        "requirements": [
            "Selection of accredited lab from national network",
            "Dispatch of sealed product samples with testing requisition",
            "Receipt of complete test report showing 'PASS' on all parameters"
        ],
        "documents": ["Independent Lab Test Report (NABL accredited)", "Sample Identification Slip"],
        "official_portal": "https://www.services.bis.gov.in/php/BIS_2.0/bisconnect/lab",
        "statutory_note": "Test report must not be older than 90 days at the time of formal application."
    },
    {
        "step": 7,
        "title": "Submit Application on e-BIS Portal",
        "category": "Digital Filing",
        "estimated_time": "1 - 2 Days",
        "description": "Submit Form-I on the official BIS ManakOnline portal along with all statutory enclosures, factory layout, list of machinery, test reports, and non-refundable application fee.",
        "requirements": [
            "Portal registration on manakonline.in with company PAN and GSTIN",
            "Digital upload of manufacturing machinery and testing instruments list",
            "Online payment of application fee (₹1,000 for standard, ₹500 for micro)"
        ],
        "documents": ["Form-I Application", "PAN & GST Registration", "MSME Udyam Certificate", "Self-Declaration on Raw Materials"],
        "official_portal": "https://www.manakonline.in",
        "statutory_note": "Uploading authentic MSME Udyam certificate automatically applies 50% fee concession."
    },
    {
        "step": 8,
        "title": "Factory Audit & Assessment",
        "category": "Physical Verification",
        "estimated_time": "1 - 2 Weeks",
        "description": "A designated BIS Technical Inspecting Officer visits the manufacturing premises to verify manufacturing machinery, in-house lab equipment, testing proficiency, and sample draw.",
        "requirements": [
            "Factory in active operation on audit date",
            "Demonstration of in-house testing by QC personnel before the inspector",
            "Drawing and sealing of independent counter-samples for BIS confirmatory testing"
        ],
        "documents": ["Verification Report (signed by Auditor and Applicant)", "Sample Sealing Slip"],
        "official_portal": "https://www.manakonline.in",
        "statutory_note": "Any discrepancies (deficiencies) must be rectified within 30 days of audit notice."
    },
    {
        "step": 9,
        "title": "Grant of License (CM/L)",
        "category": "Licensing",
        "estimated_time": "3 - 7 Days",
        "description": "Upon satisfactory verification report and passing of counter-samples, BIS issues the formal Certificate of Manufacturing License (CM/L) granting permission to affix the Standard ISI Mark.",
        "requirements": [
            "Remittance of minimum marking fee and annual license fee",
            "Agreement on Marking Fee structure and monthly production returns schedule",
            "Download of digital CM/L Certificate with unique 7-digit license number"
        ],
        "documents": ["CM/L License Certificate", "Marking Fee Receipt", "Approved Label Artwork with ISI Mark & CM/L Number"],
        "official_portal": "https://www.manakonline.in",
        "statutory_note": "The CM/L number must be clearly marked adjacent to the ISI pyramid monogram on product labels."
    },
    {
        "step": 10,
        "title": "Post-Licensing Compliance & Renewal",
        "category": "Surveillance",
        "estimated_time": "Ongoing (Annual Renewal)",
        "description": "Maintain uninterrupted compliance with the STI. BIS conducts unannounced surveillance factory audits and market sample draws. License must be renewed periodically.",
        "requirements": [
            "Timely quarterly or annual submission of production returns",
            "Remittance of volume-based marking fee",
            "Online filing of renewal application 30 days prior to expiry"
        ],
        "documents": ["Production Returns Statement", "Annual Renewal Application Form", "Marking Fee Reconciliation Statement"],
        "official_portal": "https://www.manakonline.in",
        "statutory_note": "Suspension or cancellation of license occurs if market samples fail statutory benchmarks."
    }
]


class CertificationService:
    def get_stages(self) -> List[Dict[str, Any]]:
        return CERTIFICATION_STAGES

    def get_stage_by_step(self, step: int) -> Optional[Dict[str, Any]]:
        for stage in CERTIFICATION_STAGES:
            if stage["step"] == step:
                return stage
        return None

    def generate_roadmap(self, standard_code: str, enterprise_type: str = "micro") -> Dict[str, Any]:
        is_micro = enterprise_type.lower() in ("micro", "small")
        return {
            "standard_code": standard_code,
            "enterprise_type": enterprise_type,
            "concession_eligible": is_micro,
            "concession_details": "50% rebate on statutory application and minimum marking fee under MSME Scheme" if is_micro else "Standard Statutory Tariff",
            "total_stages": len(CERTIFICATION_STAGES),
            "stages": CERTIFICATION_STAGES,
            "portal": "https://www.manakonline.in"
        }

    def get_compliance_roadmap(self, product_type: str = "", enterprise_tier: str = "micro") -> Dict[str, Any]:
        return self.generate_roadmap(product_type, enterprise_tier)


_cert_service = None

def get_certification_service() -> CertificationService:
    global _cert_service
    if _cert_service is None:
        _cert_service = CertificationService()
    return _cert_service
