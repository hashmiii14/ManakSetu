"""
Comprehensive Automated Test Suite for ManakSetu Portal
Validates:
- All 16 HTML web pages & query parameter variations
- All 11 REST API endpoints
- Safe refusal gate & Hindi/Hinglish detection in chatbot
- HUID validation logic & compensation calculation
- 10-Stage certification roadmap with MSME relief
"""

import sys
from pathlib import Path

# Add project root to sys.path
PROJECT_ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(PROJECT_ROOT))

from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_html_pages():
    print("--- 1. Testing HTML Page Routes ---")
    pages = [
        ("/", 200),
        ("/standards", 200),
        ("/standards?q=cement", 200),
        ("/standards?q=geyser&category=Electrotechnical&qco_only=true", 200),
        ("/standards/IS%201489", 200),
        ("/certification", 200),
        ("/certification?standard=IS+2082&tier=micro", 200),
        ("/laboratories", 200),
        ("/laboratories?state=Delhi&q=electrical", 200),
        ("/laboratories?state=Maharashtra", 200),
        ("/hallmarking", 200),
        ("/hallmarking?huid=AK79B2", 200),
        ("/hallmarking?huid=INVALID", 200),
        ("/calculator", 200),
        ("/calculator?standard=IS+1489&tier=small", 200),
        ("/fee-calculator", 200),
        ("/verify", 200),
        ("/verify?huid=AK79B2", 200),
        ("/verify?cml=6200145", 200),
        ("/chatbot", 200),
        ("/chatbot?prompt=cement+testing", 200),
        ("/manakbot", 200),
        ("/report", 200),
        ("/grievance", 200),
        ("/recommend", 200),
        ("/recommend?q=pressure+cooker", 200),
        ("/labs", 200),
        ("/about", 200),
        ("/services", 200),
        ("/faq", 200),
    ]

    for url, expected_status in pages:
        res = client.get(url)
        assert res.status_code == expected_status, f"Route {url} failed: {res.status_code}"
        print(f"  [PASS] {url} -> {res.status_code} OK")

def test_rest_api_endpoints():
    print("\n--- 2. Testing REST API Endpoints ---")
    
    # 1. Laboratories search
    r = client.get("/api/labs/search?q=cement")
    assert r.status_code == 200
    d = r.json()
    assert "laboratories" in d
    assert len(d["laboratories"]) > 0
    print(f"  [PASS] GET /api/labs/search -> {len(d['laboratories'])} laboratories found")

    # 2. Proximity lab search (New Delhi coords: 28.6139, 77.2090)
    r = client.get("/api/labs/search?lat=28.6139&lon=77.2090")
    assert r.status_code == 200
    d = r.json()
    assert "laboratories" in d
    nearest = d["laboratories"][0]
    assert "distance_km" in nearest
    print(f"  [PASS] GET /api/labs/search (proximity) -> Nearest: {nearest['name']} ({nearest['distance_km']} km)")

    # 3. Hallmarking info
    r = client.get("/api/hallmarking/info")
    assert r.status_code == 200
    d = r.json()
    assert len(d["gold_purity_grades"]) == 6
    assert len(d["silver_purity_grades"]) == 4
    assert len(d["three_mandatory_marks"]) == 3
    print(f"  [PASS] GET /api/hallmarking/info -> 6 Gold, 4 Silver grades, 3 Mandatory Marks")

    # 4. Hallmarking HUID verify valid
    r = client.post("/api/hallmarking/verify", json={"huid": "AK79B2"})
    assert r.status_code == 200
    d = r.json()
    assert d["is_valid"] is True
    assert d["details"]["jeweller"] is not None
    print(f"  [PASS] POST /api/hallmarking/verify (AK79B2) -> Valid ({d['details']['purity']})")

    # 5. Hallmarking HUID verify malformed
    r = client.post("/api/hallmarking/verify", json={"huid": "123"})
    assert r.status_code == 200
    d = r.json()
    assert d["is_valid"] is False
    print(f"  [PASS] POST /api/hallmarking/verify (123) -> Correctly rejected: {d['message']}")

    # 6. Certification stages
    r = client.get("/api/certification/stages")
    assert r.status_code == 200
    d = r.json()
    assert len(d) == 10
    print(f"  [PASS] GET /api/certification/stages -> 10 statutory stages verified")

    # 7. Certification roadmap generation
    r = client.post("/api/certification/navigate", json={"standard_code": "IS 2082", "enterprise_type": "micro"})
    assert r.status_code == 200
    d = r.json()
    assert d["enterprise_type"] == "micro"
    assert d["concession_eligible"] is True
    assert len(d["stages"]) == 10
    print(f"  [PASS] POST /api/certification/navigate -> Roadmap with 10 stages & MSME relief")

    # 8. Standards search
    r = client.post("/api/standards/search", json={"query": "cement", "top_k": 5})
    assert r.status_code == 200
    d = r.json()
    assert d["total"] > 0
    assert len(d["results"]) > 0
    print(f"  [PASS] POST /api/standards/search -> {d['total']} standards returned")

    # 9. Standards recommend
    r = client.post("/api/standards/recommend", json={"query": "drinking water bottles", "top_k": 3})
    assert r.status_code == 200
    d = r.json()
    assert d["total"] > 0
    assert len(d["results"]) > 0
    print(f"  [PASS] POST /api/standards/recommend -> {d['total']} standards recommended")

    # 10. Source citation lookup
    r = client.get("/api/sources/IS_1489")
    assert r.status_code == 200
    d = r.json()
    assert "PORTLAND POZZOLANA CEMENT" in d["title"].upper()
    print(f"  [PASS] GET /api/sources/IS_1489 -> Verified title: {d['title']}")

    # 11. Live fee calculator
    r = client.get("/api/calculate?standard_code=IS%201489&enterprise_type=micro")
    assert r.status_code == 200
    d = r.json()
    assert d["concession_percent"] == 50
    assert d["total_savings"] > 0
    print(f"  [PASS] GET /api/calculate -> Concession {d['concession_percent']}%, Savings INR {d['total_savings']:,}")

    # 12. Chatbot inquiry with grounding
    r = client.post("/api/chatbot", json={"message": "Which BIS standard applies to Portland Pozzolana Cement?"})
    assert r.status_code == 200
    d = r.json()
    assert "answer" in d
    assert "IS 1489" in d["answer"]
    print(f"  [PASS] POST /api/chatbot -> Answer correctly grounded in IS 1489")

    # 13. Chatbot Hindi/Hinglish detection
    r = client.post("/api/chatbot", json={"message": "Meri factory me switches bante hain, BIS certification kaise milega?"})
    assert r.status_code == 200
    d = r.json()
    assert d["detected_language"] in ["hi", "hinglish"]
    print(f"  [PASS] POST /api/chatbot (Hinglish) -> Detected language: {d['detected_language']}")

    # 14. Chatbot out-of-domain safe refusal
    r = client.post("/api/chatbot", json={"message": "What is the capital of Australia and how to bake chocolate cake?"})
    assert r.status_code == 200
    d = r.json()
    assert d["is_refusal"] is True
    print(f"  [PASS] POST /api/chatbot (Out-of-domain) -> Safe refusal triggered: {d['answer'][:60]}...")

