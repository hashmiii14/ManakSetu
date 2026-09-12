import json
from typing import Optional, List, Dict, Any
from pathlib import Path
from ..config import PROCESSED_DATA_PATH


class StandardsRepository:
    def __init__(self, data_path: Optional[Path] = None):
        self.data_path = data_path or PROCESSED_DATA_PATH
        self._standards: List[Dict[str, Any]] = []
        self._lookup: Dict[str, Dict[str, Any]] = {}
        self._load()

    def _normalize_key(self, code: str) -> str:
        return "".join(c.lower() for c in code if c.isalnum())

    def _load(self) -> None:
        if not self.data_path.exists():
            raise FileNotFoundError(f"Standards dataset not found at {self.data_path}")
        with open(self.data_path, "r", encoding="utf-8") as f:
            self._standards = json.load(f)

        for std in self._standards:
            key = self._normalize_key(std.get("standard", ""))
            if key:
                self._lookup[key] = std

    def get_all(self) -> List[Dict[str, Any]]:
        return self._standards

    def get_by_is_number(self, is_number: str) -> Optional[Dict[str, Any]]:
        norm = self._normalize_key(is_number)
        if norm in self._lookup:
            return self._lookup[norm]
        
        # Substring search
        for k, v in self._lookup.items():
            if norm in k or k in norm:
                return v
        return None

    def list_categories(self) -> List[str]:
        categories = set()
        for std in self._standards:
            cat = std.get("category")
            if cat:
                categories.add(cat)
        return sorted(list(categories))

    def filter_by_category(self, category: str) -> List[Dict[str, Any]]:
        if not category or category.upper() == "ALL":
            return self._standards
        cat_lower = category.lower()
        return [s for s in self._standards if cat_lower in s.get("category", "").lower()]


_repository_instance: Optional[StandardsRepository] = None


def get_standards_repository() -> StandardsRepository:
    global _repository_instance
    if _repository_instance is None:
        _repository_instance = StandardsRepository()
    return _repository_instance
