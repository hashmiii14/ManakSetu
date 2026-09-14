"""
National Testing Laboratory Network Service
- Search by standard, city/state, testing scope, or keywords
- Haversine proximity calculation from user coordinates
"""

from __future__ import annotations
import json
import math
from pathlib import Path
from typing import List, Dict, Any, Optional
from ..config import DATA_DIR

LABS_FILE = DATA_DIR / "laboratories.json"


def haversine_distance(lat1: float, lon1: float, lat2: float, lon2: float) -> int:
    r = 6371  # Earth radius in kilometers
    phi1 = math.radians(lat1)
    phi2 = math.radians(lat2)
    delta_phi = math.radians(lat2 - lat1)
    delta_lambda = math.radians(lon2 - lon1)

    a = (math.sin(delta_phi / 2) ** 2 +
         math.cos(phi1) * math.cos(phi2) * (math.sin(delta_lambda / 2) ** 2))
    c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))
    return int(round(r * c))


class LaboratoryService:
    def __init__(self, data_path: Optional[Path] = None):
        self.data_path = data_path or LABS_FILE
        self.laboratories: List[Dict[str, Any]] = []
        self._load()

    def _load(self):
        if self.data_path.exists():
            try:
                with open(self.data_path, "r", encoding="utf-8") as f:
                    self.laboratories = json.load(f)
            except Exception as e:
                print(f"[LaboratoryService] Error loading {self.data_path}: {e}")
                self.laboratories = []

    def get_all_labs(self) -> List[Dict[str, Any]]:
        return self.laboratories

    def get_states(self) -> List[str]:
        states = sorted(list({lab.get("state") for lab in self.laboratories if lab.get("state")}))
        return ["ALL"] + states

    def search(
        self,
        q: Optional[str] = None,
        state: Optional[str] = None,
        standard: Optional[str] = None,
        category: Optional[str] = None,
        user_lat: Optional[float] = None,
        user_lng: Optional[float] = None
    ) -> List[Dict[str, Any]]:
        results = []
        clean_q = (q or "").strip().lower()
        clean_state = (state or "ALL").strip()
        clean_std = (standard or "ALL").strip().lower()

        for lab in self.laboratories:
            # 1. State filter
            if clean_state != "ALL" and lab.get("state") != clean_state:
                continue

            # 2. Standard filter
            if clean_std != "all":
                std_match = any(
                    clean_std in s.lower() or s.lower() in clean_std
                    for s in lab.get("applicable_standards", [])
                )
                if not std_match:
                    continue

            # 3. Keyword / Query filter
            if clean_q:
                text_corpus = (
                    lab.get("name", "") + " " +
                    lab.get("city", "") + " " +
                    lab.get("state", "") + " " +
                    lab.get("testing_area", "") + " " +
                    " ".join(lab.get("scopes", [])) + " " +
                    " ".join(lab.get("applicable_standards", []))
                ).lower()
                if clean_q not in text_corpus:
                    continue

            # Compute proximity if coordinates available
            item = dict(lab)
            if user_lat is not None and user_lng is not None and lab.get("lat") and lab.get("lng"):
                item["distance_km"] = haversine_distance(user_lat, user_lng, lab["lat"], lab["lng"])
            else:
                item["distance_km"] = None

            results.append(item)

        # Sort by distance if location provided, else by name
        if user_lat is not None and user_lng is not None:
            results.sort(key=lambda x: (x["distance_km"] if x["distance_km"] is not None else 999999))
        else:
            results.sort(key=lambda x: x.get("name", ""))

        return results


_lab_service = None

def get_lab_service() -> LaboratoryService:
    global _lab_service
    if _lab_service is None:
        _lab_service = LaboratoryService()
    return _lab_service
