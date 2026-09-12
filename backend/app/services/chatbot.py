"""
ManakBot AI Service
Retrieval-Augmented Generation (RAG) architecture:
User question -> Hybrid retrieval from BIS dataset -> Grounded context -> Gemini LLM (or Grounded Fallback) -> Answer + Referenced Standards
"""

import httpx
from typing import Dict, Any, List, Optional
from .retriever import get_retriever
from ..config import GEMINI_API_KEY, GEMINI_MODEL, OPENAI_API_KEY, OPENAI_MODEL

BOT_DISCLAIMER = (
    "AI-assisted informational guidance based on Indian Standards dataset. "
    "Verify statutory specifications and active Quality Control Orders on the official BIS portal (manakonline.in)."
)


class ManakBotService:
    def __init__(self):
        self.retriever = get_retriever()
        self.gemini_key = GEMINI_API_KEY
        self.gemini_model = GEMINI_MODEL
        self.openai_key = OPENAI_API_KEY
        self.openai_model = OPENAI_MODEL

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

        # 1. Retrieve top relevant standards from 572 indexed standards
        retrieved_items = self.retriever.retrieve(clean_query, top_k=3)

        referenced = [
            {
                "is_number": item["is_number"],
                "title": item["title"],
                "relevance_note": f"Match relevance: {int(item['relevance_score'] * 100)}%"
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
                    "source": "Gemini 1.5 Flash (Grounded on BIS Dataset)",
                    "confidence": "High",
                    "disclaimer": BOT_DISCLAIMER
                }
            except Exception as e:
                print(f"[ManakBot] Gemini API call failed ({e}), attempting fallback.")

        # 3. Try OpenAI API if configured
        if self.openai_key and len(self.openai_key.strip()) > 10:
            try:
                answer = await self._call_openai(clean_query, retrieved_items, history)
                return {
                    "answer": answer,
                    "referenced_standards": referenced,
                    "source": "OpenAI GPT-4o-mini (Grounded on BIS Dataset)",
                    "confidence": "High",
                    "disclaimer": BOT_DISCLAIMER
                }
            except Exception as e:
                print(f"[ManakBot] OpenAI API call failed ({e}), using grounded dataset fallback.")

        # 4. Deterministic grounded response directly from BIS knowledge engine
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
            f"- Standard: {item['is_number']}\n  Title: {item['title']}\n  Category: {item['category']}\n  Scope/Summary: {item['scope'] or item['description']}\n  Mandatory QCO: {'Yes' if item['mandatory_qco'] else 'No'}"
            for item in context_items
        ])

        system_instruction = (
            "You are ManaKBot, a trustworthy, professional AI assistant for Indian Standards and BIS (Bureau of Indian Standards) conformity assessment.\n"
            "Your answers must be grounded strictly in the provided BIS standards context.\n"
            "Never fabricate Indian Standard (IS) numbers or legal guarantees. Distinguish clearly between confirmed standards and items needing official verification.\n"
            "Format your answer using the following 5 distinct Markdown sections:\n\n"
            "### Likely Relevant Standard\n"
            "(Identify the primary IS code, standard title, and whether it has a Mandatory Quality Control Order (QCO) or is voluntary)\n\n"
            "### What It Means\n"
            "(Explain the technical scope and requirements in clear, simple language)\n\n"
            "### Why It Matters\n"
            "(Explain the safety rationale, consumer protection impact, and statutory obligation under Section 29 of the BIS Act, 2016)\n\n"
            "### What To Do Next\n"
            "(Actionable compliance checklist: factory test setup, documentation required, and filing on www.manakonline.in)\n\n"
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

    async def _call_openai(self, query: str, context_items: List[Dict[str, Any]], history: Optional[List[Dict[str, str]]]) -> str:
        context_str = "\n\n".join([
            f"- Standard: {item['is_number']}\n  Title: {item['title']}\n  Category: {item['category']}\n  Scope/Summary: {item['scope'] or item['description']}\n  Mandatory QCO: {'Yes' if item['mandatory_qco'] else 'No'}"
            for item in context_items
        ])

        system_msg = (
            "You are ManaKBot, a trustworthy, professional AI assistant for Indian Standards and BIS (Bureau of Indian Standards) conformity assessment. "
            "Grounded strictly in the provided BIS standards context. Never invent IS numbers. "
            "Format your answer with 5 clear sections:\n"
            "### Likely Relevant Standard\n"
            "### What It Means\n"
            "### Why It Matters\n"
            "### What To Do Next\n"
            "### Source & Verification"
        )

        messages = [{"role": "system", "content": system_msg}]
        if history:
            for h in history[-4:]:
                messages.append({"role": h.get("role", "user"), "content": h.get("content", "")})
        messages.append({"role": "user", "content": f"Context:\n{context_str}\n\nUser Question: {query}"})

        url = "https://api.openai.com/v1/chat/completions"
        headers = {"Authorization": f"Bearer {self.openai_key.strip()}", "Content-Type": "application/json"}
        payload = {"model": self.openai_model, "messages": messages, "temperature": 0.2}

        async with httpx.AsyncClient(timeout=15.0) as client:
            res = await client.post(url, headers=headers, json=payload)
            res.raise_for_status()
            data = res.json()
            return data["choices"][0]["message"]["content"]

    def _generate_grounded_fallback(self, query: str, context_items: List[Dict[str, Any]]) -> str:
        q_lower = query.lower()

        if "what is bis" in q_lower or "about bis" in q_lower:
            return (
                "### Likely Relevant Standard\n"
                "**The BIS Act, 2016** (Statutory Framework for National Standards & Conformity Assessment).\n\n"
                "### What It Means\n"
                "The **Bureau of Indian Standards (BIS)** is the National Standard Body of India. "
                "It formulates Indian Standards across 14 technical divisions and manages third-party conformity assessment systems including the ISI Mark (Scheme-I) and Compulsory Registration Scheme (Scheme-II CRS).\n\n"
                "### Why It Matters\n"
                "Under statutory Quality Control Orders (QCOs) issued by Central Line Ministries, manufacturing, importing, storing, or distributing notified products without an operative BIS license is a punishable offense under Section 29 of the BIS Act, 2016.\n\n"
                "### What To Do Next\n"
                "1. **Identify product standard**: Search the BIS compendium for your product specification.\n"
                "2. **Prepare in-house lab**: Ensure all testing equipment listed in the Scheme of Inspection and Testing (SIT) is installed and calibrated.\n"
                "3. **File application online**: Apply on the e-BIS portal at **www.manakonline.in** with factory layout, plant machinery list, and Form-I.\n"
                "4. **Avail MSME concessions**: Micro enterprises receive a **50% concession** and Small enterprises receive a **20% concession** on marking fees.\n\n"
                "### Source & Verification\n"
                "Statutory provisions under BIS Act, 2016. Verify current scheme guidelines at [www.manakonline.in](https://www.manakonline.in)."
            )

        if not context_items:
            return (
                "### Likely Relevant Standard\n"
                "No exact match found in current prototype catalog for your query.\n\n"
                "### What It Means\n"
                "The query keywords did not directly map to the 572 indexed BIS standard titles or product scopes.\n\n"
                "### Why It Matters\n"
                "Different product variants may fall under specific sub-parts or alternate nomenclature (e.g., 'submersible pumps' vs 'centrifugal pumps').\n\n"
                "### What To Do Next\n"
                "Try searching with broad technical keywords such as *cement*, *immersion geyser*, *toys*, *packaged water*, *helmet*, *pressure cooker*, *steel*, or *electrical switch*.\n\n"
                "### Source & Verification\n"
                "Browse the official BIS Standards Portal: [www.manakonline.in](https://www.manakonline.in)."
            )

        top = context_items[0]
        is_num = top["is_number"]
        title = top["title"]
        desc = top["description"] or top["scope"] or "Product specification under Indian Standards compendium."
        is_mandatory = top["mandatory_qco"]

        qco_status = "**Mandatory Quality Control Order (QCO)** under Central Government notification" if is_mandatory else "Voluntary standard for quality assurance and consumer confidence"
        consequence = "Manufacturing, storing, or selling without an operative ISI mark is prohibited under Section 29 of the BIS Act, 2016." if is_mandatory else "Certification is voluntary but grants market access, public procurement eligibility (GeM portal), and consumer trust."

        other_stds = ", ".join([f"**{item['is_number']}**" for item in context_items[1:]]) if len(context_items) > 1 else "None directly cited"

        return (
            f"### Likely Relevant Standard\n"
            f"**{is_num}** — *{title}*\n"
            f"- **Statutory Status**: {qco_status}\n"
            f"- **Related Standards**: {other_stds}\n\n"
            f"### What It Means\n"
            f"{desc}\n\n"
            f"### Why It Matters\n"
            f"{consequence} It protects consumer safety, fire protection, dimensional reliability, and product durability across the Indian supply chain.\n\n"
            f"### What To Do Next\n"
            f"1. **Audit Production Unit**: Establish an in-house laboratory equipped for routine testing according to {is_num}.\n"
            f"2. **Documentation Dossier**: Prepare factory lease/premise proof, list of machinery, test equipment calibration records, and process flow chart.\n"
            f"3. **Online Application**: Register on **www.manakonline.in** and submit Form-I with initial application fee (₹1,000).\n"
            f"4. **Factory Inspection**: Host the BIS inspecting officer for plant audit and independent sample drawing.\n\n"
            f"### Source & Verification\n"
            f"Extracted from BIS Standards Compendium for {is_num}. Always verify the latest amendments and QCO enforcement dates at [www.manakonline.in](https://www.manakonline.in)."
        )


_chatbot_instance: Optional[ManakBotService] = None


def get_chatbot_service() -> ManakBotService:
    global _chatbot_instance
    if _chatbot_instance is None:
        _chatbot_instance = ManakBotService()
    return _chatbot_instance
