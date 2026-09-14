# ManakSetu (मानकसेतु)
### Intelligent Gateway to Indian Standards & BIS Conformity Assessment
**Smart India Hackathon 2026 — Problem Statement 26107**  
*Championed by Ministry of Consumer Affairs, Food & Public Distribution | Bureau of Indian Standards (BIS)*

---

## 1. Project Overview

**ManakSetu ("The Standards Bridge")** is an authentic, civic-tech and compliance platform designed to democratize access to the National Standards compendium of India. 

Operating under the statutory framework of the **Bureau of Indian Standards Act, 2016**, ManakSetu eliminates the compliance and technical barriers faced by Micro, Small, and Medium Enterprises (MSMEs), consumers, and quality auditors by providing:
- **Intelligent Standards Retrieval:** Instant discovery across 572 indexed Indian Standards (IS) using hybrid lexical BM25 and vector semantic similarity.
- **Mandatory Quality Control Orders (QCO) Tracking:** Live statutory classification under Section 16 of the BIS Act.
- **MSME 50% / 20% Tariff Concession Calculator:** Transparent certification fee breakdown delivering up to 50% marking fee relief for micro units (e.g. ₹92,500 statutory savings on Portland Pozzolana Cement).
- **TrueMark Dual Verification:** Instant authenticity validation for 7-digit ISI license numbers (`CM/L-XXXXXXX`) and 6-character gold jewelry hallmarks (`HUID`).
- **Grounded ManakBot AI:** Retrieval-Augmented Generation (RAG) powered by Google Gemini 1.5 Flash grounded strictly in official BIS specifications with zero AI hallucinations.
- **Statutory Grievance Redressal:** Automated violation tracking generating official dockets (`REP-YYYYMMDD-XXXXXX`) integrated with National Consumer Helpline (1915) escalation.

---

## 2. Technology Stack

ManakSetu is built as a **pure Python full-stack application** with zero Node.js/React frontend dependencies:

| Layer | Technology | Key Responsibility |
|---|---|---|
| **Backend & Application Server** | **Python 3.11+ / FastAPI** | High-performance ASGI web framework providing server-side routing and REST APIs. |
| **Frontend Presentation** | **Jinja2 Templates** | Lightning-fast server-rendered HTML5 with accessibility and clean government architecture. |
| **Styling System** | **Vanilla CSS3** | Custom Indian Government design system adhering to BIS visual standards with zero CSS framework bloat. |
| **Client-Side Interactivity** | **Vanilla JavaScript (<200 lines)** | Minimal browser script for mobile drawer navigation, chat AJAX, and live calculation preview. |
| **Grounded AI Engine** | **Google Gemini 1.5 Flash** | Structured 5-stage RAG answers grounded strictly in retrieved BIS standards. |
| **Retrieval Engine** | **Hybrid BM25 + Vector Cosine** | Domain query expansions, title boosting, and precomputed embeddings (`embeddings.npy`). |
| **Database & Persistence** | **PostgreSQL / SQLite** | Relational storage for grievance reports and verification audit logs with automatic SQLite/JSON fallback. |
| **Production Hosting** | **Vercel Python Runtime** | Serverless ASGI execution via `api/index.py`. |

---

## 3. Project Architecture

