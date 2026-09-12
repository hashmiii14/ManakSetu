# ManakSetu
### AI-Powered BIS Standards Recommendation, Compliance & Consumer Vigilance Copilot

**Smart India Hackathon (SIH 2026)** | **Problem Statement ID:** `26107`  
**Ministry:** Ministry of Consumer Affairs, Food & Public Distribution  
**Department:** Department of Consumer Affairs (DoCA) & Bureau of Indian Standards (BIS)  
**Institution:** Jamia Hamdard, New Delhi  
**Team:** SnippetSquad  

---

## Executive Summary

India has published over 21,000+ Indian Standards (IS Codes) through the **Bureau of Indian Standards (BIS)** to ensure product quality, consumer safety, and industrial standardization. However, over **70% of MSMEs, start-ups, and artisans** face significant friction:
- *Which specific Indian Standard applies to my product?*
- *Is my product under a Mandatory Quality Control Order (QCO)?*
- *What tests, documentation, and fees are required for ISI Mark certification?*
- *How can everyday consumers verify 6-digit Hallmark Unique Identification (HUID) or 7-digit ISI CML numbers?*

**ManakSetu (मानक सेतु)** bridges this gap. By integrating the **BIS Standards Recommendation Engine (`BIS-Standard-RE`)** with modern civic-tech UI workflows, ManakSetu provides:
1. **Hybrid Retrieval**: BM25 keyword search + semantic vector similarity + domain-specific material/title boosting + query expansions.
2. **Standard Details & Compliance Guidance**: Step-by-step roadmap, technical scope, mandatory tests, recognized testing laboratories, and application documentation.
3. **Dynamic MSME Fee Estimator**: Automated statutory fee breakdowns with 50% Micro / 20% Small enterprise concessions.
4. **ManakBot Grounded Assistant**: Contextual Q&A grounded strictly in retrieved BIS standards (Gemini-powered with deterministic offline fallback).
5. **Dual-Tier Consumer Verifier & Grievance Reporting**: Instant verification of HUID gold hallmarks and ISI CML licenses with 1-click violation reporting.

---

## System Architecture

```mermaid
graph TD
    subgraph Frontend ["Frontend (React + Vite + Tailwind CSS)"]
        UI[User Interface / Civic-Tech Green Theme]
        Hero[Hero Search Bar with Debounce]
        Explore[Explore Standards & Category Filters]
        DetailModal[Standard Detail & Compliance Roadmap Modal]
        Estimator[Dynamic MSME Fee Calculator Section]
        BotUI[ManakBot Grounded RAG Chatbot]
        VerifierUI[HUID & ISI Authenticity Verifier]
        ReportModal[Counterfeit & Violation Reporting Modal]
        APIService[Centralized API Client: src/services/api.js]
    end

    subgraph Backend ["FastAPI Backend Service (Port 8000)"]
        Router[FastAPI API Router]
        Retriever[BISRetriever: Hybrid Search Pipeline]
        CalcService[FeeCalculator Service]
        VerifyService[Verifier Service: Dual-Tier Auth Engine]
        ChatService[Grounded BIS Chatbot Service]
        ReportRepo[ReportRepository: JSON Persistence]
    end

    subgraph DataEngine ["BIS Recommendation Engine (BIS-Standard-RE)"]
        BM25[BM25 Okapi Index]
        Embeddings[Semantic Vector Cache: embeddings.npy]
        Expansions[Synonym & Keyword Expansion Maps]
        Boosting[Domain & Title Material Boosting]
        DataStore[(Processed Standards: 570+ JSON Store)]
    end

    UI --> APIService
    APIService --> Router
    Router -->|GET/POST /api/search| Retriever
    Router -->|GET /api/standards/{code}| Retriever
    Router -->|POST /api/calculate| CalcService
    Router -->|POST /api/verify| VerifyService
    Router -->|POST /api/chatbot| ChatService
    Router -->|POST /api/report| ReportRepo

    Retriever --> BM25
    Retriever --> Embeddings
    Retriever --> Expansions
    Retriever --> Boosting
    Retriever --> DataStore
    ChatService --> Retriever
```

