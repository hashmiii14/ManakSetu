import sys
from pathlib import Path

# Add root and backend directories to sys.path so app modules are resolvable
root_dir = Path(__file__).resolve().parent.parent
backend_dir = root_dir / "backend"

if str(root_dir) not in sys.path:
    sys.path.insert(0, str(root_dir))
if str(backend_dir) not in sys.path:
    sys.path.insert(0, str(backend_dir))

try:
    from app.main import app
except ImportError:
    from backend.app.main import app