```
ManakSetu/
├── app/
│   ├── main.py                  # FastAPI app instance, CORS, lifespan, static & page mounts
│   ├── config.py                # Environment configs (GEMINI_API_KEY, DATABASE_URL, paths)
│   ├── routes/
│   │   ├── pages.py             # Server-rendered Jinja2 pages (Home, Search, Details, etc.)
│   │   ├── search.py            # Standards Search API (/api/search)
│   │   ├── standards.py         # Standards Catalogue API (/api/standards)
│   │   ├── chatbot.py           # ManakBot AI API (/api/chatbot)
│   │   ├── calculator.py        # MSME Tariff Calculator API (/api/calculate)
│   │   ├── verifier.py          # TrueMark Verifier API (/api/verify)
│   │   ├── reports.py           # Violation Grievance API (/api/report)
│   │   └── compliance.py        # 7-Stage Compliance Engine (/api/compliance/check)
│   ├── services/
│   │   ├── bis_retriever.py     # BM25 + Domain expansion + Cosine similarity retrieval
│   │   ├── gemini_service.py    # Gemini 1.5 Flash grounded prompt + fallback
│   │   ├── calculator_service.py# Statutory tariff calculation & MSME concessions
│   │   ├── verifier_service.py  # HUID & ISI CM/L multi-provider verification registry
│   │   └── report_service.py    # Report generation & tracking ID dispatch
│   ├── models/
│   │   ├── schemas.py           # Pydantic schemas for API requests and responses
│   │   └── database_models.py   # PostgreSQL schema & data structures
│   ├── database/
│   │   ├── connection.py        # PostgreSQL connection pool with safe SQLite fallback
│   │   └── repositories.py      # Standards and grievance repositories
│   └── utils/
│       └── helpers.py           # Formatting utilities, INR currency formatters, tracking ID
├── templates/
│   ├── base.html                # Government header, national emblem, top strip, footer
│   ├── index.html               # Homepage: Hero search, matrix, cement showcase, 12 BIS services
│   ├── standards.html           # Standards search & catalog with division and QCO filters
│   ├── standard_detail.html     # Full standard specification, testing benchmarks, recognized labs
│   ├── calculator.html          # MSME fee concession calculator with live breakdown
│   ├── verifier.html            # Dual-tab TrueMark HUID / ISI CM/L verifier with result card
│   ├── chatbot.html             # ManakBot interactive chat interface with prompt chips
│   ├── report.html              # Violation grievance submission form with tracking ID
│   ├── about.html               # SIH 2026 Problem Statement 26107 background & architecture
│   ├── services.html            # 12 statutory BIS scheme services directory
│   └── faq.html                 # Frequently asked questions on BIS certification & QCOs
├── static/
│   ├── css/
│   │   ├── main.css             # Base typography, CSS variables, government color palette
│   │   ├── components.css       # Cards, badges, buttons, tables, forms, chat bubbles
│   │   └── responsive.css       # Full responsive breakpoints (375px to 1920px)
│   ├── js/
│   │   └── minimal.js           # Lightweight vanilla JS for mobile menu and AJAX
│   └── images/
│       └── og-image.png         # High-resolution social sharing preview card (1200x630)
├── data/
│   ├── processed_data.json      # 572 indexed BIS standards compendium
│   └── embeddings.npy           # Precomputed vector embeddings
├── api/
│   └── index.py                 # Vercel entry point: from app.main import app
├── requirements.txt             # Python dependencies
├── vercel.json                  # Vercel Serverless routing
├── .env.example                 # Environment variables template
└── README.md                    # Project documentation
```

---

## 4. Key Statutory Features

### 4.1. Featured Standard Showcase — Cement Certification
- **Standards:** IS 1489 (Part 1): 2015 (Portland Pozzolana Cement) & IS 12269: 2013 (53 Grade OPC).
- **Testing Benchmarks:** 28-day Compressive Strength (&ge; 33 / 53 MPa), Soundness (&le; 10 mm), Initial Setting Time (&ge; 30 min).
- **Mandatory Packaging Regulations:** RED lettering for IS 1489 PPC; BLACK lettering for IS 12269 OPC.
- **Apex Testing Laboratories:** National Council for Cement and Building Materials (NCCBM, Ballabgarh & Hyderabad) and National Test House (NTH).
- **1-Click Actions:** Verify UltraTech Cement (`CM/L-6200145`) or calculate ₹92,500 MSME relief with a single click.

### 4.2. MSME 50% Concession Fee Calculator
- Computes statutory fee relief under Section 13 of the BIS Act, 2016.
- **Micro Enterprises:** 50% concession on minimum marking fees.
- **Small Enterprises:** 20% concession on minimum marking fees.
- Itemized breakdown of Application Fee (₹1,000), Factory Inspection (2 man-days @ ₹7,000 = ₹14,000), and Net Payable.

### 4.3. TrueMark Dual Verifier (HUID & ISI CM/L)
- **ISI License Verification:** Validates 7-digit manufacturer licenses against registered BIS licensees (e.g. UltraTech Cement `6200145`, Havells `8400192`, Anchor `7100341`, Finolex `4300921`).
- **Gold Hallmarking HUID:** Validates 6-character laser inscriptions (e.g. Tanishq `AK79B2`, Kalyan `MH41C9`, Malabar `KA88X1`, Fraud detection `XX9999`).
- **1-Click Grievance Escalation:** Unverified or suspended identifiers can be reported directly to the National Consumer Helpline (NCH: 1915).

