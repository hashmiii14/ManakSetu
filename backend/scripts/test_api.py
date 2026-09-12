import sys
from pathlib import Path

# Add backend to path
sys.path.insert(0, str(Path(__file__).resolve().parents[1]))

from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

print("--- 1. Testing Health Endpoint ---")
r = client.get("/api/health")
print("Status:", r.status_code, r.json())
assert r.status_code == 200
assert r.json()["standards_indexed"] > 500

print("\n--- 2. Testing Search Endpoint ('immersion geyser') ---")
r = client.get("/api/search?q=immersion+geyser&top_k=3")
print("Status:", r.status_code)
data = r.json()
print(f"Total results: {data['total']}")
for res in data["results"]:
    print(f"  - [{res['is_number']}] {res['title']} (Score: {res['relevance_score']})")
assert data["total"] > 0
assert "IS 368" in data["results"][0]["is_number"] or "IS 2082" in data["results"][0]["is_number"]

print("\n--- 3. Testing Standards Details Endpoint ---")
r = client.get("/api/standards/IS%20368:%202014")
print("Status:", r.status_code)
std = r.json()
print("Title:", std["title"])
print("Key Tests:", len(std["key_tests"]))
print("Labs:", len(std["labs_available"]))
assert r.status_code == 200

print("\n--- 4. Testing Cost Estimator Endpoint ---")
r = client.post("/api/calculate", json={"standard_code": "IS 368: 2014", "enterprise_type": "micro"})
print("Status:", r.status_code)
calc = r.json()
print(f"Base: Rs.{calc['base_marking_fee']}, Concession: {calc['concession_percent']}%, Effective: Rs.{calc['effective_marking_fee']}, Total: Rs.{calc['total_estimated_cost']}")
assert r.status_code == 200
assert calc["concession_percent"] == 50

print("\n--- 5. Testing Verification Endpoint (HUID & CML) ---")
r_huid = client.post("/api/verify", json={"identifier": "AK79B2", "id_type": "huid"})
print("HUID Status:", r_huid.status_code, r_huid.json()["status"])
assert r_huid.json()["is_valid"] is True

r_cml = client.post("/api/verify", json={"identifier": "8400192", "id_type": "cml"})
print("CML Status:", r_cml.status_code, r_cml.json()["status"])
assert r_cml.json()["is_valid"] is True

print("\n--- 6. Testing Report Endpoint ---")
r_rep = client.post("/api/report", json={
    "identifier": "CM/L-8400192",
    "category": "Suspected Counterfeit ISI Mark",
    "description": "Geyser sold in local market without valid manufacturer details.",
    "contact": "tester@example.com"
})
print("Report Status:", r_rep.status_code, r_rep.json())
assert r_rep.status_code == 200
assert "REP-" in r_rep.json()["id"]

print("\n--- 7. Testing Chatbot Endpoint (ManakBot) ---")
r_bot = client.post("/api/chatbot", json={"message": "Which Indian Standard applies to electric storage geysers?"})
print("Bot Status:", r_bot.status_code)
bot_res = r_bot.json()
print("Bot Referenced Standards:", [s["is_number"] for s in bot_res["referenced_standards"]])
print("Bot Source:", bot_res["source"])
print("Bot Answer preview:\n", bot_res["answer"][:200], "...")
assert r_bot.status_code == 200

print("\n>>> ALL BACKEND API TESTS PASSED PERFECTLY! <<<")
