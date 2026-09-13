"""
Verification Service & Providers
Multi-layered architecture:
1. BaseVerificationProvider (Abstract contract)
2. PrototypeVerificationProvider (Prototype demonstration with test dataset)
3. FutureOfficialBISProvider (Stub for government API integration)
"""

import re
from abc import ABC, abstractmethod
from typing import Dict, Any, Optional
from datetime import datetime

PROTOTYPE_DISCLAIMER = (
    "Prototype demonstration verification. Generated for SIH prototype evaluation "
    "and not connected to the live statutory BIS central database."
)

# Structured demo test registry for prototype verification
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
    "9200341": {
        "cml_number": "CM/L-9200341",
        "licensee_name": "Bisleri International Pvt Ltd",
        "brand": "Bisleri",
        "product": "Packaged Drinking Water (Other than Natural Mineral Water)",
        "applicable_is": "IS 14543:2016",
        "valid_upto": "15-October-2026",
        "factory_address": "Western Express Highway, Andheri East, Mumbai, Maharashtra - 400099",
        "surveillance_status": "Active • Microbiological Safety Validated",
        "qco_compliance": "Mandatory QCO Certified",
        "marking_fee_status": "Paid (Regular)"
    },
    "7100456": {
        "cml_number": "CM/L-7100456",
        "licensee_name": "Steel Authority of India Ltd (SAIL)",
        "brand": "SAIL TMT",
        "product": "High Strength Deformed Steel Bars (Fe 500D) for Concrete Reinforcement",
        "applicable_is": "IS 1786:2008",
        "valid_upto": "30-June-2028",
        "factory_address": "Bhilai Steel Plant, Durg, Chhattisgarh - 490001",
        "surveillance_status": "Active • Mechanical Tensile Benchmarks Met",
        "qco_compliance": "Mandatory QCO Certified",
        "marking_fee_status": "Paid (Central PSU)"
    },
    "4151908": {
        "cml_number": "CM/L-4151908",
        "licensee_name": "Steelbird Hi-Tech India Ltd",
        "brand": "Steelbird",
        "product": "Protective Helmets for Two-Wheeled Motor Vehicles",
        "applicable_is": "IS 4151:2020",
        "valid_upto": "28-February-2027",
        "factory_address": "Plot 54, EPIP Phase II, Jharmajri, Baddi, Himachal Pradesh - 174103",
        "surveillance_status": "Active • Drop Tower Impact Tests Passed",
        "qco_compliance": "Mandatory MoRTH QCO Certified",
        "marking_fee_status": "Paid (Regular)"
    },
    "3344556": {
        "cml_number": "CM/L-3344556",
        "licensee_name": "Apex Electricals (Suspended Licensee)",
        "brand": "Apex",
        "product": "Electric Immersion Water Heaters",
        "applicable_is": "IS 368:2014",
        "valid_upto": "EXPIRED (10-Jan-2024)",
        "factory_address": "Mayapuri Industrial Area Phase II, New Delhi - 110064",
        "surveillance_status": "SUSPENDED under Section 14 BIS Act 2016",
        "is_fraud": True,
        "nch_escalation_recommended": True,
        "qco_compliance": "Violation of Mandatory QCO — Selling Prohibited",
        "marking_fee_status": "Defaulted"
    }
}



class BaseVerificationProvider(ABC):
    @abstractmethod
    def verify(self, identifier: str, id_type: str) -> Dict[str, Any]:
        pass


