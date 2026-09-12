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
        "purity": "22K (916 Fineness)",
        "jewellery_type": "Gold Bangle / Ornament",
        "assaying_centre": "BIS Recognized Assaying Centre, Karol Bagh, Delhi (AHC-DL-014)",
        "hallmark_standard": "IS 1417:2016",
        "registration_status": "Operative on Registry"
    },
    "MH41C9": {
        "huid": "MH41C9",
        "purity": "18K (750 Fineness)",
        "jewellery_type": "Gold Ring with Gemstones",
        "assaying_centre": "Apex Precious Metals Testing Laboratory, Mumbai (AHC-MH-082)",
        "hallmark_standard": "IS 1417:2016",
        "registration_status": "Operative on Registry"
    },
    "KA88X1": {
        "huid": "KA88X1",
        "purity": "24K (995 Fineness)",
        "jewellery_type": "Gold Bullion Bar",
        "assaying_centre": "Southern Hallmarking Centre, Bengaluru (AHC-KA-003)",
        "hallmark_standard": "IS 1417:2016",
        "registration_status": "Operative on Registry"
    }
}

PROTOTYPE_CML_REGISTRY = {
    "8400192": {
        "cml_number": "CM/L-8400192",
        "licensee_name": "Orient Electric Appliances Ltd.",
        "product": "Stationary Storage Type Electric Water Heaters",
        "applicable_is": "IS 2082:2018",
        "valid_upto": "31-December-2027",
        "factory_address": "Plot 12, Sector 6, Faridabad, Haryana",
        "surveillance_status": "Periodic Factory Surveillance Passed"
    },
    "9200341": {
        "cml_number": "CM/L-9200341",
        "licensee_name": "Bisleri International Pvt Ltd",
        "product": "Packaged Drinking Water",
        "applicable_is": "IS 14543:2016",
        "valid_upto": "15-October-2026",
        "factory_address": "Western Express Highway, Andheri East, Mumbai",
        "surveillance_status": "Periodic Water Testing In Spec"
    },
    "7100456": {
        "cml_number": "CM/L-7100456",
        "licensee_name": "Steel Authority of India Ltd (SAIL)",
        "product": "High Strength Deformed Steel Bars (Fe 500D)",
        "applicable_is": "IS 1786:2008",
        "valid_upto": "30-June-2028",
        "factory_address": "Bhilai Steel Plant, Durg, Chhattisgarh",
        "surveillance_status": "Active & Verified"
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
            return {
                "identifier": code,
                "type": "HUID",
                "status": "Valid / Found",
                "is_valid": True,
                "details": {
                    "huid": reg["huid"],
                    "purity": reg["purity"],
                    "jewellery_type": reg["jewellery_type"],
                    "assaying_centre": reg["assaying_centre"],
                    "standard": reg["hallmark_standard"],
                    "verification_date": datetime.now().strftime("%d-%b-%Y"),
                    "note": "Authentic BIS Hallmarking confirmed on prototype register."
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
                    "message": "No hallmark record found for this HUID. Hallmarking codes do not start with 0 or O."
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
                "message": "This HUID is not registered in the prototype verification database.",
                "action_recommended": "Try demo codes: AK79B2, MH41C9, KA88X1 or report if purchased from an uncertified vendor."
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
            return {
                "identifier": f"CM/L-{digits_only}",
                "type": "CML",
                "status": "Valid / Found",
                "is_valid": True,
                "details": {
                    "cml_number": reg["cml_number"],
                    "licensee": reg["licensee_name"],
                    "product": reg["product"],
                    "applicable_standard": reg["applicable_is"],
                    "valid_upto": reg["valid_upto"],
                    "factory_location": reg["factory_address"],
                    "status": "STATUTORILY OPERATIVE",
                    "verification_date": datetime.now().strftime("%d-%b-%Y")
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
                "action_recommended": "Try demo licenses: 8400192 (Water Heater), 9200341 (Packaged Water), 7100456 (Steel), or submit a violation report."
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
