"""
Cost Estimator Service
Calculates statutory fee estimates for BIS product certification with MSME concessions.
Includes mandatory prototype guidance disclaimers.
"""

from typing import Dict, Any, Optional
from ..repositories.standards_repository import get_standards_repository

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
        if std and "fee_structure" in std and isinstance(std["fee_structure"], dict):
            fee_data.update(std["fee_structure"])

        base_marking = float(fee_data.get("base_marking_fee", 65000.0))
        application_fee = float(fee_data.get("application_fee", 1000.0))
        audit_per_day = float(fee_data.get("audit_fee_per_man_day", 7000.0))
        inspection_fee = audit_per_day * 2.0  # 2 days factory audit

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
            "standard_title": std.get("title", "") if std else "",
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
