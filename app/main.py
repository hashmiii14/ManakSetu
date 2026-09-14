from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from .config import CORS_ORIGINS, STATIC_DIR, DEBUG
from .services.bis_retriever import get_retriever
from .database.connection import init_db
from .routes import (
    pages_router,
    search_router,
    standards_router,
    chatbot_router,
    calculator_router,
    verifier_router,
    reports_router,
    compliance_router,
    labs_router,
    hallmarking_router,
    certification_router,
    sources_router,
)


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Pre-warm retriever and database at startup
    print("[ManakSetu] Initializing BIS Standards Index & Knowledge Cache...")
    try:
        retriever = get_retriever()
        print(f"[ManakSetu] Successfully indexed {len(retriever.documents)} standards.")
    except Exception as e:
        print(f"[ManakSetu] Retriever pre-warm notice: {e}")

    try:
        init_db()
    except Exception as e:
        print(f"[ManakSetu] Database initialization notice: {e}")

    yield
    print("[ManakSetu] Portal service shutdown complete.")


app = FastAPI(
    title="ManaKSetu — BIS Digital Standards & Certification Portal",
    version="2.0.0",
    description="Smart India Hackathon 2026 Portal providing intelligent access to Indian Standards and BIS services.",
    docs_url="/api/docs",
    redoc_url="/api/redoc",
    openapi_url="/api/openapi.json",
    lifespan=lifespan,
    debug=DEBUG
)

# Configure CORS for external, local dev, and Vercel preview environments
ALLOWED_ORIGINS = [
    "https://manaksetu.vercel.app",
    "http://localhost:3000",
    "http://localhost:5173",
    "http://localhost:8000",
    "http://127.0.0.1:3000",
    "http://127.0.0.1:5173",
    "http://127.0.0.1:8000",
]
for origin in CORS_ORIGINS:
    cleaned = origin.strip()
    if cleaned and cleaned != "*" and cleaned not in ALLOWED_ORIGINS:
        ALLOWED_ORIGINS.append(cleaned)

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_origin_regex=r"https://.*\.vercel\.app",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount static directory for CSS, JS, Images, Icons
STATIC_DIR.mkdir(parents=True, exist_ok=True)
app.mount("/static", StaticFiles(directory=str(STATIC_DIR)), name="static")

# Register server-rendered HTML pages router (mounts at root)
app.include_router(pages_router)

# Register JSON API sub-routers
app.include_router(search_router)
app.include_router(standards_router)
app.include_router(chatbot_router)
app.include_router(calculator_router)
app.include_router(verifier_router)
app.include_router(reports_router)
app.include_router(compliance_router)
app.include_router(labs_router)
app.include_router(hallmarking_router)
app.include_router(certification_router)
app.include_router(sources_router)


@app.get("/health", tags=["Health"])
def health():
    return {
        "status": "ok",
        "service": "ManakSetu API"
    }


@app.get("/api/health", tags=["Health"])
def health_check():
    retriever = get_retriever()
    return {
        "status": "ok",
        "service": "ManakSetu API",
        "version": "2.0.0",
        "standards_indexed": len(retriever.documents) if retriever else 0,
        "docs": "/api/docs"
    }


# Direct alias endpoints for Phase 3 API specification
from .models.schemas import RecommendationRequest, SearchResponse, VerificationRequest, VerificationResponse, CostEstimateRequest, CostEstimateResponse

@app.post("/api/matcher", response_model=SearchResponse, tags=["Standards API"])
def api_matcher(req: RecommendationRequest):
    from .routes.standards import recommend_standards
    return recommend_standards(req)


@app.get("/api/qco", tags=["QCO API"])
def api_qco():
    from .routes.standards import get_qco_standards
    return get_qco_standards()


@app.post("/api/hallmark/verify", tags=["Hallmarking API"])
def api_hallmark_verify(req: VerificationRequest):
    from .services.hallmarking_service import get_hallmarking_service
    service = get_hallmarking_service()
    return service.verify_huid(req.get_identifier())


@app.post("/api/isi/verify", response_model=VerificationResponse, tags=["Verification API"])
def api_isi_verify(req: VerificationRequest):
    from .routes.verifier import verify_post
    req.id_type = "cml"
    return verify_post(req)


@app.post("/api/fees/calculate", response_model=CostEstimateResponse, tags=["Calculator API"])
def api_fees_calculate(req: CostEstimateRequest):
    from .routes.calculator import calculate_cost_post
    return calculate_cost_post(req)
