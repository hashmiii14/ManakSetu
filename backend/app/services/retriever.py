"""
Hybrid BIS Standards Retriever
Adapted from BIS-Standard-RE reference architecture:
- BM25 lexical ranking with document frequency IDF and term saturation
- Domain query expansion dictionary
- Title, category, and appliance/material boosting
- Explicit IS-number pattern matching
- Semantic embedding cosine similarity (hybrid fusion when vectors present)
"""

from __future__ import annotations
import json
import math
import re
from collections import Counter
from functools import lru_cache
from pathlib import Path
from typing import Optional, List, Dict, Any, Set
import numpy as np

from ..config import PROCESSED_DATA_PATH, EMBEDDINGS_CACHE_PATH

# ── Constants ───────────────────────────────────────────────────────────────────

EMBEDDING_MODEL = "sentence-transformers/all-MiniLM-L6-v2"

BM25_WEIGHT = 0.40
SEMANTIC_WEIGHT = 0.60

BM25_K1 = 1.4
BM25_B = 0.70

TITLE_BOOST = 3.5
CATEGORY_BOOST = 2.0
MATERIAL_BOOST = 5.0
MATERIAL_PENALTY = -1.0
EXPLICIT_BOOST = 100.0

STOPWORDS = {
    "a", "an", "and", "are", "as", "at", "be", "both", "by", "for",
    "from", "i", "in", "is", "it", "of", "or", "our", "the", "their",
    "to", "used", "using", "we", "what", "which", "with", "show", "me",
    "give", "find", "check", "need", "standard", "code", "specification"
}

QUERY_EXPANSIONS: Dict[str, str] = {
    # Electrical appliances
    "immersion": "electric immersion water heaters geyser heating element is 368",
    "geyser": "stationary storage water heaters electric immersion water heaters is 2082 is 368",
    "water heater": "stationary storage water heaters electric immersion is 2082 is 368",
    "heater": "electric immersion water heater geyser stationary storage is 368 is 2082",
    "plug": "plugs and socket outlets 250v 16a electrical wiring is 1293",
    "socket": "plugs and socket outlets 250v 16a electrical appliances is 1293",
    "electrical appliance": "safety household electrical appliances immersion water heater plugs is 302 is 368 is 2082",
    
    # Toys and children's goods
    "toy": "safety of toys mechanical physical properties baby doll plastic plush is 9873",
    "toys": "safety of toys mechanical physical properties baby doll plastic plush is 9873",
    "baby doll": "safety of toys mechanical physical properties toys plush is 9873",
    "doll": "safety of toys baby doll mechanical physical properties is 9873",

    # Safety and automotive
    "helmet": "protective helmets riders two wheeled motor vehicles motorcycle headform is 4151",
    "helmets": "protective helmets riders two wheeled motor vehicles motorcycle headform is 4151",
    "motorcycle helmet": "protective helmets two wheeled motor vehicles is 4151",

    # Cookware & kitchen
    "pressure cooker": "domestic pressure cookers aluminium stainless steel burst safety valve is 2347",
    "cooker": "domestic pressure cookers safety valve hydrostatic test is 2347",

    # Water & beverages
    "packaged water": "packaged drinking water microbiological chemical heavy metals is 14543",
    "drinking water": "packaged drinking water bottle jar microbiological is 14543",
    "water bottle": "packaged drinking water sealed container is 14543",

    # Construction & Building materials (from BIS-Standard-RE)
    "cement": "portland cement opc 33 43 53 grade pozzolana slag is 269 is 455 is 1489 is 12269",
    "opc": "ordinary portland cement 33 43 53 grade compressive strength is 269 is 12269",
    "33 grade": "ordinary portland cement 33 grade opc chemical physical is 269",
    "43 grade": "ordinary portland cement 43 grade opc",
    "53 grade": "ordinary portland cement 53 grade opc compressive strength is 12269",
    "pozzolana": "portland pozzolana cement fly ash calcined clay is 1489",
    "aggregate": "coarse fine aggregate natural sources concrete is 383",
    "steel": "high strength deformed steel bars wires concrete reinforcement structural steel is 1786 is 2062",
    "rebar": "steel bars wires concrete reinforcement structural is 1786",
    "reinforcement": "steel bar rebar concrete reinforcement high strength deformed is 1786",
    "pipe": "precast concrete pipes pvc plastic tube asbestos cement",
    "brick": "burnt clay building bricks masonry units",
    "building material": "cement concrete aggregate brick steel tiles timber",
}