---

## Key Features & Modules

| Module | Purpose | Under the Hood |
| :--- | :--- | :--- |
| **Hybrid Search Engine** | Finds relevant Indian Standards for products in natural language | Dual-mode BM25 Okapi, synonym expansion (`geyser` $\rightarrow$ `water heater`, `doll` $\rightarrow$ `toys`), domain boosting, and semantic vector similarity. |
| **Compliance Guidance** | Translates technical standards into actionable steps | Technical scope, critical safety testing benchmarks, recognized test labs, and required technical dossier documents. |
| **MSME Fee Calculator** | Estimates initial certification costs and ongoing renewal fees | Computes Application, Audit, and Marking fees; applies statutory 50% Micro / 20% Small enterprise discounts under Gazette notifications. |
| **ManakBot Assistant** | AI assistant for manufacturers and consumers | Grounded RAG with Google Gemini API; falls back to an intelligent deterministic BIS compliance engine when offline. |
| **Consumer Verifier** | Authenticates gold jewelry HUID & ISI certification marks | Validates 6-character alphanumeric HUIDs and 7-digit CML codes against representative verified registries with fail-safe reporting. |
| **Violation Reporting** | File counterfeit or misleading ISI mark reports | Generates unique tracking IDs (`REP-XXXXXX`), timestamps, and persists complaint payloads for regulatory investigation. |

---

## Local Development & Setup Guide

### Prerequisites
- **Node.js**: v18 or higher (`node -v`)
- **Python**: 3.10 or 3.11 (`python --version`)
- **Git**

---

### Step 1: Clone the Repository
```bash
git clone https://github.com/hashmiii14/ManakSetu.git
cd ManakSetu
```

---

### Step 2: Backend Setup (FastAPI)

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. (Optional but recommended) Create and activate a virtual environment:
   ```bash
   python -m venv venv
   # On Windows:
   .\venv\Scripts\activate
   # On macOS/Linux:
   source venv/bin/activate
   ```

3. Install required Python packages:
   ```bash
   pip install -r requirements.txt
   ```

4. Configure environment variables:
   ```bash
   cp .env.example .env
   # Edit .env and optionally add your GEMINI_API_KEY
   ```

5. Run API self-test:
   ```bash
   python scripts/test_api.py
   ```

