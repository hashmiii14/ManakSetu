"""
ManakBot AI Service — Core SIH26107 Intelligent Assistant
Grounded Retrieval-Augmented Generation (RAG) using Google Gemini 1.5 Flash
with deterministic BIS dataset fallback and structured 7-section evidence responses.
"""

from __future__ import annotations
import re
import httpx
from typing import Dict, Any, List, Optional
from .bis_retriever import get_retriever
from ..config import GEMINI_API_KEY, GEMINI_MODEL

BOT_DISCLAIMER = (
    "ManakSetu is an AI-assisted compliance and discovery platform. "
    "Please verify statutory decisions and official Quality Control Orders on the official BIS portal (manakonline.in)."
)

HINDI_TRIGGER_WORDS = {
    "kaise", "kare", "karna", "milega", "hoga", "chahiye", "kya", "kyun",
    "bante", "hain", "meri", "mera", "huid", "sariya", "paani", "bijli",
    "dokan", "factory", "namaste", "shukriya"
}

OUT_OF_DOMAIN_PATTERNS = [
    re.compile(r"\b(capital of|president of|prime minister of|who is the king|who won the)\b", re.IGNORECASE),
    re.compile(r"\b(bake|recipe|cook|baking|cake|chocolate cake|cookie|pasta|pizza|biryani|burger)\b", re.IGNORECASE),
    re.compile(r"\b(weather in|temperature in|forecast for)\b", re.IGNORECASE),
    re.compile(r"\b(movie|song|actor|actress|cricket match|football score)\b", re.IGNORECASE),
    re.compile(r"\b(write code|write a poem|write an essay on|tell me a joke)\b", re.IGNORECASE),
]


def is_hindi_or_hinglish(query: str) -> bool:
    # Check Devanagari Unicode block
    if re.search(r"[\u0900-\u097F]", query):
        return True
    # Check Hinglish trigger words
    tokens = set(re.findall(r"\b[a-zA-Z]+\b", query.lower()))
    return len(tokens.intersection(HINDI_TRIGGER_WORDS)) >= 1


def is_out_of_domain(query: str) -> bool:
    clean = query.strip().lower()
    # Explicit BIS keywords / standard numbers bypass refusal
    if re.search(r"\bis\s*\d{3,5}\b", clean) or any(k in clean for k in ["bis", "isi", "huid", "hallmark", "qco", "nabl"]):
        return False
    return any(p.search(clean) for p in OUT_OF_DOMAIN_PATTERNS)


