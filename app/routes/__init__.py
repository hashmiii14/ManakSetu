"""
FastAPI Routes for ManakSetu
"""

from .pages import router as pages_router
from .search import router as search_router
from .standards import router as standards_router
from .chatbot import router as chatbot_router
from .calculator import router as calculator_router
from .verifier import router as verifier_router
from .reports import router as reports_router
from .compliance import router as compliance_router
from .labs import router as labs_router
from .hallmarking import router as hallmarking_router
from .certification import router as certification_router
from .sources import router as sources_router

__all__ = [
    "pages_router",
    "search_router",
    "standards_router",
    "chatbot_router",
    "calculator_router",
    "verifier_router",
    "reports_router",
    "compliance_router",
    "labs_router",
    "hallmarking_router",
    "certification_router",
    "sources_router",
]
