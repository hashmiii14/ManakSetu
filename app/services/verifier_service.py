"""
TrueMark Verification Service
Dual-layer verification engine for:
1. ISI Mark CM/L 7-digit manufacturer licenses
2. Gold Hallmarking 6-character HUID codes
Includes prototype disclaimer and NCH complaint dispatch.
"""

import re
from typing import Dict, Any, Optional
from datetime import datetime

PROTOTYPE_DISCLAIMER = (
    "Prototype demonstration verification. Generated for Smart India Hackathon 2026 "
    "evaluation and not connected to the live statutory BIS central database."
)

PROTOTYPE_HUID_REGISTRY = {
    "AK79B2": {
        "huid": "AK79B2",
        "jeweler": "Tanishq (Titan Company Ltd)",
        "purity": "22K (916 Fineness)",
        "jewellery_type": "Gold Bangle / Ornament",
        "assaying_centre": "BIS Recognized Assaying & Hallmarking Centre, Karol Bagh, Delhi (AHC-DL-014)",
        "hallmark_standard": "IS 1417:2016",
        "registration_status": "Operative on National Hallmarking Registry",
        "tested_date": "14-Aug-2025",
        "audit_trace": "TLOG-DL-89421-AHC"
    },
    "MH41C9": {
        "huid": "MH41C9",
        "jeweler": "Kalyan Jewellers India Ltd",
        "purity": "18K (750 Fineness)",
        "jewellery_type": "Gold Ring with Gemstones",
        "assaying_centre": "Apex Precious Metals Assaying Centre, Zaveri Bazaar, Mumbai (AHC-MH-082)",
        "hallmark_standard": "IS 1417:2016",
        "registration_status": "Operative on National Hallmarking Registry",
        "tested_date": "02-Jan-2026",
        "audit_trace": "TLOG-MH-10294-AHC"
    },
    "KA88X1": {
        "huid": "KA88X1",
        "jeweler": "Malabar Gold & Diamonds",
        "purity": "24K (995 Fineness)",
        "jewellery_type": "Gold Bullion Bar (50g)",
        "assaying_centre": "Southern Hallmarking Centre, Bengaluru (AHC-KA-003)",
        "hallmark_standard": "IS 1417:2016",
        "registration_status": "Operative on National Hallmarking Registry",
        "tested_date": "19-Nov-2025",
        "audit_trace": "TLOG-KA-77821-AHC"
    },
    "XX9999": {
        "huid": "XX9999",
        "jeweler": "Unregistered / Unknown Trader",
        "purity": "Suspicious / Counterfeit Inscription",
        "jewellery_type": "Gold Chain",
        "assaying_centre": "None — Laser Inscription Failed Checksum",
        "hallmark_standard": "IS 1417:2016",
        "registration_status": "FRAUD DETECTED — Not in Central Hallmarking Database",
        "is_fraud": True,
        "nch_escalation_recommended": True,
        "tested_date": "N/A",
        "audit_trace": "FLAGGED-SUSPICIOUS-HUID-009"
    }
}

