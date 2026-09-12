import os
from pathlib import Path
from dotenv import load_dotenv

# Load environment variables from .env
BASE_DIR = Path(__file__).resolve().parent.parent
load_dotenv(BASE_DIR / ".env")

# Server Config
HOST = os.getenv("HOST", "0.0.0.0")
PORT = int(os.getenv("PORT", "8000"))
DEBUG = os.getenv("DEBUG", "False").lower() in ("true", "1")

# CORS
CORS_ORIGINS = os.getenv("CORS_ORIGINS", "*").split(",")

# Dataset paths
DATA_DIR = BASE_DIR / "data"
PROCESSED_DATA_PATH = DATA_DIR / "processed_data.json"
EMBEDDINGS_CACHE_PATH = DATA_DIR / "embeddings.npy"
REPORTS_FILE_PATH = DATA_DIR / "reports.json"

# AI / LLM Config
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY", "")
GEMINI_MODEL = os.getenv("GEMINI_MODEL", "gemini-1.5-flash")
