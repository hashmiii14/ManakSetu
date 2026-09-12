import json
import uuid
from datetime import datetime
from typing import List, Dict, Any, Optional
from pathlib import Path
from ..config import REPORTS_FILE_PATH


class ReportRepository:
    def __init__(self, file_path: Optional[Path] = None):
        self.file_path = file_path or REPORTS_FILE_PATH
        self._reports: List[Dict[str, Any]] = []
        self._load()

    def _load(self) -> None:
        if self.file_path.exists():
            try:
                with open(self.file_path, "r", encoding="utf-8") as f:
                    self._reports = json.load(f)
            except Exception as e:
                print(f"[ReportRepository] Failed to load reports: {e}")
                self._reports = []
        else:
            self._reports = []

    def _save(self) -> None:
        try:
            self.file_path.parent.mkdir(parents=True, exist_ok=True)
            with open(self.file_path, "w", encoding="utf-8") as f:
                json.dump(self._reports, f, indent=2, ensure_ascii=False)
        except Exception as e:
            print(f"[ReportRepository] Failed to save reports: {e}")

    def create_report(
        self,
        identifier: str,
        category: str,
        description: str,
        contact: str = ""
    ) -> Dict[str, Any]:
        report_id = f"REP-{datetime.now().strftime('%Y%m%d')}-{uuid.uuid4().hex[:6].upper()}"
        created_at = datetime.now().isoformat()
        
        report = {
            "id": report_id,
            "identifier": identifier,
            "category": category,
            "description": description,
            "contact": contact,
            "status": "SUBMITTED_FOR_SCRUTINY",
            "created_at": created_at
        }
        self._reports.append(report)
        self._save()
        return report

    def get_all(self) -> List[Dict[str, Any]]:
        return self._reports


_report_repo_instance: Optional[ReportRepository] = None


def get_report_repository() -> ReportRepository:
    global _report_repo_instance
    if _report_repo_instance is None:
        _report_repo_instance = ReportRepository()
    return _report_repo_instance