PROTOTYPE_CML_REGISTRY = {
    "6200145": {
        "cml_number": "CM/L-6200145",
        "licensee_name": "UltraTech Cement Limited",
        "brand": "UltraTech Cement",
        "product": "Portland Pozzolana Cement (Fly Ash Based) & 53 Grade OPC",
        "applicable_is": "IS 1489 (Part 1): 2015 & IS 12269: 2013",
        "valid_upto": "30-June-2027",
        "factory_address": "Kotputli Cement Works, NH-8, Kotputli, Jaipur, Rajasthan - 303108",
        "surveillance_status": "Active • Factory Surveillance Passed",
        "qco_compliance": "Mandatory Cement QCO Order Certified",
        "marking_fee_status": "Paid (Regular)",
        "packaging_rule": "Red Lettering (IS 1489 PPC) / Black Lettering (IS 12269 OPC)"
    },
    "8400192": {
        "cml_number": "CM/L-8400192",
        "licensee_name": "Havells India Limited",
        "brand": "Havells",
        "product": "Stationary Storage Type Electric Water Heaters (Geysers)",
        "applicable_is": "IS 2082:2018",
        "valid_upto": "31-December-2027",
        "factory_address": "Plot 12, Sector 6, Industrial Area, Faridabad, Haryana - 121006",
        "surveillance_status": "Active • Factory Surveillance Passed",
        "qco_compliance": "Mandatory QCO Certified",
        "marking_fee_status": "Paid (Regular)"
    },
    "7100341": {
        "cml_number": "CM/L-7100341",
        "licensee_name": "Panasonic Life Solutions India Pvt Ltd",
        "brand": "Anchor by Panasonic",
        "product": "Switches for Domestic and Similar Fixed Electrical Installations",
        "applicable_is": "IS 3854:1997",
        "valid_upto": "15-October-2026",
        "factory_address": "Survey No 42, Daman Industrial Estate, Daman - 396210",
        "surveillance_status": "Active • Audit Compliant",
        "qco_compliance": "Mandatory Electrical Accessories QCO Certified",
        "marking_fee_status": "Paid (Regular)"
    },
    "4300921": {
        "cml_number": "CM/L-4300921",
        "licensee_name": "Finolex Cables Limited",
        "brand": "Finolex",
        "product": "PVC Insulated Cables for Working Voltages up to and including 1100 V",
        "applicable_is": "IS 694:2010",
        "valid_upto": "31-March-2028",
        "factory_address": "26/27, Mumbai-Pune Road, Pimpri, Pune, Maharashtra - 411018",
        "surveillance_status": "Active • Factory Surveillance Passed",
        "qco_compliance": "Mandatory Wire & Cable QCO Certified",
        "marking_fee_status": "Paid (Regular)"
    },
    "9100412": {
        "cml_number": "CM/L-9100412",
        "licensee_name": "Steel Authority of India Limited (SAIL)",
        "brand": "SAIL TMT",
        "product": "High Strength Deformed Steel Bars for Concrete Reinforcement",
        "applicable_is": "IS 1786:2008",
        "valid_upto": "30-September-2027",
        "factory_address": "Bhilai Steel Plant, Bhilai, Durg, Chhattisgarh - 490001",
        "surveillance_status": "Active • Surveillance Passed",
        "qco_compliance": "Mandatory Steel QCO Certified",
        "marking_fee_status": "Paid (Regular)"
    },
    "9900000": {
        "cml_number": "CM/L-9900000",
        "licensee_name": "Defunct Manufacturing Works",
        "brand": "Unapproved",
        "product": "Electrical Appliances",
        "applicable_is": "IS 302:2008",
        "valid_upto": "12-January-2023",
        "factory_address": "Unknown / Unverified",
        "surveillance_status": "SUSPENDED / CANCELLED — Non-Payment of Marking Fee",
        "qco_compliance": "INVALID — Manufacturing / Sale is Prohibited",
        "marking_fee_status": "Defaulter",
        "is_fraud": True,
        "nch_escalation_recommended": True
    }
}