DOMAIN_TERMS = {
    "geyser", "heater", "immersion", "plug", "socket", "appliance", "electrical",
    "toy", "toys", "doll", "helmet", "cooker", "water", "drinking", "bottle",
    "cement", "concrete", "steel", "rebar", "aggregate", "brick", "mortar",
    "pipe", "sand", "lime", "gypsum", "timber", "glass", "tile", "wire"
}


def tokenize(text: str) -> List[str]:
    return [
        t for t in re.findall(r"[a-z]+|\d+(?:\.\d+)?", (text or "").lower())
        if t not in STOPWORDS
    ]


def normalize_standard(standard: str) -> str:
    s = re.sub(r"\s+", " ", str(standard).strip()).upper()
    s = re.sub(r"\(\s*PART\s*(\d+)\s*\)", r"(Part \1)", s, flags=re.I)
    s = re.sub(r"\s*:\s*", ": ", s)
    s = re.sub(r"^IS\s*", "IS ", s)
    return s


class BISRetriever:
    """
    Hybrid Retriever combining BM25 lexical ranking with boosting and optional
    semantic embedding cosine similarity.
    """

    def __init__(
        self,
        data_path: Optional[Path] = None,
        cache_path: Optional[Path] = None
    ):
        self.data_path = data_path or PROCESSED_DATA_PATH
        self.cache_path = cache_path or EMBEDDINGS_CACHE_PATH

        if not self.data_path.exists():
            raise FileNotFoundError(f"Processed dataset missing at: {self.data_path}")

        with open(self.data_path, "r", encoding="utf-8") as f:
            self.documents: List[Dict[str, Any]] = json.load(f)

        self._prepare_bm25()
        self._load_embeddings()

    def _prepare_bm25(self) -> None:
        self.doc_tokens: List[List[str]] = []
        self.doc_term_counts: List[Counter] = []
        document_frequency: Counter = Counter()

        for doc in self.documents:
            standard = normalize_standard(doc.get("standard", ""))
            title = doc.get("title", "")
            category = doc.get("category", "")
            description = doc.get("description", "")
            scope = doc.get("scope", "")
            text = doc.get("text", "")

            doc["standard"] = standard
            doc["title"] = title

            # Weighted field representation
            weighted_text = " ".join([
                (standard + " ") * 10,
                (title + " ") * 14,
                (category + " ") * 6,
                (description + " ") * 4,
                (scope + " ") * 4,
                text[:1000]
            ])
            tokens = tokenize(weighted_text)
            counts = Counter(tokens)
            self.doc_tokens.append(tokens)
            self.doc_term_counts.append(counts)
            document_frequency.update(set(tokens))

        self.num_docs = len(self.documents)
        self.avg_doc_len = (
            sum(len(t) for t in self.doc_tokens) / max(self.num_docs, 1)
        )
        self.idf = {
            term: math.log(1 + (self.num_docs - freq + 0.5) / (freq + 0.5))
            for term, freq in document_frequency.items()
        }

    def _load_embeddings(self) -> None:
        self.embeddings = None
        self.embed_model = None

        if not self.cache_path.exists():
            return

        try:
            raw = np.load(str(self.cache_path))
            # If length matches current document count, load
            if raw.shape[0] == len(self.documents):
                self.embeddings = raw
            elif raw.shape[0] < len(self.documents):
                # We expanded the dataset with canonical standards; pad or build
                diff = len(self.documents) - raw.shape[0]
                pad = np.zeros((diff, raw.shape[1]), dtype=raw.dtype)
                self.embeddings = np.vstack([raw, pad])
        except Exception as exc:
            print(f"[BISRetriever] Could not load embedding cache: {exc}")
            self.embeddings = None

    def _expanded_query(self, query: str) -> str:
        lowered = query.lower()
        additions = [v for k, v in QUERY_EXPANSIONS.items() if k in lowered]
        return " ".join([query, *additions])

    def _explicit_standard_matches(self, query: str) -> Set[int]:
        matches = re.findall(
            r"\bIS\s*[:\-]?\s*(\d{2,5})(?:\s*\(?\s*Part\s*(\d+)\s*\)?)?"
            r"\s*[:\-]?\s*(\d{4})?",
            query, flags=re.I,
        )
        explicit: Set[int] = set()
        for number, part, year in matches:
            wanted = f"is{number}"
            if part:
                wanted += f"(part{part})"
            for i, doc in enumerate(self.documents):
                key = doc["standard"].lower().replace(" ", "")
                if wanted in key and (not year or year in key):
                    explicit.add(i)
        return explicit

    def _bm25_score(self, query_counts: Counter, doc_index: int) -> float:
        counts = self.doc_term_counts[doc_index]
        doc_len = len(self.doc_tokens[doc_index])
        score = 0.0
        for token, qcount in query_counts.items():
            freq = counts.get(token, 0)
            if not freq:
                continue
            denom = freq + BM25_K1 * (1 - BM25_B + BM25_B * doc_len / self.avg_doc_len)
            score += (
                self.idf.get(token, 0.0)
                * freq * (BM25_K1 + 1) / denom
                * (1 + 0.10 * (qcount - 1))
            )
        return score

    def retrieve(self, query: str, top_k: int = 5) -> List[Dict[str, Any]]:
        expanded = self._expanded_query(query)
        query_tokens = tokenize(expanded)
        query_counts = Counter(query_tokens)
        explicit_matches = self._explicit_standard_matches(query)

        # ── BM25 Phase ──────────────────────────────────────────────────────────
        bm25_scores: List[float] = []
        for i, doc in enumerate(self.documents):
            score = self._bm25_score(query_counts, i)
            title_tokens = set(tokenize(f"{doc['standard']} {doc.get('title', '')}"))
            category_tokens = set(tokenize(doc.get('category', '')))

            # Title token match bonus
            score += TITLE_BOOST * sum(
                1 for t in set(query_tokens) if len(t) > 2 and t in title_tokens
            )
            # Category match bonus
            score += CATEGORY_BOOST * sum(
                1 for t in set(query_tokens) if len(t) > 2 and t in category_tokens
            )

            # Domain term boosting
            for token in DOMAIN_TERMS.intersection(query_tokens):
                if token in title_tokens or token in category_tokens:
                    score += MATERIAL_BOOST
                else:
                    score += MATERIAL_PENALTY

            if i in explicit_matches:
                score += EXPLICIT_BOOST

            bm25_scores.append(max(0.0, score))

        # ── Semantic Embedding Phase (if active) ────────────────────────────────
        if self.embeddings is not None and self.embed_model is not None:
            try:
                q_vec = self.embed_model.encode([expanded], normalize_embeddings=True)[0]
                sem_scores = (self.embeddings @ q_vec).tolist()

                def _norm(scores: List[float]) -> List[float]:
                    lo, hi = min(scores), max(scores)
                    span = hi - lo or 1.0
                    return [(s - lo) / span for s in scores]

                bm25_n = _norm(bm25_scores)
                sem_n = _norm(sem_scores)

                combined = [
                    BM25_WEIGHT * b + SEMANTIC_WEIGHT * s
                    for b, s in zip(bm25_n, sem_n)
                ]
                for i in explicit_matches:
                    combined[i] += EXPLICIT_BOOST

                scored = sorted(enumerate(combined), key=lambda x: x[1], reverse=True)
            except Exception as e:
                print(f"[retriever] Semantic search fallback: {e}")
                scored = sorted(enumerate(bm25_scores), key=lambda x: x[1], reverse=True)
        else:
            scored = sorted(enumerate(bm25_scores), key=lambda x: x[1], reverse=True)

        results = []
        max_score = scored[0][1] if scored and scored[0][1] > 0 else 1.0

        for i, raw_score in scored[:top_k]:
            doc = self.documents[i]
            # Normalize display score between 0.60 and 0.99 for good matches
            norm_score = round(min(0.99, max(0.50, raw_score / max_score if max_score > 0 else 0.7)), 2)
            results.append({
                "is_number": doc.get("standard", ""),
                "title": doc.get("title", ""),
                "category": doc.get("category", "General"),
                "description": doc.get("description", ""),
                "scope": doc.get("scope", ""),
                "relevance_score": norm_score,
                "mandatory_qco": doc.get("mandatory_qco", False),
                "source": doc.get("source", "BIS Catalogue")
            })

        return results


_retriever_instance: Optional[BISRetriever] = None


def get_retriever() -> BISRetriever:
    global _retriever_instance
    if _retriever_instance is None:
        _retriever_instance = BISRetriever()
    return _retriever_instance
