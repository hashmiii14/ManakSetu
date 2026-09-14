"""
ManakBot AI Service — Core SIH26107 Intelligent Assistant
Grounded Retrieval-Augmented Generation (RAG) using Google Gemini 1.5 Flash
with deterministic BIS dataset fallback, verifiable sources, and structured 7-section evidence responses.
"""

from __future__ import annotations
import re
import httpx
from typing import Dict, Any, List, Optional
from .bis_retriever import get_retriever
from ..config import GEMINI_API_KEY, GEMINI_MODEL

BOT_DISCLAIMER = (
    "ManakSetu is an educational and prototype assistant developed for SIH26107. "
    "This guidance is derived from retrieved prototype dataset information. "
    "Please verify official Quality Control Orders and statutory decisions on manakonline.in."
)

HINDI_TRIGGER_WORDS = {
    "kaise", "kare", "karna", "milega", "hoga", "chahiye", "kya", "kyun",
    "bante", "hain", "meri", "mera", "huid", "sariya", "paani", "bijli",
    "dokan", "factory", "namaste", "shukriya", "banao", "bataye", "batayein"
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


PROCEDURAL_KNOWLEDGE: Dict[str, Dict[str, Any]] = {
    "what is bis certification": {
        "title": "Bureau of Indian Standards (BIS) Product Certification (ISI Mark)",
        "standard_number": "BIS Act, 2016 & Conformity Assessment Regulations, 2018",
        "category": "Statutory Conformity Assessment Schemes",
        "answer": (
            "### 1. Direct Answer\n"
            "**BIS Certification** is India's national third-party product quality assurance system administered by the Bureau of Indian Standards (BIS) under the **Bureau of Indian Standards Act, 2016**. It permits manufacturers who demonstrate compliant factory quality control and product testing to affix the prestigious **ISI Mark** (Scheme-I) or **CRS Registration** (Scheme-II).\n\n"
            "### 2. Relevant Statutory Framework\n"
            "- **Governing Legislation:** Bureau of Indian Standards Act, 2016 (Section 13, 14, 15, and 16)\n"
            "- **Key Conformity Schemes:** Scheme-I (Product Certification / ISI Mark), Scheme-II (Compulsory Registration Scheme / CRS for IT/electronics), Scheme-IV (Foreign Manufacturers Scheme / FMCS)\n"
            "- **Statutory Body:** Bureau of Indian Standards, Ministry of Consumer Affairs, Food & Public Distribution\n\n"
            "### 3. Purpose & Objectives\n"
            "- **Consumer Protection:** Guarantees health, safety, reliability, and technical performance of products.\n"
            "- **Statutory Mandate (QCO):** Over 760 products are notified under compulsory Quality Control Orders where manufacturing, importing, or selling without BIS certification is punishable by law.\n"
            "- **Market Trust:** Establishes commercial credibility and qualifies manufacturers for Government e-Marketplace (GeM) public procurement tenders.\n\n"
            "### 4. High-Level Certification Process\n"
            "1. **Identification of Standard:** Identify the applicable Indian Standard (IS Code) for your product.\n"
            "2. **In-House QC Setup:** Establish factory laboratory equipment adhering to the BIS Scheme of Testing and Inspection (STI).\n"
            "3. **Online Application:** File Form-V on the [e-BIS ManakOnline portal](https://www.manakonline.in) with factory layout and machinery details.\n"
            "4. **Factory Audit & Sampling:** BIS inspecting officers physically audit the plant and draw independent samples.\n"
            "5. **Grant of License:** Upon passing laboratory verification, a 7-digit CM/L (Certificate of Manufacturing License) is issued.\n\n"
            "### 5. MSME Concessions & Relief\n"
            "- **Micro Enterprises:** Eligible for a **50% statutory concession** on application and annual minimum marking fees.\n"
            "- **Small Enterprises:** Eligible for a **20% statutory concession** upon submitting valid Udyam registration.\n\n"
            "### 6. Sources & Relevant References\n"
            "- **Statutory Act:** Bureau of Indian Standards Act, 2016\n"
            "- **Regulations:** BIS (Conformity Assessment) Regulations, 2018\n"
            "- **Official Portal:** [e-BIS ManakOnline Portal](https://www.manakonline.in)"
        )
    },
    "what documents are required for bis certification": {
        "title": "Statutory Documentation Checklist for BIS ISI License Application",
        "standard_number": "BIS Form-V Application Enclosures",
        "category": "Licensing Documentation",
        "answer": (
            "### 1. Direct Answer\n"
            "Applying for a BIS Product Certification License (CM/L under Scheme-I) requires a comprehensive statutory dossier verifying the applicant's legal entity, manufacturing competency, quality control infrastructure, and technical test records.\n\n"
            "### 2. Mandatory Document Checklist\n"
            "#### A. Manufacturing Facility & Legal Documents:\n"
            "1. **Factory Registration / Certificate of Incorporation:** Proof of establishment (Factory License, DIC / MSME Udyam Registration, or ROC Incorporation).\n"
            "2. **Factory Layout Plan:** Scaled schematic drawing highlighting manufacturing lines, raw material storage, and in-house laboratory.\n"
            "3. **Manufacturing Machinery List:** Detailed inventory of installed machinery, production capacity, and make/model.\n\n"
            "#### B. Quality Control & Testing Infrastructure:\n"
            "4. **In-House Testing Equipment List:** Testing apparatus corresponding to the Scheme of Testing and Inspection (STI) of the standard.\n"
            "5. **Calibration Certificates:** Valid calibration certificates for all test gauges and instruments from NABL-accredited facilities.\n"
            "6. **Quality Personnel Competency:** Appointment letters and educational qualifications of the designated Factory Testing In-Charge.\n\n"
            "#### C. Product & Process Technical Dossier:\n"
            "7. **Manufacturing Process Flowchart:** Detailed process stages from raw material receipt to finished packaging.\n"
            "8. **Raw Material Test Certificates:** Mill test certificates and supplier invoices for primary inputs.\n"
            "9. **Pre-Certification Independent Test Report:** Third-party sample test report from a BIS-recognized / NABL-accredited laboratory (mandatory under Simplified Procedure).\n"
            "10. **Consent Letter & Brand Authorization:** Trademark registration certificate or authorization letter from brand owner.\n\n"
            "### 3. Financial & Concession Documents\n"
            "- **Udyam Certificate:** Mandatory for Micro (50% fee relief) and Small (20% fee relief) enterprises.\n"
            "- **Payment Receipt:** Proof of online statutory application fee submission (₹1,000).\n\n"
            "### 4. Sources & Relevant References\n"
            "- **BIS Portal:** [e-BIS Online Application Checklist](https://www.manakonline.in)\n"
            "- **Regulations:** BIS (Conformity Assessment) Regulations, 2018 (Schedule II)"
        )
    },
    "what is an huid": {
        "title": "Hallmarking Unique Identification (HUID) — Gold Jewellery Traceability",
        "standard_number": "IS 1417:2016 (Gold & Gold Alloys Hallmarking)",
        "category": "Consumer Hallmarking & Precious Metals",
        "answer": (
            "### 1. Direct Answer\n"
            "An **HUID (Hallmarking Unique Identification)** is a 6-character alphanumeric laser-inscribed code (e.g., `AK79B2`, `MH41C9`) stamped onto every piece of gold jewellery alongside the BIS Triangle logo and the purity grade mark (such as `22K916` or `18K750`).\n\n"
            "### 2. Statutory Significance & Composition\n"
            "- **Unique Identity:** Each piece of jewellery receives a unique serial code at an accredited Assaying & Hallmarking Centre (AHC), establishing tamper-proof traceability.\n"
            "- **Tripartite Hallmark:** A genuine BIS hallmark consists of three distinct laser stamps:\n"
            "  1. **BIS Standard Logo:** Triangle emblem of the Bureau of Indian Standards.\n"
            "  2. **Purity & Fineness Mark:** `24K995`, `22K916`, `18K750`, or `14K585`.\n"
            "  3. **6-Digit HUID Code:** Laser engraved alphanumeric identifier.\n\n"
            "### 3. Consumer Verification Rights\n"
            "- **BIS CARE App:** Consumers can verify their 6-digit HUID code directly on the official BIS CARE Mobile Application or on [ManakSetu TrueMark Verifier](/verify?subtab=huid).\n"
            "- **Statutory ₹45 Testing Right:** Under Section 24 of the Hallmarking Regulations, any consumer can get their hallmarked jewelry tested at any BIS-recognized Assaying & Hallmarking Centre for a nominal statutory fee of **₹45 per article**.\n"
            "- **Compensation Rule:** If testing reveals lower gold purity than stamped, the jeweler must refund the difference plus twice the testing fee.\n\n"
            "### 4. Sources & Relevant References\n"
            "- **Indian Standard:** IS 1417:2016 — Gold and Gold Alloys, Silver and Silver Alloys\n"
            "- **Regulatory Notification:** Bureau of Indian Standards (Hallmarking) Regulations, 2018\n"
            "- **Consumer Verification:** [TrueMark Verifier](/verify) | [BIS Care Portal](https://www.bis.gov.in)"
        )
    },
    "how can i verify an isi mark": {
        "title": "Verifying ISI Mark and CM/L Manufacturer License Authenticity",
        "standard_number": "BIS License Verification (CM/L 7-Digit Registry)",
        "category": "Consumer Protection & Conformity Verification",
        "answer": (
            "### 1. Direct Answer\n"
            "A genuine **ISI Mark** must always be accompanied by two mandatory statutory inscriptions: the **Indian Standard number (IS Code)** directly above the ISI symbol, and a **7-digit Certificate of Manufacturing License (CM/L) number** directly below the symbol (e.g., `CM/L-6200145`).\n\n"
            "### 2. Step-by-Step Verification Protocol\n"
            "1. **Inspect Physical Marking:** Ensure the ISI mark contains:\n"
            "   - The official BIS monogram (stylized ISI letters in standard rectangle).\n"
            "   - The applicable IS number on top (e.g., `IS 2082` for geysers, `IS 1489` for PPC cement).\n"
            "   - The 7-digit license code below: `CM/L-XXXXXXX`.\n"
            "2. **Verify on ManakSetu:** Enter the 7-digit number on [TrueMark Verifier](/verify?subtab=cml) to check active licensee identity, factory location, and scope.\n"
            "3. **Verify on BIS CARE App / e-BIS:** Search on the official portal at [manakonline.in](https://www.manakonline.in) under *Conformity Assessment -> Search Licensee*.\n\n"
            "### 3. Warning Signs of Counterfeit Marks\n"
            "- Missing 7-digit CM/L number below the logo.\n"
            "- Misspelled or altered logo (e.g. non-standard font or aspect ratio).\n"
            "- License status marked 'Suspended' or 'Expired' in the central registry.\n\n"
            "### 4. Consumer Grievance Recourse\n"
            "- If a fake ISI mark is found, file an immediate statutory complaint with the National Consumer Helpline at **1915** or via the [ManakSetu Grievance Portal](/report).\n\n"
            "### 5. Sources & Relevant References\n"
            "- **Statutory Act:** BIS Act, 2016 (Sections 14, 15, and 29)\n"
            "- **Verification Gateway:** [TrueMark Verifier](/verify) | [e-BIS Search Licensee](https://www.manakonline.in)"
        )
    },
    "what is qco": {
        "title": "Quality Control Orders (QCO) — Mandatory Statutory Compliance",
        "standard_number": "Section 16 of BIS Act, 2016",
        "category": "Statutory Quality Orders",
        "answer": (
            "### 1. Direct Answer\n"
            "A **Quality Control Order (QCO)** is a mandatory statutory directive issued by the Central Government (Ministries like DPIIT, Ministry of Power, Ministry of Steel, etc.) under **Section 16 of the BIS Act, 2016**. Once a QCO is in force, compliance with the specified Indian Standard is **strictly compulsory** for all manufacturers and importers.\n\n"
            "### 2. Legal Consequences & Penalties\n"
            "- **Prohibition:** No person shall manufacture, import, store, distribute, or sell any goods covered under a notified QCO without the valid Standard ISI Mark.\n"
            "- **Penalties under Section 29 of BIS Act 2016:** Violation is a criminal offense punishable by:\n"
            "  - **Imprisonment:** Up to **2 years**, or\n  - **Monetary Fine:** Minimum **₹2,00,000** extending up to **10 times the value** of non-certified goods produced or sold, or both.\n  - **Confiscation:** Complete seizure of non-compliant inventory by BIS enforcement officers.\n\n"
            "### 3. Prominent Examples of Mandatory QCOs\n"
            "- **Cement:** IS 1489 (PPC Cement) & IS 12269 (53 Grade OPC Cement)\n"
            "- **Electrical Appliances:** IS 2082 (Geysers/Water Heaters), IS 302 (Safety of Domestic Appliances)\n"
            "- **Safety Gear:** IS 4151 (Two-Wheeler Helmets), IS 2553 (Safety Glass for Vehicles)\n"
            "- **Childcare & Toys:** IS 9873 (Safety of Toys - Mechanical and Physical Properties)\n"
            "- **Household Goods:** IS 2347 (Domestic Pressure Cookers)\n\n"
            "### 4. Sources & Relevant References\n"
            "- **Statutory Provision:** Section 16 & Section 29, Bureau of Indian Standards Act, 2016\n"
            "- **QCO Repository:** [ManakSetu QCO Directory](/standards?qco_only=true)\n"
            "- **Official Gazettes:** Ministry of Consumer Affairs & DPIIT Gazette Notifications"
        )
    }
}


def find_procedural_match(query: str) -> Optional[Dict[str, Any]]:
    clean = re.sub(r"[^a-zA-Z0-9\s]", "", (query or "").lower()).strip()
    if not clean:
        return None
    # Exact or keyword substring match
    for key, data in PROCEDURAL_KNOWLEDGE.items():
        clean_key = re.sub(r"[^a-zA-Z0-9\s]", "", key).strip()
        if clean_key in clean or clean in clean_key:
            return data
    # Fallback keyword checks
    if "what is bis certification" in clean or ("what is bis" in clean and "standard" not in clean):
        return PROCEDURAL_KNOWLEDGE["what is bis certification"]
    if "documents" in clean and ("certification" in clean or "bis" in clean or "license" in clean):
        return PROCEDURAL_KNOWLEDGE["what documents are required for bis certification"]
    if "huid" in clean and ("what is" in clean or "meaning" in clean or "hallmark" in clean or "verify" in clean):
        return PROCEDURAL_KNOWLEDGE["what is an huid"]
    if "verify" in clean and ("isi" in clean or "cml" in clean or "license" in clean):
        return PROCEDURAL_KNOWLEDGE["how can i verify an isi mark"]
    if "qco" in clean and ("what is" in clean or "mandatory" in clean or "order" in clean):
        return PROCEDURAL_KNOWLEDGE["what is qco"]
    return None


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

        # 0. Check procedural / regulatory knowledge base first
        proc_match = find_procedural_match(clean_query)
        if proc_match:
            src_citation = {
                "source_title": proc_match["title"],
                "standard_number": proc_match["standard_number"],
                "section": proc_match["category"],
                "clause": "Statutory Directive",
                "source_type": "Official BIS Regulation",
                "url": "https://www.manakonline.in",
                "relevance_score": 1.0
            }
            return {
                "answer": proc_match["answer"],
                "referenced_standards": [{
                    "is_number": proc_match["standard_number"],
                    "title": proc_match["title"],
                    "relevance_note": "Authoritative Procedural Match"
                }],
                "sources": [src_citation],
                "source": "BIS Regulatory Knowledge Base",
                "confidence": "Authoritative",
                "disclaimer": BOT_DISCLAIMER,
                "detected_language": "hi" if is_hindi_or_hinglish(clean_query) else "en",
                "is_refusal": False,
                "structured_sections": {
                    "Scope": proc_match["category"],
                    "Legal Mandate": proc_match["standard_number"],
                },
                "citations": [src_citation]
            }

        # 1. Retrieve top relevant standards
        retrieved_items = self.retriever.retrieve(clean_query, top_k=3)
        
        # Quality threshold check for safe refusal
        is_ood = is_out_of_domain(clean_query)
        if is_ood or not retrieved_items or retrieved_items[0].get("relevance_score", 0.0) < 0.20:
            refusal_en = (
                "### Answer\n"
                "I could not find sufficient authoritative information in the current ManakSetu knowledge base for this query.\n\n"
                "### Recommended Actions\n"
                "- **Search Standards**: Search by specific product name or IS code on the [Standards Directory](/standards).\n"
                "- **Refine Query**: Specify exact product types (e.g. 'Domestic Pressure Cooker', 'Storage Water Heater', 'LED Lighting', 'Stainless Steel Bottle', 'Ordinary Portland Cement').\n"
                "- **Open Official BIS Resources**: Consult the official Bureau of Indian Standards portal at [manakonline.in](https://www.manakonline.in)."
            )
            refusal_hi = (
                "### उत्तर (Answer)\n"
                "वर्तमान मानकसेतु ज्ञानकोष (knowledge base) में इस प्रश्न के लिए पर्याप्त प्रमाणिक जानकारी उपलब्ध नहीं हो सकी।\n\n"
                "### सुझाव (Recommended Actions)\n"
                "- **मानक खोजें (Search Standards)**: [मानक निर्देशिका](/standards) पर उत्पाद का सटीक नाम या IS कोड दर्ज करें।\n"
                "- **सटीक प्रश्न पूछें (Refine Query)**: उत्पाद का स्पष्ट नाम दें (जैसे 'प्रेशर कुकर', 'वाटर हीटर', 'सीमेंट', 'इलेक्ट्रिकल स्विच')।\n"
                "- **आधिकारिक बीआईएस संसाधन (Open Official BIS Resources)**: आधिकारिक पोर्टल [manakonline.in](https://www.manakonline.in) पर विवरण देखें।"
            )
            detected_lang = "hi" if re.search(r"[\u0900-\u097F]", clean_query) else ("hinglish" if is_hindi_or_hinglish(clean_query) else "en")
            return {
                "answer": refusal_hi if detected_lang in ["hi", "hinglish"] else refusal_en,
                "referenced_standards": [],
                "sources": [],
                "source": "ManakSetu Safe Refusal Gate",
                "confidence": "Uncertain",
                "disclaimer": BOT_DISCLAIMER,
                "detected_language": detected_lang,
                "is_refusal": True,
                "structured_sections": {},
                "citations": []
            }

        # Structure references & source citations (Section 6: Sources & Evidence)
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
                "title": item["title"],
                "section": item.get("category", "General Technical Division"),
                "clause": None,  # Do not fabricate clauses when not explicitly in chunk
                "page": None,    # Do not fabricate page numbers when not explicitly in chunk
                "source_type": "BIS Reference Document",
                "url": f"/standards?q={item['is_number']}",
                "relevance_score": round(item.get("relevance_score", 0.0), 2)
            }
            sources.append(src_obj)
            citations.append({
                "source_title": src_obj["source_title"],
                "standard_number": src_obj["standard_number"],
                "title": src_obj["title"],
                "section": src_obj["section"],
                "clause": src_obj["clause"],
                "page": src_obj["page"],
                "source_type": src_obj["source_type"],
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
            source_name = "ManakSetu Grounded Knowledge Engine"
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
            f"Scope / Requirements: {item.get('scope') or item.get('description', '')}\n"
            f"Mandatory Quality Control Order (QCO): {'Yes (Compulsory Certification under Section 16 BIS Act)' if item['mandatory_qco'] else 'Voluntary Scheme-I Conformity'}"
            for item in context_items
        ])

        lang_instruction = (
            "The user asked in Hindi or Hinglish. Provide your complete response in professional, accessible Hindi / Hinglish while keeping official technical terms (like IS codes, CM/L, QCO, NABL) clear and recognizable."
            if is_hindi else
            "Respond in clear, professional, accessible English appropriate for a public service intelligent assistant."
        )

        system_instruction = (
            "You are ManakBot, the intelligent assistant for Indian Standards and BIS services, developed as an educational prototype for Smart India Hackathon 2026 (SIH26107).\n"
            f"{lang_instruction}\n"
            "Your answers must be grounded strictly in the provided BIS standards context. Do not claim to be an official Government portal.\n"
            "NEVER fabricate Indian Standard numbers, standard titles, certification requirements, testing benchmarks, laboratory names, or citations.\n"
            "If the context does not contain sufficient authoritative evidence, state clearly:\n"
            "'I could not find sufficient authoritative information in the current ManakSetu knowledge base for this query.'\n"
            "Do NOT use emojis anywhere in your response.\n"
            "Format your response using the following structured sections:\n\n"
            "### 1. Direct Answer\n"
            "(Concise, clear answer directly addressing the query)\n\n"
            "### 2. Relevant Standard(s)\n"
            "(Standard number, full official title, and technical division)\n\n"
            "### 3. Why this standard may apply\n"
            "(Technical rationale explaining how the product or material connects to this standard)\n\n"
            "### 4. Certification & Compliance Guidance\n"
            "(Applicable Scheme: Scheme-I ISI Mark, Scheme-II CRS, or Scheme-IV; required testing parameters; note that processes may vary by scheme)\n\n"
            "### 5. Required Next Steps\n"
            "(Actionable roadmap: factory testing setup STI, sample testing at recognized lab, online filing on www.manakonline.in)\n\n"
            "### 6. Important Notes\n"
            "(Provisions under Section 29 of the BIS Act 2016 for mandatory QCO items; MSME concession information where applicable)\n\n"
            "### 7. Sources & Evidence\n"
            "(Explicitly cite standard number, source document title, and official verification portal at www.manakonline.in)"
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
            related_standards_str = f"\n\n**Related Standards in Dataset:**\n{related_standards_str}"

        if is_hindi:
            return (
                f"### 1. प्रत्यक्ष उत्तर (Direct Answer)\n"
                f"आपके प्रश्न के अनुसार प्रमुख प्रासंगिक मानक **{top['is_number']}** ({top['title']}) है।\n\n"
                f"### 2. संबंधित मानक (Relevant Standards)\n"
                f"- **मानक संख्या:** {top['is_number']}\n"
                f"- **शीर्षक:** {top['title']}\n"
                f"- **तकनीकी प्रभाग:** {top['category']}\n\n"
                f"### 3. यह मानक क्यों लागू हो सकता है (Why this standard may apply)\n"
                f"- **स्थिति:** {qco_status}।\n"
                f"- **क्षेत्र एवं दायरा:** {top['scope'] or top['description']}\n\n"
                f"### 4. प्रमाणन एवं अनुपालन मार्गदर्शन (Certification Guidance)\n"
                f"यह उत्पाद **बीआईएस स्कीम-I (ISI Mark)** के अंतर्गत विनिर्माण लाइसेंस (CM/L) के लिए विचारणीय है। "
                f"प्रक्रिया लागू योजना के अनुसार भिन्न हो सकती है। निर्माता को बीआईएस परीक्षण एवं निरीक्षण योजना (STI) के अनुसार इन-हाउस परीक्षण व्यवस्था रखनी होती है।\n\n"
                f"### 5. आवश्यक अगले कदम (Required Next Steps)\n"
                f"1. **मानक समीक्षा:** {top['is_number']} की तकनीकी आवश्यकताओं की समीक्षा करें।\n"
                f"2. **इन-हाउस परीक्षण सेटअप:** आवश्यक परीक्षण उपकरण स्थापित करें एवं मान्यता प्राप्त लैब से पूर्व-परीक्षण कराएं।\n"
                f"3. **ऑनलाइन आवेदन:** [manakonline.in](https://www.manakonline.in) पर ई-बीआईएस पोर्टल के माध्यम से आवेदन करें।\n"
                f"4. **फैक्ट्री ऑडिट:** बीआईएस तकनीकी अधिकारी द्वारा निरीक्षण एवं नमूना परीक्षण।\n"
                f"5. **लाइसेंस प्राप्ति:** CM/L संख्या एवं ISI मार्क उपयोग का अधिकार प्राप्त करें।\n\n"
                f"### 6. महत्वपूर्ण सूचनाएं (Important Notes)\n"
                f"- **कानूनी प्रावधान:** अनिवार्य QCO के तहत बिना ISI मार्क माल बेचना बीआईएस अधिनियम 2016 की धारा 29 के तहत प्रतिबंधित है।\n"
                f"- **MSME छूट:** सूक्ष्म एवं लघु उद्यमों को आवेदन शुल्क एवं मार्किंग फीस में 50% तक की रियायत का प्रावधान है।\n"
                f"{related_standards_str}\n\n"
                f"### 7. स्रोत एवं साक्ष्य (Sources & Evidence)\n"
                f"- **दस्तावेज़:** {top['is_number']} — {top['title']}\n"
                f"- **स्रोत प्रकार:** BIS Reference Catalogue\n"
                f"- **पुष्टि लिंक:** [manakonline.in](https://www.manakonline.in) एवं [/standards?q={top['is_number']}](/standards?q={top['is_number']})"
            )

        return (
            f"### 1. Direct Answer\n"
            f"The primary Indian Standard governing your inquiry is **{top['is_number']}** (*{top['title']}*).\n\n"
            f"### 2. Relevant Standard(s)\n"
            f"- **Standard Code:** {top['is_number']}\n"
            f"- **Official Title:** {top['title']}\n"
            f"- **Technical Division:** {top['category']}\n\n"
            f"### 3. Why this standard may apply\n"
            f"- **Applicability Status:** {qco_status}.\n"
            f"- **Technical Coverage:** {top['scope'] or top['description']}\n\n"
            f"### 4. Certification & Compliance Guidance\n"
            f"Conformity assessment typically operates under **BIS Scheme-I (Product Certification / ISI Mark)**. "
            f"Process may vary by applicable BIS scheme. Manufacturers must maintain an in-house quality control setup adhering to the standard's specific Scheme of Testing and Inspection (STI).\n\n"
            f"### 5. Required Next Steps\n"
            f"1. **Review Specification:** Procure and review official specification {top['is_number']} on the BIS portal.\n"
            f"2. **In-House Testing Setup:** Equip factory laboratory with calibrated testing apparatus for routine checks.\n"
            f"3. **Pre-Certification Sample Testing:** Have product samples tested at an accredited laboratory.\n"
            f"4. **Online Application:** File Form-I along with plant layout, machinery list, and test reports at [manakonline.in](https://www.manakonline.in).\n"
            f"5. **Factory Assessment & Sampling:** Complete physical audit by BIS technical inspecting officers.\n"
            f"6. **Grant of License:** Receive 7-digit CM/L identifier to affix the Standard ISI mark.\n\n"
            f"### 6. Important Notes\n"
            f"- **Statutory Provisions:** For products under a mandatory Quality Control Order, manufacturing or distribution without certification is prohibited under Section 29 of the BIS Act, 2016.\n"
            f"- **MSME Concessions:** Micro and Small enterprises qualify for indicative 50% relief on application and minimum marking fees.\n"
            f"{related_standards_str}\n\n"
            f"### 7. Sources & Evidence\n"
            f"- **Document / Source:** {top['is_number']} — {top['title']}\n"
            f"- **Source Type:** BIS Reference Document (Prototype Dataset)\n"
            f"- **Official Portal:** [e-BIS ManakOnline](https://www.manakonline.in) | Catalogue Reference: [{top['is_number']}](/standards?q={top['is_number']})"
        )


_chatbot_service_instance: Optional[ManakBotService] = None


def get_chatbot_service() -> ManakBotService:
    global _chatbot_service_instance
    if _chatbot_service_instance is None:
        _chatbot_service_instance = ManakBotService()
    return _chatbot_service_instance
