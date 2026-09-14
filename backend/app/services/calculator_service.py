"""
Cost Estimator Service
Calculates statutory fee estimates for BIS product certification with MSME concessions.
Includes mandatory prototype guidance disclaimers.
"""

from typing import Dict, Any, Optional
from ..database.repositories import get_standards_repository

DISCLAIMER_TEXT = (
    "Fee estimates are for prototype guidance and should be verified against "
    "the latest official BIS fee schedule on manakonline.in."
)

DEFAULT_FEE_STRUCTURE = {
    "application_fee": 1000.0,
    "annual_license_fee": 1000.0,
    "audit_fee_per_man_day": 7000.0,
    "base_marking_fee": 65000.0,
    "micro_concession_percent": 50,
    "small_concession_percent": 20
}

# Standard-specific base fees for realistic statutory calculations
KNOWN_STANDARD_FEES = {
    "1489": {"base_marking_fee": 185000.0, "title": "Portland Pozzolana Cement (Fly Ash Based)"},
    "12269": {"base_marking_fee": 195000.0, "title": "53 Grade Ordinary Portland Cement"},
    "2082": {"base_marking_fee": 84000.0, "title": "Stationary Storage Electric Water Heaters"},
    "4151": {"base_marking_fee": 72000.0, "title": "Protective Helmets for Two-Wheeler Riders"},
    "9873": {"base_marking_fee": 65000.0, "title": "Safety of Toys"},
    "3854": {"base_marking_fee": 70000.0, "title": "Switches for Domestic and Similar Fixed Installations"},
    "14543": {"base_marking_fee": 160000.0, "title": "Packaged Drinking Water (Other than Mineral Water)"},
    "1786": {"base_marking_fee": 180000.0, "title": "High Strength Deformed Steel Bars for Concrete Reinforcement"},
}


class CostCalculatorService:
    def __init__(self):
        self.standards_repo = get_standards_repository()

    def estimate_cost(
        self,
        standard_code: str,
        enterprise_type: str = "micro"
    ) -> Dict[str, Any]:
        ent_type = (enterprise_type or "micro").lower().strip()
        std = self.standards_repo.get_by_is_number(standard_code)
        
        fee_data = DEFAULT_FEE_STRUCTURE.copy()
        std_title = ""

        # Check standard document fee structure
        if std:
            std_title = std.get("title", "")
            if "fee_structure" in std and isinstance(std["fee_structure"], dict):
                fee_data.update(std["fee_structure"])

        # Check known fees map
        for code_num, spec in KNOWN_STANDARD_FEES.items():
            if code_num in standard_code:
                fee_data["base_marking_fee"] = spec["base_marking_fee"]
                if not std_title:
                    std_title = spec["title"]
                break

        base_marking = float(fee_data.get("base_marking_fee", 65000.0))
        application_fee = float(fee_data.get("application_fee", 1000.0))
        audit_per_day = float(fee_data.get("audit_fee_per_man_day", 7000.0))
        inspection_fee = audit_per_day * 2.0  # 2 days factory audit inspection

        if ent_type in ("micro", "women_startup"):
            concession_percent = int(fee_data.get("micro_concession_percent", 50))
        elif ent_type == "small":
            concession_percent = int(fee_data.get("small_concession_percent", 20))
        else:
            concession_percent = 0

        effective_marking = base_marking * (1.0 - (concession_percent / 100.0))
        total_savings = base_marking - effective_marking
        total_estimated = application_fee + inspection_fee + effective_marking

        return {
            "standard_code": std["standard"] if std else standard_code,
            "standard_title": std_title or (std.get("title", "") if std else standard_code),
            "enterprise_type": ent_type,
            "concession_percent": concession_percent,
            "base_marking_fee": round(base_marking, 2),
            "effective_marking_fee": round(effective_marking, 2),
            "application_fee": round(application_fee, 2),
            "inspection_fee": round(inspection_fee, 2),
            "total_estimated_cost": round(total_estimated, 2),
            "total_savings": round(total_savings, 2),
            "disclaimer": DISCLAIMER_TEXT
        }


_calculator_instance: Optional[CostCalculatorService] = None


def get_calculator_service() -> CostCalculatorService:
    global _calculator_instance
    if _calculator_instance is None:
        _calculator_instance = CostCalculatorService()
    return _calculator_instance