class PrototypeVerificationProvider(BaseVerificationProvider):
    """
    Prototype verification provider adhering to official BIS formatting rules
    and known prototype demonstration records.
    """

    def verify(self, identifier: str, id_type: str = "auto") -> Dict[str, Any]:
        clean = (identifier or "").strip().upper()
        detected_type = id_type.lower()

        if detected_type == "auto":
            clean_digits = re.sub(r"[^0-9]", "", clean)
            if len(clean) == 6 and clean.isalnum() and not clean.isdigit():
                detected_type = "huid"
            elif len(clean_digits) == 7:
                detected_type = "cml"
            elif len(clean) == 6 and clean.isalnum():
                detected_type = "huid"
            else:
                detected_type = "huid" if len(clean) <= 6 else "cml"

        if detected_type == "huid":
            return self._verify_huid(clean)
        elif detected_type == "cml":
            return self._verify_cml(clean)
        else:
            return {
                "identifier": identifier,
                "type": "UNKNOWN",
                "status": "Invalid format",
                "is_valid": False,
                "details": {"message": "Supported formats: 6-character alphanumeric Gold HUID or 7-digit ISI CML number."},
                "is_prototype": True,
                "disclaimer": PROTOTYPE_DISCLAIMER
            }

    def _verify_huid(self, code: str) -> Dict[str, Any]:
        # HUID rule: 6 alphanumeric characters
        if len(code) != 6 or not re.match(r"^[A-Z0-9]{6}$", code):
            return {
                "identifier": code,
                "type": "HUID",
                "status": "Invalid format",
                "is_valid": False,
                "details": {
                    "message": f"HUID must consist of exactly 6 uppercase alphanumeric characters (found {len(code)})."
                },
                "is_prototype": True,
                "disclaimer": PROTOTYPE_DISCLAIMER
            }

        # Check known registry records
        if code in PROTOTYPE_HUID_REGISTRY:
            reg = PROTOTYPE_HUID_REGISTRY[code]
            is_fraud = reg.get("is_fraud", False)
            return {
                "identifier": code,
                "type": "HUID",
                "status": "FRAUD / INVALID" if is_fraud else "Valid / Found",
                "is_valid": not is_fraud,
                "is_fraud": is_fraud,
                "nch_escalation_recommended": reg.get("nch_escalation_recommended", False),
                "details": {
                    "huid": reg["huid"],
                    "jeweler": reg.get("jeweler", "BIS Licensed Jeweler"),
                    "purity": reg["purity"],
                    "jewellery_type": reg["jewellery_type"],
                    "assaying_centre": reg["assaying_centre"],
                    "standard": reg["hallmark_standard"],
                    "tested_date": reg.get("tested_date", "14-Aug-2025"),
                    "audit_trace": reg.get("audit_trace", f"TLOG-2026-{code}"),
                    "registration_status": reg.get("registration_status", "Operative on Registry"),
                    "note": "SUSPECTED COUNTERFEIT MARK - ESCALATE TO NCH" if is_fraud else "Authentic BIS 6-digit laser hallmarking verified."
                },
                "is_prototype": True,
                "disclaimer": PROTOTYPE_DISCLAIMER
            }

        # Procedural simulation for valid-format unlisted codes
        # First letter must not be 0 or O (BIS standard rule)
        if code.startswith("0") or code.startswith("O"):
            return {
                "identifier": code,
                "type": "HUID",
                "status": "Not Found",
                "is_valid": False,
                "details": {
                    "message": "No hallmark record found for this HUID. Authentic hallmarking codes do not start with 0 or O."
                },
                "is_prototype": True,
                "disclaimer": PROTOTYPE_DISCLAIMER
            }

        return {
            "identifier": code,
            "type": "HUID",
            "status": "Not Found",
            "is_valid": False,
            "details": {
                "message": "This HUID is not registered in the National Hallmarking Database.",
                "action_recommended": "Try demo codes: AK79B2, MH41C9, KA88X1 or report suspicious jewellery."
            },
            "is_prototype": True,
            "disclaimer": PROTOTYPE_DISCLAIMER
        }

    def _verify_cml(self, cml_input: str) -> Dict[str, Any]:
        digits_only = re.sub(r"[^0-9]", "", cml_input)

        if len(digits_only) != 7:
            return {
                "identifier": cml_input,
                "type": "CML",
                "status": "Invalid format",
                "is_valid": False,
                "details": {
                    "message": f"ISI CML license must contain exactly 7 numeric digits (e.g. CM/L-8400192). Found {len(digits_only)} digits."
                },
                "is_prototype": True,
                "disclaimer": PROTOTYPE_DISCLAIMER
            }

        if digits_only in PROTOTYPE_CML_REGISTRY:
            reg = PROTOTYPE_CML_REGISTRY[digits_only]
            is_fraud = reg.get("is_fraud", False)
            return {
                "identifier": f"CM/L-{digits_only}",
                "type": "CML",
                "status": "SUSPENDED / FRAUD" if is_fraud else "Valid / Found",
                "is_valid": not is_fraud,
                "is_fraud": is_fraud,
                "nch_escalation_recommended": reg.get("nch_escalation_recommended", False),
                "details": {
                    "cml_number": reg["cml_number"],
                    "licensee": reg["licensee_name"],
                    "brand": reg.get("brand", "Standard Mark"),
                    "product": reg["product"],
                    "applicable_standard": reg["applicable_is"],
                    "valid_upto": reg["valid_upto"],
                    "factory_location": reg["factory_address"],
                    "surveillance_status": reg.get("surveillance_status", "Active"),
                    "qco_compliance": reg.get("qco_compliance", "Mandatory QCO Certified"),
                    "status": "SUSPENDED UNDER SECTION 14" if is_fraud else "STATUTORILY OPERATIVE",
                    "verification_date": datetime.now().strftime("%d-%b-%Y"),
                    "audit_trace": f"AUDIT-BIS-{digits_only}-2026"
                },
                "is_prototype": True,
                "disclaimer": PROTOTYPE_DISCLAIMER
            }

        return {
            "identifier": f"CM/L-{digits_only}",
            "type": "CML",
            "status": "Not Found",
            "is_valid": False,
            "details": {
                "message": f"License CM/L-{digits_only} was not found in the prototype active registry.",
                "action_recommended": "Try demo licenses: 8400192 (Havells), 9200341 (Bisleri), 4151908 (Steelbird), 7100456 (SAIL), or 3344556 (Suspended)."
            },
            "is_prototype": True,
            "disclaimer": PROTOTYPE_DISCLAIMER
        }



class VerificationService:
    def __init__(self, provider: Optional[BaseVerificationProvider] = None):
        self.provider = provider or PrototypeVerificationProvider()

    def verify_identifier(self, identifier: str, id_type: str = "auto") -> Dict[str, Any]:
        try:
            return self.provider.verify(identifier, id_type)
        except Exception as e:
            return {
                "identifier": identifier,
                "type": id_type.upper(),
                "status": "Unable to verify",
                "is_valid": False,
                "details": {"error": str(e)},
                "is_prototype": True,
                "disclaimer": PROTOTYPE_DISCLAIMER
            }


_verifier_instance: Optional[VerificationService] = None


def get_verification_service() -> VerificationService:
    global _verifier_instance
    if _verifier_instance is None:
        _verifier_instance = VerificationService()
    return _verifier_instance