6. Start the FastAPI backend server:
   ```bash
   python -m uvicorn app.main:app --host 127.0.0.1 --port 8000 --reload
   ```
   * Interactive Swagger Docs: [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)
   * OpenAPI Specification: [http://127.0.0.1:8000/openapi.json](http://127.0.0.1:8000/openapi.json)

---

### Step 3: Frontend Setup (React + Vite)

1. Open a new terminal and navigate to the project root:
   ```bash
   cd ManakSetu
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Ensure `.env` points to the FastAPI backend:
   ```env
   VITE_API_BASE_URL=http://127.0.0.1:8000
   ```

4. Start the frontend development server:
   ```bash
   npm run dev
   ```
   * Access the application at: [http://localhost:3000](http://localhost:3000) or [http://localhost:5173](http://localhost:5173)

---

## 📡 Key API Endpoints

| Method | Endpoint | Description | Sample Query / Body |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/search` | Search standards with query parameters | `?q=immersion+geyser&category=Electrical&limit=5` |
| `POST` | `/api/search` | Full search payload with filters | `{"query": "toys baby doll", "limit": 5}` |
| `GET` | `/api/standards/{is_code}` | Detailed standard specification | `/api/standards/IS 368:2014` |
| `POST` | `/api/calculate` | MSME fee calculation with statutory concessions | `{"enterprise_type": "Micro", "turnover_in_lakhs": 25}` |
| `POST` | `/api/verify` | Authenticate HUID or ISI CML number | `{"verification_type": "HUID", "code": "AK79B2"}` |
| `POST` | `/api/chatbot` | Grounded RAG compliance assistant | `{"message": "What are safety requirements for immersion heaters?", "is_code": "IS 368:2014"}` |
| `POST` | `/api/report` | Submit non-compliance / fake mark report | `{"violation_type": "Fake ISI Mark", "product_name": "Roadside Geyser", ...}` |

---

## SIH Demo & Jury Walkthrough Guide

Use these test queries during presentations and evaluation demos:

### 1. Product Search & Hybrid Matching
- **Query:** `immersion geyser`  
  *Expected Result:* Returns `IS 368:2014` (Electric Immersion Water Heaters) and `IS 2082:2018` (Stationary Storage Water Heaters) with **Mandatory QCO** badge and high match score.
- **Query:** `baby doll / toys`  
  *Expected Result:* Returns `IS 9873 (Part 1):2019` (Safety of Toys - Mechanical and Physical Properties) under Mandatory QCO.
- **Query:** `two-wheeler helmet`  
  *Expected Result:* Returns `IS 4151:2020` (Protective Helmets for Motorcycle Riders).
- **Query:** `pressure cooker`  
  *Expected Result:* Returns `IS 2347:2017` (Domestic Pressure Cookers - Safety Requirements).
- **Query:** `packaged drinking water`  
  *Expected Result:* Returns `IS 14543:2016` (Packaged Drinking Water Other Than Natural Mineral Water).

### 2. Standard Details & Roadmap
- Click **"View Full Standard & Roadmap"** on any standard card.
- Inspect the **Interactive Compliance Roadmap** (5 stages), **Key Laboratory Tests**, **Recognized Testing Facilities**, and **Application Dossier**.

### 3. Dynamic MSME Fee Estimator
- Switch enterprise scale between **Large**, **Small (20% Off)**, and **Micro (50% Off)**.
- Note the dynamic recalculation of statutory marking fees and total initial investment.

### 4. Grounded ManakBot Q&A
- Ask: *"What are the mandatory tests for electric water heaters?"*
- ManakBot responds with grounded references to `IS 368:2014` (High-voltage dielectric test, leakage current test, earthing continuity, thermal cut-out cut-off test).

### 5. Consumer Authenticity Verifier
- **Valid Gold Hallmark (HUID):** Enter `AK79B2` $\rightarrow$ Returns verified 22K Gold Hallmark registered to Tanishq Jewellers, New Delhi (Assayed by MMTC-PAMP AHC).
- **Valid ISI CML License:** Enter `8400192` $\rightarrow$ Returns verified active license for Havells India Ltd. under `IS 2082:2018`.
- **Invalid / Counterfeit Code:** Enter `INVALID99` $\rightarrow$ Displays red counterfeit warning with a prominent **"Report This Violation"** button opening the pre-filled grievance report modal.

---

## Truthful Disclosures & Technical Limitations

In accordance with responsible engineering practices and hackathon evaluation criteria:
1. **Dataset Scope:** This prototype is indexed over a curated canonical collection of 570+ Indian Standards (including all consumer safety QCO standards and the SP 21 engineering standards library). It does *not* claim live direct database connection to proprietary internal BIS government databases.
2. **Fee Estimates:** Fees generated by the Cost Estimator are based on published BIS Gazette notification fee structures. Actual fees may vary depending on factory scale, sample transport, and specific laboratory pricing.
3. **Verification Sandbox:** The verifier runs against an extensible prototype verification registry with representative verified samples and checksum validation. It demonstrates the exact production architecture needed for integration with the BIS National Hallmark and CML portal APIs.

---

## Acknowledgments & Credits

- **BIS-Standard-RE:** Standards recommendation engine reference implementation, hybrid scoring logic, and baseline dataset by [`ujjwal-7531/BIS-Standard-RE`](https://github.com/ujjwal-7531/BIS-Standard-RE).
- **Bureau of Indian Standards (BIS):** For publicly published standard abstracts, titles, and Gazette QCO notifications.
- **Smart India Hackathon 2026:** Organized by the Ministry of Education's Innovation Cell & AICTE.

---

**Developed with ❤️ by Team SnippetSquad | Jamia Hamdard, New Delhi**
