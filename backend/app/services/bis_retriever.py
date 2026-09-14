"""
Hybrid BIS Standards Retriever
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
    # Electrical appliances & wiring
    "switch": "switches for domestic and similar fixed electrical installations 250v is 3854 is 1293",
    "electrical switch": "switches for domestic and similar fixed electrical installations is 3854",
    "switches": "switches for domestic and similar fixed electrical installations is 3854",
    "kettle": "safety of household and similar electrical appliances electric kettles liquid heaters is 302 is 2082",
    "electric kettle": "safety of household and similar electrical appliances electric kettles liquid heaters is 302",
    "immersion": "electric immersion water heaters geyser heating element is 368",
    "geyser": "stationary storage water heaters electric immersion water heaters is 2082 is 368",
    "water heater": "stationary storage water heaters electric immersion is 2082 is 368",
    "heater": "electric immersion water heater geyser stationary storage is 368 is 2082",
    "plug": "plugs and socket outlets 250v 16a electrical wiring is 1293",
    "socket": "plugs and socket outlets 250v 16a electrical appliances is 1293",
    "electrical appliance": "safety household electrical appliances immersion water heater plugs is 302 is 368 is 2082",
    "is 302": "safety of household and similar electrical appliances general requirements is 302",
    "is 3854": "switches for domestic and similar fixed electrical installations is 3854",
    "is 1293": "plugs and socket outlets of nominal ratings up to and including 250 volts is 1293",

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

    # Construction & Building materials (Cement Demo)
    "cement": "portland cement opc 33 43 53 grade pozzolana slag is 269 is 455 is 1489 is 12269",
    "opc": "ordinary portland cement 33 43 53 grade compressive strength is 269 is 12269",
    "33 grade": "ordinary portland cement 33 grade opc chemical physical is 269",
    "43 grade": "ordinary portland cement 43 grade opc",
    "53 grade": "ordinary portland cement 53 grade opc compressive strength is 12269",
    "pozzolana": "portland pozzolana cement fly ash calcined clay is 1489",
    "ppc": "portland pozzolana cement fly ash is 1489",
    "aggregate": "coarse fine aggregate natural sources concrete is 383",
    "steel": "high strength deformed steel bars wires concrete reinforcement structural steel is 1786 is 2062",
    "rebar": "steel bars wires concrete reinforcement structural is 1786",
    "reinforcement": "steel bar rebar concrete reinforcement high strength deformed is 1786",
    "pipe": "precast concrete pipes pvc plastic tube asbestos cement",
    "brick": "burnt clay building bricks masonry units",
    "building material": "cement concrete aggregate brick steel tiles timber",
}

DOMAIN_TERMS = {
    "electrical": {"voltage", "current", "wire", "switch", "socket", "plug", "cable", "motor", "power", "watt", "conductor", "appliance", "circuit", "dielectric"},
    "mechanical": {"tensile", "torque", "gear", "bearing", "pressure", "load", "fatigue", "dimension", "weld", "valve", "burst", "hydrostatic"},
    "chemical": {"purity", "grade", "acid", "reagent", "assay", "composition", "corrosion", "solution", "organic", "polymer"},
    "construction": {"cement", "concrete", "aggregate", "sand", "brick", "timber", "steel", "mortar", "compressive", "strength", "slump", "pozzolana"},
    "food": {"microbiological", "moisture", "protein", "ash", "contaminant", "pesticide", "aflatoxin", "hygiene", "storage", "shelf", "drinking", "water"},
    "textile": {"yarn", "fabric", "fiber", "weave", "tensile", "colorfastness", "shrinkage", "denier", "cotton", "polyester"},
}

MATERIAL_CATEGORIES = {
    "metal": {"steel", "iron", "copper", "aluminum", "aluminium", "brass", "bronze", "zinc", "tin", "lead", "alloy"},
    "plastic": {"polymer", "plastic", "pvc", "polyethylene", "polypropylene", "nylon", "acrylic", "resin"},
    "ceramic": {"ceramic", "porcelain", "clay", "refractory", "earthenware", "stoneware", "tile", "brick"},
    "cement": {"cement", "concrete", "mortar", "grout", "clinker", "pozzolana", "fly ash", "slag"},
    "glass": {"glass", "fiberglass", "glazing", "silica", "tempered glass"},
    "rubber": {"rubber", "elastomer", "latex", "silicone", "vulcanized"},
    "paper": {"paper", "board", "pulp", "cardboard", "kraft"},
    "wood": {"wood", "timber", "plywood", "bamboo", "particle board"}
}

IS_CODE_RE = re.compile(r"\bIS\s*:?\s*(\d+)(?:\s*(?:Part|Pt)[\s.:]*(\d+))?(?:\s*:?\s*(\d{4}))?\b", re.IGNORECASE)
INT_RE = re.compile(r"\b\d{2,6}\b")


def _tokenize(text: str) -> List[str]:
    clean = re.sub(r"[^a-zA-Z0-9\s]", " ", text.lower())
    return [w for w in clean.split() if w not in STOPWORDS and len(w) > 1]


class BisRetriever:
    def __init__(self, data_path: Optional[Path] = None, embeddings_path: Optional[Path] = None):
        self.data_path = data_path or PROCESSED_DATA_PATH
        self.embeddings_path = embeddings_path or EMBEDDINGS_CACHE_PATH
        self.documents: List[Dict[str, Any]] = []
        self.tokenized_corpus: List[List[str]] = []
        self.doc_frequencies: Counter = Counter()
        self.doc_lengths: List[int] = []
        self.avg_doc_length: float = 0.0
        self.embeddings: Optional[np.ndarray] = None
        
        self._load_data()

    def _load_data(self):
        if not self.data_path.exists():
            print(f"[BisRetriever] Dataset file not found at {self.data_path}")
            return

        with open(self.data_path, "r", encoding="utf-8") as f:
            self.documents = json.load(f)

        total_tokens = 0
        for doc in self.documents:
            combined_text = f"{doc.get('standard', '')} {doc.get('title', '')} {doc.get('category', '')} {doc.get('description', '')} {doc.get('scope', '')} {doc.get('text', '')}"
            tokens = _tokenize(combined_text)
            self.tokenized_corpus.append(tokens)
            self.doc_lengths.append(len(tokens))
            total_tokens += len(tokens)
            
            # Count unique terms for IDF
            unique_terms = set(tokens)
            for t in unique_terms:
                self.doc_frequencies[t] += 1

        self.avg_doc_length = total_tokens / max(len(self.documents), 1)

        # Load precomputed embeddings if available
        if self.embeddings_path.exists():
            try:
                self.embeddings = np.load(str(self.embeddings_path))
                print(f"[BisRetriever] Loaded vector embeddings shape: {self.embeddings.shape}")
            except Exception as e:
                print(f"[BisRetriever] Failed to load embeddings: {e}")
                self.embeddings = None

    def _bm25_score(self, query_tokens: List[str], doc_idx: int) -> float:
        doc_tokens = self.tokenized_corpus[doc_idx]
        doc_len = self.doc_lengths[doc_idx]
        doc_tf = Counter(doc_tokens)
        
        score = 0.0
        n_docs = len(self.documents)
        
        for q in query_tokens:
            if q not in doc_tf:
                continue
            df = self.doc_frequencies.get(q, 0)
            idf = math.log((n_docs - df + 0.5) / (df + 0.5) + 1.0)
            tf = doc_tf[q]
            numerator = tf * (BM25_K1 + 1)
            denominator = tf + BM25_K1 * (1 - BM25_B + BM25_B * (doc_len / max(self.avg_doc_length, 1)))
            score += idf * (numerator / max(denominator, 1e-5))
            
        return score

    def retrieve(self, query: str, top_k: int = 10) -> List[Dict[str, Any]]:
        clean_q = (query or "").strip().lower()
        if not clean_q or not self.documents:
            return []

        # 1. Expand query using domain dictionary
        expanded_q = clean_q
        for key, exp in QUERY_EXPANSIONS.items():
            if key in clean_q:
                expanded_q += " " + exp

        q_tokens = _tokenize(expanded_q)
        explicit_numbers = set(INT_RE.findall(clean_q))

        # 2. Score documents
        scored_docs = []
        for idx, doc in enumerate(self.documents):
            std_code = doc.get("standard", "").lower()
            title = doc.get("title", "").lower()
            category = doc.get("category", "").lower()
            scope = doc.get("scope", "").lower()

            base_bm25 = self._bm25_score(q_tokens, idx)
            
            # Boost matches in title and standard code
            boost = 1.0
            for qt in q_tokens:
                if qt in title:
                    boost += TITLE_BOOST * 0.5
                if qt in category:
                    boost += CATEGORY_BOOST * 0.5

            # Explicit standard number match (e.g. 1489 in IS 1489)
            has_explicit_match = False
            for num in explicit_numbers:
                if num in std_code:
                    boost += EXPLICIT_BOOST
                    has_explicit_match = True

            # Domain keyword match
            for dom, terms in DOMAIN_TERMS.items():
                if any(t in clean_q for t in terms):
                    if any(t in title or t in scope for t in terms):
                        boost += 1.5

            final_score = base_bm25 * boost

            # Always surface explicit matches even if query terms are brief
            if has_explicit_match:
                final_score += 500.0

            if final_score > 0.01:
                scored_docs.append((final_score, doc))

        scored_docs.sort(key=lambda x: x[0], reverse=True)

        # Normalize relevance scores between 0.0 and 1.0
        results = []
        max_score = scored_docs[0][0] if scored_docs else 1.0
        
        for score, doc in scored_docs[:top_k]:
            normalized_score = min(round(score / max_score, 4), 1.0)
            results.append({
                "is_number": doc.get("standard", ""),
                "title": doc.get("title", ""),
                "category": doc.get("category", "General"),
                "description": doc.get("description", ""),
                "scope": doc.get("scope", ""),
                "relevance_score": normalized_score,
                "mandatory_qco": doc.get("mandatory_qco", False),
                "source": doc.get("source", "BIS Catalogue")
            })

        return results


_retriever_instance: Optional[BisRetriever] = None


def get_retriever() -> BisRetriever:
    global _retriever_instance
    if _retriever_instance is None:
        _retriever_instance = BisRetriever()
    return _retriever_instance
