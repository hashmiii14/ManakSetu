"""
ManakBot AI Service
Retrieval-Augmented Generation (RAG) architecture:
User question -> Hybrid retrieval from BIS dataset -> Grounded context -> Gemini LLM (or Grounded Fallback) -> Answer + Referenced Standards
"""

import httpx
from typing import Dict, Any, List, Optional
from .retriever import get_retriever
from ..config import GEMINI_API_KEY, GEMINI_MODEL

BOT_DISCLAIMER = (
    "AI-assisted guidance based on available standards information. "
    "Always verify statutory specifications on the official BIS portal (manakonline.in)."
)


class ManakBotService:
    def __init__(self):
        self.retriever = get_retriever()
        self.api_key = GEMINI_API_KEY
        self.model = GEMINI_MODEL

    async def answer_question(self, query: str, history: Optional[List[Dict[str, str]]] = None) -> Dict[str, Any]:
        clean_query = (query or "").strip()
        if not clean_query:
            return {
                "answer": "Please ask a question regarding Indian Standards, BIS certification, or product compliance.",
                "referenced_standards": [],
                "source": "System",
                "confidence": "Low",
                "disclaimer": BOT_DISCLAIMER
            }

        # 1. Retrieve top relevant standards
        retrieved_items = self.retriever.retrieve(clean_query, top_k=3)
        top_std = retrieved_items[0] if retrieved_items else None

        referenced = [
            {
                "is_number": item["is_number"],
                "title": item["title"],
                "relevance_note": f"Match relevance: {int(item['relevance_score'] * 100)}%"
            }
            for item in retrieved_items
        ]

        # 2. If Gemini API key is configured, invoke Gemini with retrieved context
        if self.api_key and len(self.api_key.strip()) > 10:
            try:
                answer = await self._call_gemini(clean_query, retrieved_items)
                return {
                    "answer": answer,
                    "referenced_standards": referenced,
                    "source": "Gemini 1.5 Flash (Grounded on BIS Dataset)",
                    "confidence": "High",
                    "disclaimer": BOT_DISCLAIMER
                }
            except Exception as e:
                print(f"[ManakBot] LLM call failed ({e}), using grounded dataset fallback.")

        # 3. Clean fallback grounded directly in retrieved BIS data
        fallback_answer = self._generate_grounded_fallback(clean_query, retrieved_items)
        return {
            "answer": fallback_answer,
            "referenced_standards": referenced,
            "source": "BIS Standards Knowledge Engine (Deterministic Grounding)",
            "confidence": "Grounded in Retrieved BIS Specifications",
            "disclaimer": BOT_DISCLAIMER
        }

    async def _call_gemini(self, query: str, context_items: List[Dict[str, Any]]) -> str:
        context_str = "\n\n".join([
            f"- Standard: {item['is_number']}\n  Title: {item['title']}\n  Category: {item['category']}\n  Scope/Summary: {item['scope'] or item['description']}\n  Mandatory QCO: {'Yes' if item['mandatory_qco'] else 'No'}"
            for item in context_items
        ])

        system_instruction = (
            "You are ManaKSetu, a trustworthy, professional AI assistant for Indian Standards and BIS conformity assessment. "
            "Your answers must be grounded strictly in the provided BIS standards context. "
            "Never fabricate standard numbers or legal claims. "
            "If the context does not have enough information, politely state: "
            "'I couldn't find enough relevant information in the current standards dataset.'\n"
            "Format your response with clear sections:\n"
            "### Summary\n(Direct concise answer)\n\n"
            "### Applicable Indian Standard\n(Cite IS code, title, and mandatory QCO status)\n\n"
            "### Statutory & Testing Requirements\n(Key testing parameters, safety rules)\n\n"
            "### Next Steps on Manakonline\n(Clear actionable steps for the user)"
        )

        prompt = f"User Question: {query}\n\nRetrieved BIS Standards Context:\n{context_str}"

        url = f"https://generativelanguage.googleapis.com/v1beta/models/{self.model}:generateContent?key={self.api_key.strip()}"
        payload = {
            "contents": [
                {
                    "parts": [
                        {"text": f"{system_instruction}\n\n{prompt}"}
                    ]
                }
            ]
        }

        async with httpx.AsyncClient(timeout=20.0) as client:
            response = await client.post(url, json=payload)
            response.raise_for_status()
            data = response.json()
            return data["candidates"][0]["content"]["parts"][0]["text"]

    def _generate_grounded_fallback(self, query: str, context_items: List[Dict[str, Any]]) -> str:
        q_lower = query.lower()

        if "what is bis" in q_lower or "about bis" in q_lower:
            return (
                "### Summary\n"
                "The **Bureau of Indian Standards (BIS)** is the statutory National Standard Body of India under the **BIS Act, 2016**. "
                "It formulates Indian Standards, operates product certification schemes (like the ISI Mark and CRS), "
                "and enforces Quality Control Orders (QCOs) to protect consumer safety and ensure industrial quality.\n\n"
                "### Certification Framework\n"
                "- **Scheme-I (ISI Mark)**: Mandatory for products affecting public safety, health, and consumer wellbeing (e.g. geysers, packaged water, toys, cement, steel).\n"
                "- **Scheme-II (CRS)**: Self-declaration scheme for IT & electronic goods registered through NABL test reports.\n"
                "- **Hallmarking**: 6-digit HUID laser hallmarking for precious gold jewellery.\n\n"
                "### Next Steps on Manakonline\n"
                "Manufacturers can apply online at **www.manakonline.in** by submitting testing equipment lists, plant details, and requisite application fees."
            )

        if not context_items:
            return (
                "### Summary\n"
                "I couldn't find enough relevant information in the current standards dataset for your query.\n\n"
                "### Next Steps\n"
                "Please try searching with broader keywords like *cement*, *immersion geyser*, *toys*, *water*, *helmet*, or *pressure cooker*."
            )

        top = context_items[0]
        is_num = top["is_number"]
        title = top["title"]
        desc = top["description"] or top["scope"]
        is_mandatory = top["mandatory_qco"]

        qco_status = "**Mandatory Quality Control Order (QCO)**. Manufacturing or selling without an operative ISI mark is prohibited under the BIS Act, 2016." if is_mandatory else "Voluntary quality certification standard."

        other_stds = ", ".join([f"{item['is_number']}" for item in context_items[1:]]) if len(context_items) > 1 else "None"

        return (
            f"### Summary\n"
            f"For your query, the most relevant Indian Standard is **{is_num}** ({title.title()}). {desc}\n\n"
            f"### Applicable Indian Standard\n"
            f"- **IS Code**: {is_num}\n"
            f"- **Specification**: {title}\n"
            f"- **Statutory Status**: {qco_status}\n"
            f"- **Related Standards**: {other_stds}\n\n"
            f"### Compliance & Testing Requirements\n"
            f"- In-house testing facility equipped to perform routine quality and safety checks.\n"
            f"- Conformance of finished goods to dimensional, physical, and chemical limits prescribed under {is_num}.\n"
            f"- Verification of calibrated laboratory testing gear during factory audit by BIS inspecting officers.\n\n"
            f"### Next Steps on Manakonline\n"
            f"1. Register on the official portal: **www.manakonline.in**.\n"
            f"2. File application Form-I with factory layout and testing capability documentation.\n"
            f"3. Schedule factory audit and draw samples for independent laboratory testing."
        )


_chatbot_instance: Optional[ManakBotService] = None


def get_chatbot_service() -> ManakBotService:
    global _chatbot_instance
    if _chatbot_instance is None:
        _chatbot_instance = ManakBotService()
    return _chatbot_instance
