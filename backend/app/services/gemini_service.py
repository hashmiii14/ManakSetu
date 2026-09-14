"""
ManakBot AI Service
Grounded Retrieval-Augmented Generation (RAG) using Google Gemini 1.5 Flash
with deterministic BIS dataset fallback.
"""

import httpx
from typing import Dict, Any, List, Optional
from .bis_retriever import get_retriever
from ..config import GEMINI_API_KEY, GEMINI_MODEL

BOT_DISCLAIMER = (
    "AI-assisted informational guidance based on Indian Standards dataset. "
    "Verify statutory specifications and active Quality Control Orders on the official BIS portal (manakonline.in)."
)


class ManakBotService:
    def __init__(self):
        self.retriever = get_retriever()
        self.gemini_key = GEMINI_API_KEY
        self.gemini_model = GEMINI_MODEL

    async def answer_question(self, query: str, history: Optional[List[Dict[str, str]]] = None) -> Dict[str, Any]:
        clean_query = (query or "").strip()
        if not clean_query:
            return {
                "answer": "Please enter an inquiry regarding Indian Standards, BIS product certification, or quality compliance.",
                "referenced_standards": [],
                "source": "System",
                "confidence": "Low",
                "disclaimer": BOT_DISCLAIMER
            }

        # 1. Retrieve top relevant standards
        retrieved_items = self.retriever.retrieve(clean_query, top_k=3)

        referenced = [
            {
                "is_number": item["is_number"],
                "title": item["title"],
                "relevance_note": f"Relevance: {int(item['relevance_score'] * 100)}%"
            }
            for item in retrieved_items
        ]

        # 2. Try Gemini API first if configured
        if self.gemini_key and len(self.gemini_key.strip()) > 10:
            try:
                answer = await self._call_gemini(clean_query, retrieved_items, history)
                return {
                    "answer": answer,
                    "referenced_standards": referenced,
                    "source": f"Google Gemini ({self.gemini_model}) Grounded RAG",
                    "confidence": "High",
                    "disclaimer": BOT_DISCLAIMER
                }
            except Exception as e:
                print(f"[ManakBot] Gemini API notice ({e}). Using grounded BIS compendium fallback.")

        # 3. Deterministic grounded response directly from BIS knowledge engine
        fallback_answer = self._generate_grounded_fallback(clean_query, retrieved_items)
        return {
            "answer": fallback_answer,
            "referenced_standards": referenced,
            "source": "BIS Standards Knowledge Engine (Deterministic Grounding)",
            "confidence": "Grounded in Retrieved BIS Specifications",
            "disclaimer": BOT_DISCLAIMER
        }

    async def _call_gemini(self, query: str, context_items: List[Dict[str, Any]], history: Optional[List[Dict[str, str]]]) -> str:
        context_str = "\n\n".join([
            f"- Standard: {item['is_number']}\n  Title: {item['title']}\n  Category: {item['category']}\n  Scope: {item['scope'] or item['description']}\n  Mandatory QCO: {'Yes' if item['mandatory_qco'] else 'No'}"
            for item in context_items
        ])

        system_instruction = (
            "You are ManaKBot, an official and authoritative AI assistant for Indian Standards and the Bureau of Indian Standards (BIS).\n"
            "Your answers must be grounded strictly in the provided BIS standards context.\n"
            "Do NOT use emojis anywhere in your response.\n"
            "Never fabricate Indian Standard (IS) numbers, certification figures, or legal guarantees.\n"
            "Format your answer using the following 5 distinct Markdown sections:\n\n"
            "### Likely Relevant Standard\n"
            "(Identify the primary IS code, standard title, and whether it is under a Mandatory Quality Control Order (QCO) or voluntary)\n\n"
            "### What It Means\n"
            "(Explain the technical scope and requirements in clear, professional language)\n\n"
            "### Why It Matters\n"
            "(Explain the safety rationale, consumer protection impact, and statutory obligation under Section 29 of the BIS Act, 2016)\n\n"
            "### What To Do Next\n"
            "(Actionable compliance roadmap: factory in-house testing setup, documentation required, and filing on www.manakonline.in)\n\n"
            "### Source & Verification\n"
            "(Official BIS source citation and explicit instruction to verify on manakonline.in)"
        )

        prompt = f"User Question: {query}\n\nRetrieved BIS Standards Context:\n{context_str}"

        url = f"https://generativelanguage.googleapis.com/v1beta/models/{self.gemini_model}:generateContent?key={self.gemini_key.strip()}"
        payload = {
            "contents": [
                {
                    "parts": [
                        {"text": f"{system_instruction}\n\n{prompt}"}
                    ]
                }
            ]
        }

        async with httpx.AsyncClient(timeout=15.0) as client:
            response = await client.post(url, json=payload)
            response.raise_for_status()
            data = response.json()
            return data["candidates"][0]["content"]["parts"][0]["text"]

    def _generate_grounded_fallback(self, query: str, context_items: List[Dict[str, Any]]) -> str:
        if not context_items:
            return (
                "### Search Scope\n"
                f"No exact statutory standard could be matched for the query: '{query}'.\n\n"
                "### Recommended Action\n"
                "Please search the full standards directory by entering standard numbers (e.g., IS 1489, IS 2082, IS 3854) or exact product classifications."
            )

        top = context_items[0]
        mandatory_str = "Statutory Mandatory Quality Control Order (QCO) in Force" if top["mandatory_qco"] else "Voluntary Conformity Assessment (Scheme-I)"

        related_text = ""
        if len(context_items) > 1:
            related_text = "\n".join([f"- **{it['is_number']}**: {it['title']}" for it in context_items[1:]])
            related_text = f"\n\n**Related Harmonized Standards:**\n{related_text}"

        return (
            f"### Likely Relevant Standard\n"
            f"**{top['is_number']}** — {top['title']}\n"
            f"- **Technical Division:** {top['category']}\n"
            f"- **Statutory Status:** {mandatory_str}\n\n"
            f"### What It Means\n"
            f"{top['scope'] or top['description']}\n\n"
            f"### Why It Matters\n"
            f"Conformity assessment under {top['is_number']} ensures product safety, consumer protection, and strict adherence to the BIS Act, 2016. "
            f"For goods covered by mandatory QCOs, manufacturing, stocking, or selling without the standard ISI mark is a cognizable statutory violation under Section 29.\n\n"
            f"### What To Do Next\n"
            f"1. Review laboratory testing benchmarks and factory testing equipment requirements.\n"
            f"2. Micro and Small enterprises qualify for 50% / 20% statutory marking fee concessions.\n"
            f"3. Submit formal application and factory audit dossier on the official portal (www.manakonline.in).\n"
            f"{related_text}\n\n"
            f"### Source & Verification\n"
            f"Information retrieved from the indexed Bureau of Indian Standards compendium. "
            f"Please verify exact Gazette notifications and current amendment sheets at **manakonline.in**."
        )


_chatbot_service_instance: Optional[ManakBotService] = None


def get_chatbot_service() -> ManakBotService:
    global _chatbot_service_instance
    if _chatbot_service_instance is None:
        _chatbot_service_instance = ManakBotService()
    return _chatbot_service_instance
