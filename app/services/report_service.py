"""
Grievance and Violation Reporting Service
"""

from typing import Dict, Any, List, Optional
from ..database.repositories import get_report_repository


class ReportService:
    def __init__(self):
        self.repo = get_report_repository()

    def submit_violation_report(
        self,
        identifier: str,
        category: str,
        description: str,
        contact: str = "",
        location: str = ""
    ) -> Dict[str, Any]:
        return self.repo.create_report(
            identifier=identifier,
            category=category,
            description=description,
            contact=contact,
            location=location
        )

    def list_recent_reports(self) -> List[Dict[str, Any]]:
        return self.repo.get_all()


_report_service_instance: Optional[ReportService] = None


def get_report_service() -> ReportService:
    global _report_service_instance
    if _report_service_instance is None:
        _report_service_instance = ReportService()
    return _report_service_instance
