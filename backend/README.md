# ManakSetu (मानकसेतु)
### Intelligent Gateway to Indian Standards, BIS Certification & Conformity Assessment
**Smart India Hackathon 2026 — Problem Statement SIH26107**  
*Championed by Ministry of Consumer Affairs, Food & Public Distribution | Bureau of Indian Standards (BIS)*

**Live Production Portal**: [https://manaksetu.vercel.app/](https://manaksetu.vercel.app/)  
**GitHub Repository**: [https://github.com/hashmiii14/ManakSetu](https://github.com/hashmiii14/ManakSetu)  

---

## 1. Project Overview & Problem Statement

### The Problem (SIH26107)
India has over **21,000+ national standards** and **760+ mandatory Quality Control Orders (QCO)** across diverse sectors. However, Indian MSMEs, manufacturers, startup founders, and everyday consumers struggle with:
1. **Discoverability**: Finding the exact Indian Standard (IS code) applicable to their product using plain language.
2. **Procedural Complexity**: Navigating convoluted certification schemes (Scheme-I ISI Mark, Scheme-II CRS, FMCS, Hallmarking) and lengthy documentation dossiers.
3. **Financial Ambiguity**: Unclear statutory fee structures, often missing out on statutory **50% / 20% MSME concessions** under Gazette notifications.
4. **Consumer Counterfeiting**: Difficulty in verifying 6-character gold jewelry HUID codes and 7-digit ISI factory license numbers printed on retail packaging.
5. **Testing Access**: Inability to identify accredited NABL/BIS testing laboratories capable of executing mandated STI (Scheme of Testing and Inspection) protocols.

### The Solution: ManakSetu
**ManakSetu ("The Standards Bridge")** is an end-to-end, citizen-and-industry-facing digital platform built to democratize access to Indian Standards, streamline certification journeys, verify standard marks, estimate statutory costs, and consult grounded AI without hallucinations.

---

## 2. Core Service Modules

```
+---------------------------------------------------------------------------------+
|                           MANAKSETU PLATFORM CORE                               |
+--------+--------------+------------------+-----------------+--------------------+
         |              |                  |                 |
         v              v                  v                 v
 +--------------++--------------+   +--------------+  +--------------+
 |   MODULE 1   ||   MODULE 2   |   |   MODULE 3   |  |   MODULE 4   |
 |StandardFinder||   Scheme &   |   |  ManakBot AI |  |   TrueMark   |
 |  AI & QCO    ||   License    |   | Grounded RAG |  |   Verifier   |
 |  Repository  ||  Navigator   |   | Consultation |  |  (HUID & CML)|
 +--------------++--------------+   +--------------+  +--------------+
                                           |
                                           v
                                    +--------------+
                                    |   MODULE 5   |
                                    |  MSME 50%    |
                                    |  Estimator & |
                                    |  Labs Locator|
                                    +--------------+
```

### Module 1: StandardFinder AI & QCO Repository (`/standards`)
- **Curated Dataset**: 572 indexed Indian Standards covering civil engineering, mechanical, electrical, electronics, food, chemical, and consumer goods.
- **Hybrid Retrieval**: Combines BM25 lexical keyword matching with vector semantic embeddings (`embeddings.npy`) and domain boosts.
- **Mandatory QCO Filter**: Filters products notified under mandatory Quality Control Orders (Section 16, BIS Act 2016).
- **Omnipresent "Ask ManakBot"**: Direct search action button, top query callout banner, and per-card links to jump immediately to AI consultation.

### Module 2: Interactive Scheme & License Navigator (`/certification`)
- **4-Step Stateful Decision Wizard**:
  - **Step 1 (Service)**: Scheme-I (ISI Mark), Scheme-II (CRS), Gold Hallmarking (HUID), or FMCS (Foreign Manufacturers).
  - **Step 2 (Product)**: Geysers, Cement, Helmets, Toys, Cookers, Switches, etc.
  - **Step 3 (Enterprise Classification)**: Micro (50% fee concession), Small (20% fee concession), Medium/Large, or DPIIT Startup.
  - **Step 4 (Tailored Pathway)**: Generates a complete statutory dossier checklist, in-house factory testing apparatus inventory (STI), testing requirements, and print/save summary.
- **10-Stage Sequential Compliance Stepper**:
  - Deep-dive interactive tracker: Standard Identification -> Gap Analysis -> In-House Lab Setup -> Trial Batch -> e-BIS Filing -> Preliminary Scrutiny -> Factory Physical Audit -> Independent Testing -> License Grant (CM/L) -> Market Surveillance.

### Module 3: Grounded ManakBot AI (`/manakbot`)
- **Retrieval-Augmented Generation (RAG)**: Uses retrieved BIS standards as context for Google Gemini 1.5 Flash.
- **Zero Hallucination Guard**: Grounded strictly in retrieved specifications with deterministic statutory fallbacks answering:
  1. What is BIS certification?
  2. How to find standard for a geyser? (IS 2082)
  3. What documents are required for BIS certification? (Form-V dossier)
  4. What is HUID? (6-character laser mark, 3-stamp hallmark rule)
  5. How to verify ISI mark? (IS code + 7-digit CM/L check)
  6. What is QCO? (Section 16 order, Section 29 penalties)
  7. Hindi inquiries (e.g. factory switch licensing).
- **Deep Query Pre-fill**: Accepts `?prompt=...` from search bars, laboratory cards, and standard detail pages.

### Module 4: TrueMark Citizen & Enterprise Verifier (`/verify`)
- **Dual-Tab Verification**:
  - **Gold Jewellery HUID Verification**: Validates 6-character alphanumeric laser marks against assaying records (e.g., `AK79B2`, `MH41C9`, `KA88X1`, fraud detection `XX9999`). Informs consumers of their statutory right to Rs 45 testing at any recognized AHC.
  - **ISI Factory License (CM/L) Verification**: Validates 7-digit manufacturing licenses (e.g., UltraTech Cement `6200145`, Havells `8400192`, Anchor `7100341`, Finolex `4300921`, fraud warning `9900000`).
- **Grievance Escalation**: 1-click filing linking directly to `/report` and National Consumer Helpline (NCH: 1915).

### Module 5: Smart Cost Estimator & Lab Locator (`/estimator`, `/labs`)
- **Statutory Tariff Estimator**:
  - Calculates itemized fees: Application (Rs 1,000), Factory Inspection (2 man-days @ Rs 7,000 = Rs 14,000), Annual License (Rs 1,000), Minimum Marking Fee (e.g. Rs 92,000), and MSME 50% / 20% concession.
- **Accredited Testing Laboratories**:
  - Curated directory of 12 apex laboratories (BIS Central Lab, ERDA, CPRI, NTH, NCCBM, ARAI, etc.).
  - One-click filter chips for industrial hubs (Delhi-NCR, Mumbai, Bengaluru, Chennai, Kolkata, Hyderabad, Ahmedabad) and product scopes.
  - Haversine GPS proximity sorting with fallback to New Delhi for live demo.
  - In-button non-blocking copy feedback and Google Maps directions.

---

## 3. Technology Architecture

| Layer | Technology | Rationale |
| :--- | :--- | :--- |
| **Server & Framework** | **Python 3.11+ / FastAPI (ASGI)** | High-throughput, async REST endpoints, automatic OpenAPI documentation (`/api/docs`). |
| **Server-Side Templates** | **Jinja2** | Lightning-fast, SEO-friendly server-rendered HTML5 with zero client hydration penalty. |
| **Styling Engine** | **Custom Government CSS System** | Pixel-perfect Indian Government design palette (`--gov-900`, saffron, emerald) without external framework bloat. |
| **Client Scripting** | **Vanilla JavaScript (<500 lines)** | Minimal footprint for mobile drawer, dynamic step toggles, GPS Haversine calculation, and chat AJAX. |
| **Search & Retrieval** | **Hybrid Lexical BM25 + Cosine Similarity** | Dual retrieval with domain boosts and pre-computed embeddings (`embeddings.npy`). |
| **Grounded AI** | **Google Gemini 1.5 Flash** | Sub-second response generation with procedural knowledge fallback guardrails. |
| **Hosting & Deployment**| **Vercel Serverless Python** | Instant global edge deployment via `api/index.py` mounting the FastAPI ASGI application. |

---

## 4. Local Setup & Installation

### Prerequisites
- Python 3.11 or higher
- Git

### Installation Steps

1. **Clone the repository:**
   ```bash
   git clone https://github.com/hashmiii14/ManakSetu.git
   cd ManakSetu
   ```

2. **Create a virtual environment:**
   ```bash
   # Windows (PowerShell):
   python -m venv venv
   .\venv\Scripts\Activate.ps1

   # Linux / macOS:
   python3 -m venv venv
   source venv/bin/activate
   ```

3. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Configure environment variables (optional):**
   ```bash
   cp .env.example .env
   # Add your GEMINI_API_KEY if desired.
   # The portal includes comprehensive deterministic fallbacks if omitted!
   ```

5. **Run local development server:**
   ```bash
   uvicorn app.main:app --reload --port 8000
   ```

6. **Open in browser:**
   - Portal: [http://localhost:8000](http://localhost:8000)
   - Interactive OpenAPI Swagger Docs: [http://localhost:8000/api/docs](http://localhost:8000/api/docs)

---

## 5. Live Presentation Demo Script (For SIH Judges)

When presenting to evaluators, execute this structured 3-minute sequence:

| Step | Action | What to Say / Highlight |
| :--- | :--- | :--- |
| **1. The Hook** | Open Homepage (`/`) | *"Good morning/afternoon, Judges. India has over 21,000 standards and 760+ mandatory QCO orders, but small businesses struggle to discover them. ManakSetu bridges this gap across 5 functional pillars."* |
| **2. Search & ManakBot** | Search `"water heater"` on `/standards` | *"Notice our dual action: the user can search the 572-standard prototype repository or click 'Ask ManakBot'. Each result card highlights mandatory QCO status and has direct links to calculate fees or consult AI."* |
| **3. Grounded AI** | Click `"Ask ManakBot"` & select `"What is BIS certification?"` | *"Unlike generic LLMs that hallucinate legal advice, ManakBot uses grounded RAG strictly on BIS standards and statutory acts with structured 7-section answers and official citations."* |
| **4. Scheme Navigator** | Go to `/certification`, run the 4-step wizard | *"A Micro enterprise manufacturing geysers gets a tailored dossier checklist, in-house laboratory apparatus requirements, and a 10-stage sequential roadmap to CM/L license grant."* |
| **5. MSME Relief & Labs** | Go to `/estimator` & `/labs` | *"Demonstrates statutory 50% fee relief (Rs 92,500 savings on cement) and GPS proximity sorting for accredited NABL/BIS testing laboratories across India."* |
| **6. TrueMark Verifier** | Go to `/verify` & test `AK79B2` and `6200145` | *"Citizens can verify 6-character gold HUID marks and 7-digit ISI licenses with fraud detection (test `XX9999`) and 1-click NCH 1915 grievance escalation."* |

---

## 6. Prototype Disclaimers & Regulatory Reference

> [!NOTE]
> **SIH 2026 Educational Prototype Notice**
> - **Educational Prototype**: Developed exclusively for the Smart India Hackathon 2026 under Problem Statement SIH26107.
> - **Dataset Scope**: The working prototype indexes a curated compendium of 572 high-priority Indian Standards, representative test laboratories, and verified licensees. Official BIS catalogues contain 21,000+ standards.
> - **Official Submissions**: For official regulatory applications, license filings, and gazette notifications, citizens and enterprises must visit [manakonline.in](https://www.manakonline.in) and [bis.gov.in](https://www.bis.gov.in).