class TrueMarkVerifierService:
    def verify_identifier(self, identifier: str, id_type: str = "auto") -> Dict[str, Any]:
        clean_id = re.sub(r"[^a-zA-Z0-9]", "", identifier or "").upper()
        if not clean_id:
            return {
                "identifier": identifier,
                "type": "unknown",
                "status": "INVALID_INPUT",
                "is_valid": False,
                "details": {"error": "Please provide a valid 6-character HUID or 7-digit CM/L number."},
                "is_prototype": True,
                "disclaimer": PROTOTYPE_DISCLAIMER
            }

        # Auto-detect type
        detected_type = id_type.lower()
        if detected_type == "auto":
            if len(clean_id) == 6 and any(c.isalpha() for c in clean_id):
                detected_type = "huid"
            else:
                detected_type = "cml"

        if detected_type == "huid":
            return self._verify_huid(clean_id)
        else:
            return self._verify_cml(clean_id)

    def _verify_huid(self, clean_id: str) -> Dict[str, Any]:
        if clean_id in PROTOTYPE_HUID_REGISTRY:
            record = PROTOTYPE_HUID_REGISTRY[clean_id]
            is_valid = not record.get("is_fraud", False)
            status = "FRAUD_SUSPECTED" if record.get("is_fraud") else "VERIFIED_ACTIVE"
            return {
                "identifier": clean_id,
                "type": "Gold Hallmarking (HUID)",
                "status": status,
                "is_valid": is_valid,
                "details": record,
                "is_prototype": True,
                "disclaimer": PROTOTYPE_DISCLAIMER
            }

        # Validate syntax: 6 characters alphanumeric
        if len(clean_id) == 6:
            return {
                "identifier": clean_id,
                "type": "Gold Hallmarking (HUID)",
                "status": "VALID_SYNTAX_DEMO",
                "is_valid": True,
                "details": {
                    "huid": clean_id,
                    "jeweler": "Certified BIS Hallmark Jeweler (Representative)",
                    "purity": "22K (916 Hallmarked)",
                    "jewellery_type": "Gold Ornament",
                    "assaying_centre": "BIS Recognized Assaying Centre (Sample Registry Record)",
                    "hallmark_standard": "IS 1417:2016",
                    "registration_status": "Valid HUID Format — Verify on BIS CARE App",
                    "tested_date": "Recently Hallmarked",
                    "note": "Prototype mock registry entry. For statutory consumer purchase verification, use the BIS CARE App."
                },
                "is_prototype": True,
                "disclaimer": PROTOTYPE_DISCLAIMER
            }

        return {
            "identifier": clean_id,
            "type": "Gold Hallmarking (HUID)",
            "status": "INVALID_HUID_FORMAT",
            "is_valid": False,
            "details": {
                "error": f"'{clean_id}' does not match standard 6-character alphanumeric BIS Hallmarking Unique Identification (HUID) format."
            },
            "is_prototype": True,
            "disclaimer": PROTOTYPE_DISCLAIMER
        }

    def _verify_cml(self, clean_id: str) -> Dict[str, Any]:
        # Strip CM/L prefix if present
        numeric_part = re.sub(r"\D", "", clean_id)
        
        if numeric_part in PROTOTYPE_CML_REGISTRY:
            record = PROTOTYPE_CML_REGISTRY[numeric_part]
            is_valid = not record.get("is_fraud", False)
            status = "LICENSE_SUSPENDED" if record.get("is_fraud") else "VERIFIED_OPERATIVE"
            return {
                "identifier": f"CM/L-{numeric_part}",
                "type": "ISI Certification (CM/L)",
                "status": status,
                "is_valid": is_valid,
                "details": record,
                "is_prototype": True,
                "disclaimer": PROTOTYPE_DISCLAIMER
            }

        if len(numeric_part) == 7:
            return {
                "identifier": f"CM/L-{numeric_part}",
                "type": "ISI Certification (CM/L)",
                "status": "UNREGISTERED_IN_SAMPLE_DATASET",
                "is_valid": False,
                "details": {
                    "cml_number": f"CM/L-{numeric_part}",
                    "registration_status": "Not Found in SIH Prototype Sample Database",
                    "action_required": "Please verify live operative status at https://www.manakonline.in under 'Conformity Assessment' -> 'Search Licensee'.",
                    "is_fraud": False
                },
                "is_prototype": True,
                "disclaimer": PROTOTYPE_DISCLAIMER
            }

        return {
            "identifier": clean_id,
            "type": "ISI Certification (CM/L)",
            "status": "INVALID_CML_FORMAT",
            "is_valid": False,
            "details": {
                "error": f"'{clean_id}' is not a valid 7-digit BIS License (CM/L) number."
            },
            "is_prototype": True,
            "disclaimer": PROTOTYPE_DISCLAIMER
        }


_verifier_service_instance: Optional[TrueMarkVerifierService] = None


def get_verification_service() -> TrueMarkVerifierService:
    global _verifier_service_instance
    if _verifier_service_instance is None:
        _verifier_service_instance = TrueMarkVerifierService()
    return _verifier_service_instance
