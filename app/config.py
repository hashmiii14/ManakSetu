import os
from pathlib import Path
from dotenv import load_dotenv

# Root Directory of the repository
BASE_DIR = Path(__file__).resolve().parent.parent

# Load .env if present
load_dotenv(BASE_DIR / ".env")

# Server Config
HOST = os.getenv("HOST", "0.0.0.0")
PORT = int(os.getenv("PORT", "8000"))
DEBUG = os.getenv("DEBUG", "False").lower() in ("true", "1")

# Asset & Template directories
TEMPLATES_DIR = BASE_DIR / "templates"
STATIC_DIR = BASE_DIR / "static"
DATA_DIR = BASE_DIR / "data"

PROCESSED_DATA_PATH = DATA_DIR / "processed_data.json"
EMBEDDINGS_CACHE_PATH = DATA_DIR / "embeddings.npy"

# Storage paths
IS_VERCEL = bool(os.getenv("VERCEL"))
REPORTS_FILE_PATH = Path("/tmp/reports.json") if IS_VERCEL else (DATA_DIR / "reports.json")
SQLITE_DB_PATH = Path("/tmp/manaksetu.db") if IS_VERCEL else (DATA_DIR / "manaksetu.db")

# PostgreSQL Database URL
DATABASE_URL = os.getenv("DATABASE_URL", "")

# AI / LLM Config
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY", "")
GEMINI_MODEL = os.getenv("GEMINI_MODEL", "gemini-1.5-flash")

# CORS Origins
CORS_ORIGINS = os.getenv("CORS_ORIGINS", "*").split(",")