def test_dataset_and_retrieval():
    print("\n--- 3. Testing Prototype Dataset Integrity & Retrieval Precision ---")
    import json
    with open(PROJECT_ROOT / "data" / "processed_data.json", "r", encoding="utf-8") as f:
        data = json.load(f)
    assert len(data) == 572, f"Expected exactly 572 standards, got {len(data)}"
    print(f"  [PASS] Dataset count verified: exactly 572 indexed standards")

    # Test key retrieval queries
    test_cases = [
        ("pressure cooker", "IS 2347"),
        ("switches", "IS 3854"),
        ("stainless steel water bottle", "IS 17526"),
        ("gold hallmark", "IS 1417"),
        ("portland pozzolana cement", "IS 1489"),
    ]
    for query, expected_code in test_cases:
        r = client.post("/api/standards/search", json={"query": query, "top_k": 3})
        assert r.status_code == 200
        res = r.json()
        codes = [item["is_number"].upper() for item in res["results"]]
        assert any(expected_code in c for c in codes), f"Query '{query}' failed to retrieve {expected_code}. Got: {codes}"
        print(f"  [PASS] Retrieval for '{query}' successfully matched {expected_code}")

def test_prototype_honesty_and_branding():
    print("\n--- 4. Testing Honesty Disclaimers and SIH Prototype Identity ---")
    r = client.get("/")
    assert r.status_code == 200
    html = r.text
    assert "SIH26107" in html
    assert "not an official BIS or Government of India portal" in html
    assert "572" in html
    assert "21,000+" in html
    print("  [PASS] Homepage correctly presents SIH26107 Prototype identity & 572 vs 21,000+ distinction")

    # Verify Safe Refusal exact message
    r = client.post("/api/chatbot", json={"message": "What is the capital of Australia and how to bake chocolate cake?"})
    assert r.status_code == 200
    d = r.json()
    assert d["is_refusal"] is True
    assert "I could not find sufficient authoritative information in the current ManakSetu knowledge base for this query." in d["answer"]
    print("  [PASS] Chatbot returns exact authoritative safe-refusal string when query is out-of-domain")

if __name__ == "__main__":
    test_html_pages()
    test_rest_api_endpoints()
    test_dataset_and_retrieval()
    test_prototype_honesty_and_branding()
    print("\n=======================================================")
    print("  ALL 48 AUTOMATED SYSTEM VERIFICATIONS PASSED 100%!   ")
    print("=======================================================")

