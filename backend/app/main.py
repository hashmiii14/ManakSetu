from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager

from .config import CORS_ORIGINS
from .services.retriever import get_retriever
from .routes import (
    search,
    standards,
    chatbot,
    verification,
    reports,
    calculator
)


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Pre-warm retriever cache at server startup
    print("[ManaKSetu API] Initializing BIS Standards Retriever singleton...")
    try:
        retriever = get_retriever()
        print(f"[ManaKSetu API] Successfully indexed {len(retriever.documents)} BIS standards.")
    except Exception as e:
        print(f"[ManaKSetu API] Warning: Retriever initialization error: {e}")
    yield
    print("[ManaKSetu API] Shutting down.")


app = FastAPI(
    title="ManaKSetu BIS Standards Engine API",
    version="1.0.0",
    description="SIH-ready API powering the ManaKSetu platform with hybrid retrieval from BIS standards compendium.",
    docs_url="/api/docs",
    redoc_url="/api/redoc",
    openapi_url="/api/openapi.json",
    lifespan=lifespan
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"] if "*" in CORS_ORIGINS else CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register sub-routers
app.include_router(search.router)
app.include_router(standards.router)
app.include_router(chatbot.router)
app.include_router(verification.router)
app.include_router(reports.router)
app.include_router(calculator.router)


from fastapi.responses import RedirectResponse

@app.get("/", tags=["Health"])
@app.get("/api", tags=["Health"])
@app.get("/api/health", tags=["Health"])
def health_check():
    retriever = get_retriever()
    return {
        "status": "healthy",
        "service": "ManaKSetu BIS Standards Recommendation Engine API",
        "version": "1.0.0",
        "standards_indexed": len(retriever.documents) if retriever else 0,
        "docs": "/api/docs",
        "endpoints": {
            "search": "/api/search?q=immersion+geyser",
            "standards": "/api/standards",
            "calculate": "/api/calculate",
            "verify": "/api/verify",
            "chatbot": "/api/chatbot",
            "report": "/api/report"
        }
    }