class ManakBotService:
    def __init__(self):
        self.retriever = get_retriever()
        self.gemini_key = GEMINI_API_KEY
        self.gemini_model = GEMINI_MODEL

    async def answer_question(self, query: str, history: Optional[List[Dict[str, str]]] = None) -> Dict[str, Any]:
        clean_query = (query or "").strip()
        if not clean_query:
            return {
                "answer": "Please enter an inquiry regarding Indian Standards, BIS certification, hallmarking, or testing laboratories.",
                "referenced_standards": [],
                "sources": [],
                "source": "System",
                "confidence": "Low",
                "disclaimer": BOT_DISCLAIMER
            }

        # 1. Retrieve top relevant standards
        retrieved_items = self.retriever.retrieve(clean_query, top_k=3)
        
        # Quality threshold check for safe refusal
        is_ood = is_out_of_domain(clean_query)
        if is_ood or not retrieved_items or retrieved_items[0].get("relevance_score", 0.0) < 0.20:
            refusal_en = (
                "### Answer\n"
                "I could not find sufficient authoritative BIS information for this specific query in the current Indian Standards registry.\n\n"
                "### Recommended Actions\n"
                "- Refine your query by specifying exact product types (e.g., 'Storage Water Heater', 'LED Lighting', 'Stainless Steel Bottle', 'Ordinary Portland Cement').\n"
                "- Search by Indian Standard code directly (e.g., 'IS 2082', 'IS 302', 'IS 1489', 'IS 4151').\n"
                "- Consult the official Bureau of Indian Standards database at [manakonline.in](https://www.manakonline.in)."
            )
            refusal_hi = (
                "### उत्तर (Answer)\n"
                "इस प्रश्न के लिए वर्तमान भारतीय मानक (BIS) डेटाबेस में पर्याप्त प्रमाणिक जानकारी उपलब्ध नहीं हो सकी।\n\n"
                "### सुझाव (Recommended Actions)\n"
                "- कृपया अपने उत्पाद का सटीक नाम दर्ज करें (जैसे 'वाटर हीटर', 'सीमेंट', 'हेलमेट', 'एलईडी स्विच')।\n"
                "- सीधे मानक संख्या (जैसे 'IS 2082', 'IS 1489') से खोजें।\n"
                "- आधिकारिक बीआईएस पोर्टल [manakonline.in](https://www.manakonline.in) पर विवरण देखें।"
            )
            detected_lang = "hi" if re.search(r"[\u0900-\u097F]", clean_query) else ("hinglish" if is_hindi_or_hinglish(clean_query) else "en")
            return {
                "answer": refusal_hi if detected_lang in ["hi", "hinglish"] else refusal_en,
                "referenced_standards": [],
                "sources": [],
                "source": "BIS Safe Refusal Gate",
                "confidence": "Uncertain",
                "disclaimer": BOT_DISCLAIMER,
                "detected_language": detected_lang,
                "is_refusal": True,
                "structured_sections": {},
                "citations": []
            }

        # Structure references & source citations
        referenced = []
        sources = []
        citations = []
        for item in retrieved_items:
            referenced.append({
                "is_number": item["is_number"],
                "title": item["title"],
                "relevance_note": f"Match Score: {int(item['relevance_score'] * 100)}%"
            })
            src_obj = {
                "source_title": f"{item['is_number']} — {item['title']}",
                "standard_number": item["is_number"],
                "section": item.get("category", "General Technical Division"),
                "clause": "Scope & Mandatory Benchmarks (Clause 1-4)",
                "source_type": "Statutory Indian Standard Compendium",
                "url": f"/standards/{item['is_number']}",
                "relevance_score": round(item.get("relevance_score", 0.0), 2)
            }
            sources.append(src_obj)
            citations.append({
                "citation_text": src_obj["source_title"],
                "source_id": src_obj["standard_number"],
                "title": src_obj["source_title"],
                "clause": src_obj["clause"],
                "url": src_obj["url"],
                "relevance_score": src_obj["relevance_score"]
            })

        detected_lang = "hi" if re.search(r"[\u0900-\u097F]", clean_query) else ("hinglish" if is_hindi_or_hinglish(clean_query) else "en")
        is_hi = detected_lang in ["hi", "hinglish"]

        # 2. Try Gemini API first if configured
        answer = None
        source_name = None
        confidence_level = "High"

        if self.gemini_key and len(self.gemini_key.strip()) > 10:
            try:
                answer = await self._call_gemini(clean_query, retrieved_items, history, is_hi)
                source_name = f"Google Gemini ({self.gemini_model}) Grounded RAG"
            except Exception as e:
                print(f"[ManakBot] Gemini API notice ({e}). Using grounded BIS compendium fallback.")

        # 3. Deterministic grounded response directly from BIS knowledge engine
        if not answer:
            answer = self._generate_grounded_fallback(clean_query, retrieved_items, is_hi)
            source_name = "BIS Standards Knowledge Engine (Deterministic Grounding)"
            confidence_level = "Grounded in Retrieved BIS Specifications"

        # Extract structured sections from Markdown
        structured_sections = {}
        section_pattern = re.compile(r"###\s*(\d+\.?\s*[^\n]+)\n(.*?)(?=\n###|\Z)", re.DOTALL)
        for match in section_pattern.finditer(answer):
            sec_title = match.group(1).strip()
            sec_body = match.group(2).strip()
            structured_sections[sec_title] = sec_body

        return {
            "answer": answer,
            "referenced_standards": referenced,
            "sources": sources,
            "source": source_name,
            "confidence": confidence_level,
            "disclaimer": BOT_DISCLAIMER,
            "detected_language": detected_lang,
            "is_refusal": False,
            "structured_sections": structured_sections,
            "citations": citations
        }

    async def _call_gemini(self, query: str, context_items: List[Dict[str, Any]], history: Optional[List[Dict[str, str]]], is_hindi: bool) -> str:
        context_str = "\n\n".join([
            f"Standard: {item['is_number']}\n"
            f"Title: {item['title']}\n"
            f"Technical Division: {item['category']}\n"
            f"Scope / Benchmarks: {item.get('scope') or item.get('description', '')}\n"
            f"Mandatory Quality Control Order (QCO): {'Yes (Compulsory Certification under Section 16 BIS Act)' if item['mandatory_qco'] else 'Voluntary Scheme-I Conformity'}"
            for item in context_items
        ])

        lang_instruction = (
            "The user asked in Hindi or Hinglish. Provide your complete response in professional, accessible Hindi / Hinglish while keeping official technical terms (like IS codes, CM/L, QCO, NABL) clear and recognizable."
            if is_hindi else
            "Respond in clear, professional, authoritative English appropriate for an Indian government public service platform."
        )

        system_instruction = (
            "You are ManaKBot, the official and authoritative AI assistant for Indian Standards and the Bureau of Indian Standards (BIS).\n"
            f"{lang_instruction}\n"
            "Your answers must be grounded STRICTLY in the provided BIS standards context.\n"
            "NEVER fabricate Indian Standard numbers, certification requirements, or test procedures.\n"
            "Do NOT use emojis anywhere in your response.\n"
            "Format your response using the following 7 standardized sections:\n\n"
            "### 1. Direct Answer\n"
            "(Concise, authoritative summary directly addressing the query)\n\n"
            "### 2. Relevant Standard(s)\n"
            "(Standard number, full official title, and technical division)\n\n"
            "### 3. Applicability\n"
            "(Which products/sub-types are covered, whether under a Mandatory Quality Control Order QCO, or voluntary Scheme-I)\n\n"
            "### 4. Certification & Compliance Information\n"
            "(Applicable Scheme: Scheme-I ISI Mark, Scheme-II CRS, or Scheme-IV; required testing parameters such as endurance, safety, chemical assay)\n\n"
            "### 5. Required Steps\n"
            "(Actionable roadmap: factory testing setup STI, sample testing at NABL/BIS lab, filing on www.manakonline.in)\n\n"
            "### 6. Important Notes\n"
            "(Statutory penalties under Section 29 BIS Act 2016 for non-compliance; MSME 50% concession entitlement where applicable)\n\n"
            "### 7. Sources & Evidence\n"
            "(Explicitly cite standard number, technical scope, and official verification portal at www.manakonline.in)"
        )

        prompt = f"User Query: {query}\n\nRetrieved BIS Standards Context:\n{context_str}"
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

    def _generate_grounded_fallback(self, query: str, context_items: List[Dict[str, Any]], is_hindi: bool) -> str:
        top = context_items[0]
        qco_status = "Mandatory Quality Control Order (QCO) in Force" if top["mandatory_qco"] else "Voluntary Conformity Assessment (Scheme-I)"
        
        related_standards_str = ""
        if len(context_items) > 1:
            related_standards_str = "\n".join([
                f"- **{it['is_number']}**: {it['title']} ({it['category']})"
                for it in context_items[1:]
            ])
            related_standards_str = f"\n\n**Harmonized / Related Standards:**\n{related_standards_str}"

        if is_hindi:
            return (
                f"### 1. प्रत्यक्ष उत्तर (Direct Answer)\n"
                f"आपके प्रश्न के अनुसार प्रमुख लागू मानक **{top['is_number']}** ({top['title']}) है।\n\n"
                f"### 2. संबंधित मानक (Relevant Standards)\n"
                f"- **मानक संख्या:** {top['is_number']}\n"
                f"- **शीर्षक:** {top['title']}\n"
                f"- **तकनीकी प्रभाग:** {top['category']}\n\n"
                f"### 3. प्रयोज्यता (Applicability)\n"
                f"- **वैधानिक स्थिति:** {qco_status}।\n"
                f"- {top['scope'] or top['description']}\n\n"
                f"### 4. प्रमाणन एवं अनुपालन जानकारी (Certification Info)\n"
                f"इस उत्पाद के लिए **बीआईएस स्कीम-I (ISI Mark)** के अंतर्गत विनिर्माण लाइसेंस (CM/L) अनिवार्य है। "
                f"निर्माता को बीआईएस द्वारा निर्धारित 'Scheme of Testing and Inspection' (STI) के अनुसार इन-हाउस लैब स्थापित करना आवश्यक है।\n\n"
                f"### 5. आवश्यक चरण (Required Steps)\n"
                f"1. **मानक अध्ययन:** {top['is_number']} की तकनीकी विशिष्टताओं की समीक्षा करें।\n"
                f"2. **परीक्षण सेटअप:** आवश्यक परीक्षण उपकरण स्थापित करें एवं NABL लैब से पूर्व-परीक्षण कराएं।\n"
                f"3. **पोर्टल आवेदन:** [manakonline.in](https://www.manakonline.in) पर Form-I आवेदन जमा करें।\n"
                f"4. **निरीक्षण:** बीआईएस तकनीकी अधिकारी द्वारा फैक्ट्री का भौतिक निरीक्षण।\n"
                f"5. **लाइसेंस प्राप्ति:** CM/L संख्या एवं ISI मार्क का अधिकार पत्र प्राप्त करें।\n\n"
                f"### 6. महत्वपूर्ण सूचनाएं (Important Notes)\n"
                f"- **कानूनी अनिवार्यता:** अनिवार्य QCO के तहत बिना ISI मार्क माल बेचना बीआईएस अधिनियम 2016 की धारा 29 के तहत दंडनीय अपराध है।\n"
                f"- **MSME छूट:** सूक्ष्म एवं लघु उद्यमों (MSME) को आवेदन शुल्क एवं मार्किंग फीस में 50% की वैधानिक रियायत प्राप्त है।\n"
                f"{related_standards_str}\n\n"
                f"### 7. स्रोत एवं साक्ष्य (Sources & Evidence)\n"
                f"- **आधिकारिक स्रोत:** भारतीय मानक ब्यूरो (BIS) आधिकारिक राजपत्र एवं मानक निर्देशिका।\n"
                f"- **पुष्टि लिंक:** [manakonline.in](https://www.manakonline.in) एवं [/standards/{top['is_number']}](/standards/{top['is_number']})"
            )

        return (
            f"### 1. Direct Answer\n"
            f"The primary Indian Standard governing your inquiry is **{top['is_number']}** (*{top['title']}*).\n\n"
            f"### 2. Relevant Standard(s)\n"
            f"- **Standard Code:** {top['is_number']}\n"
            f"- **Official Title:** {top['title']}\n"
            f"- **Technical Division:** {top['category']}\n\n"
            f"### 3. Applicability\n"
            f"- **Statutory Status:** {qco_status}.\n"
            f"- **Coverage:** {top['scope'] or top['description']}\n\n"
            f"### 4. Certification & Compliance Information\n"
            f"Certification operates under **BIS Conformity Assessment Scheme-I (Product Certification / ISI Mark)**. "
            f"Manufacturers must maintain an active in-house quality control laboratory adhering to the standard's specific Scheme of Testing and Inspection (STI).\n\n"
            f"### 5. Required Steps\n"
            f"1. **Procure Standard:** Obtain official specification {top['is_number']} from the BIS Standards Portal.\n"
            f"2. **In-House Testing Setup:** Equip factory testing facility with calibrated equipment for routine tests.\n"
            f"3. **Pre-Certification Sample Testing:** Test representative samples at a recognized NABL-accredited test house.\n"
            f"4. **Digital Application:** File Form-I along with plant layout, equipment list, and test reports at [manakonline.in](https://www.manakonline.in).\n"
            f"5. **Factory Assessment:** Satisfy physical audit by BIS technical inspecting officer.\n"
            f"6. **Grant of License:** Receive 7-digit CM/L identifier to affix the Standard ISI pyramid mark.\n\n"
            f"### 6. Important Notes\n"
            f"- **Legal Liability:** Manufacturing, stocking, or distributing goods notified under a mandatory QCO without the ISI mark constitutes a cognizable offense punishable under Section 29 of the BIS Act, 2016.\n"
            f"- **MSME Fee Relief:** Micro and Small enterprises qualify for a statutory 50% concession on application and minimum annual marking fees.\n"
            f"{related_standards_str}\n\n"
            f"### 7. Sources & Evidence\n"
            f"- **Authoritative Source:** Bureau of Indian Standards Official Compendium.\n"
            f"- **Verification Portal:** [e-BIS ManakOnline](https://www.manakonline.in) | Internal Spec: [{top['is_number']}](/standards/{top['is_number']})"
        )


_chatbot_service_instance: Optional[ManakBotService] = None


def get_chatbot_service() -> ManakBotService:
    global _chatbot_service_instance
    if _chatbot_service_instance is None:
        _chatbot_service_instance = ManakBotService()
    return _chatbot_service_instance
