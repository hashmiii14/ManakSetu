"""
Data Repositories for BIS Standards and Violation Reports
"""

import json
from datetime import datetime
from pathlib import Path
from typing import List, Dict, Any, Optional

from ..config import PROCESSED_DATA_PATH, REPORTS_FILE_PATH
from ..utils.helpers import generate_report_id, normalize_is_code
from .connection import get_db_manager


class StandardsRepository:
    def __init__(self, data_path: Optional[Path] = None):
        self.data_path = data_path or PROCESSED_DATA_PATH
        self._standards: List[Dict[str, Any]] = []
        self._lookup: Dict[str, Dict[str, Any]] = {}
        self._load()

    def _load(self) -> None:
        if not self.data_path.exists():
            print(f"[StandardsRepository] Warning: {self.data_path} not found.")
            return

        with open(self.data_path, "r", encoding="utf-8") as f:
            self._standards = json.load(f)

        for std in self._standards:
            key = normalize_is_code(std.get("standard", ""))
            if key:
                self._lookup[key] = std

    def get_all(self) -> List[Dict[str, Any]]:
        return self._standards

    def get_by_is_number(self, is_number: str) -> Optional[Dict[str, Any]]:
        if not is_number:
            return None
        norm = normalize_is_code(is_number)
        if norm in self._lookup:
            return self._lookup[norm]

        # Fuzzy match / substring lookup
        for k, v in self._lookup.items():
            if norm in k or k in norm:
                return v
        return None

    def get_by_code(self, code: str) -> Optional[Dict[str, Any]]:
        return self.get_by_is_number(code)

    def list_categories(self) -> List[str]:
        categories = set()
        for std in self._standards:
            cat = std.get("category")
            if cat:
                categories.add(cat.strip())
        return sorted(list(categories))

    def filter_by_category(self, category: str) -> List[Dict[str, Any]]:
        if not category or category.upper() == "ALL":
            return self._standards
        cat_lower = category.lower().strip()
        return [s for s in self._standards if cat_lower in s.get("category", "").lower()]


class ReportRepository:
    def __init__(self):
        self.db_manager = get_db_manager()

    def create_report(
        self,
        identifier: str,
        category: str,
        description: str,
        contact: str = "",
        location: str = ""
    ) -> Dict[str, Any]:
        report_id = generate_report_id()
        created_at = datetime.now().isoformat()

        report = {
            "id": report_id,
            "identifier": identifier,
            "category": category,
            "description": description,
            "contact": contact,
            "location": location,
            "status": "SUBMITTED_FOR_SCRUTINY",
            "created_at": created_at
        }

        # Save to database
        saved_to_db = False
        try:
            conn = self.db_manager.get_connection()
            cur = conn.cursor()
            cur.execute(
                """
                INSERT INTO reports (id, identifier, category, description, contact, location, status, created_at)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?)
                """ if not self.db_manager.is_postgres else """
                INSERT INTO reports (id, identifier, category, description, contact, location, status, created_at)
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
                """,
                (report_id, identifier, category, description, contact, location, "SUBMITTED_FOR_SCRUTINY", created_at)
            )
            conn.commit()
            conn.close()
            saved_to_db = True
        except Exception as e:
            print(f"[ReportRepository] Database insert notice ({e}). Appending to local JSON backup.")

        # Fallback JSON persistence
        if not saved_to_db or True:
            try:
                REPORTS_FILE_PATH.parent.mkdir(parents=True, exist_ok=True)
                existing = []
                if REPORTS_FILE_PATH.exists():
                    try:
                        with open(REPORTS_FILE_PATH, "r", encoding="utf-8") as f:
                            existing = json.load(f)
                    except Exception:
                        existing = []
                existing.append(report)
                with open(REPORTS_FILE_PATH, "w", encoding="utf-8") as f:
                    json.dump(existing, f, indent=2, ensure_ascii=False)
            except Exception as e:
                print(f"[ReportRepository] JSON backup error: {e}")

        return report

    def get_all(self) -> List[Dict[str, Any]]:
        # Try database first
        try:
            conn = self.db_manager.get_connection()
            cur = conn.cursor()
            cur.execute("SELECT id, identifier, category, description, contact, location, status, created_at FROM reports ORDER BY created_at DESC")
            rows = cur.fetchall()
            conn.close()
            if rows:
                return [
                    {
                        "id": r[0],
                        "identifier": r[1],
                        "category": r[2],
                        "description": r[3],
                        "contact": r[4],
                        "location": r[5],
                        "status": r[6],
                        "created_at": str(r[7])
                    }
                    for r in rows
                ]
        except Exception:
            pass

        # Fallback to JSON
        if REPORTS_FILE_PATH.exists():
            try:
                with open(REPORTS_FILE_PATH, "r", encoding="utf-8") as f:
                    return json.load(f)
            except Exception:
                return []
        return []

    def log_verification(self, identifier: str, id_type: str, is_valid: bool, status: str) -> None:
        try:
            conn = self.db_manager.get_connection()
            cur = conn.cursor()
            cur.execute(
                """
                INSERT INTO verification_logs (identifier, id_type, is_valid, status)
                VALUES (?, ?, ?, ?)
                """ if not self.db_manager.is_postgres else """
                INSERT INTO verification_logs (identifier, id_type, is_valid, status)
                VALUES (%s, %s, %s, %s)
                """,
                (identifier, id_type, 1 if is_valid else 0, status)
            )
            conn.commit()
            conn.close()
        except Exception:
            pass


_standards_repo_instance: Optional[StandardsRepository] = None
_report_repo_instance: Optional[ReportRepository] = None


def get_standards_repository() -> StandardsRepository:
    global _standards_repo_instance
    if _standards_repo_instance is None:
        _standards_repo_instance = StandardsRepository()
    return _standards_repo_instance


def get_report_repository() -> ReportRepository:
    global _report_repo_instance
    if _report_repo_instance is None:
        _report_repo_instance = ReportRepository()
    return _report_repo_instance