### 4.4. Grounded ManakBot AI (Gemini 1.5 Flash + RAG)
- Uses top retrieved Indian Standards as grounding context.
- Returns structured responses adhering to 5 distinct statutory sections:
  1. *Likely Relevant Standard*
  2. *What It Means*
  3. *Why It Matters*
  4. *What To Do Next*
  5. *Source & Verification*
- Automatic deterministic fallback to BIS compendium when API keys are unconfigured.

---

## 5. API Reference

| Endpoint | Method | Description |
|---|---|---|
| `/` | `GET` | Server-rendered portal homepage. |
| `/standards` | `GET` | Standards directory with category and QCO filters. |
| `/standards/{is_code}` | `GET` | Standard detail page with testing benchmarks and fee preview. |
| `/calculator` | `GET` | Interactive MSME fee concession calculator. |
| `/verify` | `GET` | TrueMark citizen and enterprise verifier. |
| `/chatbot` | `GET` | ManakBot AI consultation desk. |
| `/report` | `GET` | Grievance and statutory violation reporting form. |
| `/api/search` | `GET / POST` | Hybrid search query returning matching BIS standards. |
| `/api/standards` | `GET` | Paginated listing of indexed Indian Standards. |
| `/api/calculate` | `GET / POST` | Computes itemized MSME fee estimates. |
| `/api/verify` | `GET / POST` | Verifies HUID hallmark or ISI CM/L license code. |
| `/api/chatbot` | `POST` | Grounded AI query answering via Gemini 1.5 Flash. |
| `/api/report` | `POST` | Records statutory violation report and dispatches tracking docket (`REP-YYYYMMDD-XXXXXX`). |
| `/api/compliance/check`| `POST` | 7-stage conformity roadmap evaluation for manufacturing units. |

---

## 6. Local Development & Setup

### Prerequisites
- Python 3.11 or higher
- Git

### Installation Steps

1. **Clone the repository:**
   ```bash
   git clone https://github.com/hashmiii14/ManakSetu.git
   cd ManakSetu
   ```

2. **Create and activate a virtual environment:**
   ```bash
   python -m venv venv
   # On Windows (PowerShell):
   .\venv\Scripts\Activate.ps1
   # On Linux / macOS:
   source venv/bin/activate
   ```

3. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Configure environment variables:**
   ```bash
   cp .env.example .env
   ```
   *(Optional: Add `GEMINI_API_KEY` for live Gemini responses. The app includes full deterministic fallback if omitted).*

5. **Start the development server:**
   ```bash
   uvicorn app.main:app --reload --port 8000
   ```

6. **Open in browser:**
   Visit [http://localhost:8000](http://localhost:8000) to view the portal, or [http://localhost:8000/api/docs](http://localhost:8000/api/docs) for the interactive OpenAPI documentation.

---

## 7. Vercel Deployment

ManakSetu deploys natively on Vercel using the official Python Serverless runtime:
1. `vercel.json` routes all requests to `api/index.py`.
2. `api/index.py` imports `app` from `app.main`.
3. Deploy directly with:
   ```bash
   vercel --prod
   ```
   Or link the GitHub repository to your Vercel project with Zero Configuration.

---

## 8. Limitations & Prototype Disclaimer

> [!NOTE]
> **SIH 2026 Educational Prototype Disclaimer**
> ManakSetu is an educational prototype developed for the **Smart India Hackathon 2026 (Problem Statement 26107)**.
> - **Not an Official Government Portal:** ManakSetu is not operated by the Bureau of Indian Standards (BIS) or the Government of India.
> - **Prototype Verification Registry:** Licensee verification and HUID hallmarking results are simulated against representative datasets for evaluation purposes.
> - **Statutory Confirmation:** All regulatory specifications, active Quality Control Orders, laboratory accreditations, and official license statuses must be verified on the official BIS portal ([manakonline.in](https://www.manakonline.in)).

---

## 9. License

Developed for academic and educational evaluation under Smart India Hackathon 2026.
Bureau of Indian Standards Act, 2016 statutory guidelines referenced for educational demonstration.
