import re
import uuid
from datetime import datetime
from typing import Any, Optional


def format_inr(amount: float | int) -> str:
    """
    Format numeric value into Indian Rupee string (e.g. ₹92,500).
    """
    try:
        val = int(round(float(amount)))
        is_negative = val < 0
        val = abs(val)
        s = str(val)
        if len(s) <= 3:
            res = s
        else:
            last3 = s[-3:]
            rest = s[:-3]
            groups = []
            while len(rest) > 2:
                groups.insert(0, rest[-2:])
                rest = rest[:-2]
            if rest:
                groups.insert(0, rest)
            res = ",".join(groups) + "," + last3
        return f"-₹{res}" if is_negative else f"₹{res}"
    except (ValueError, TypeError):
        return f"₹{amount}"


def generate_report_id() -> str:
    """
    Generate an official statutory report tracking identifier.
    Format: REP-YYYYMMDD-XXXXXX
    """
    date_part = datetime.now().strftime("%Y%m%d")
    unique_part = uuid.uuid4().hex[:6].upper()
    return f"REP-{date_part}-{unique_part}"


def normalize_is_code(code: str) -> str:
    """
    Normalize standard code for lookups:
    'IS 1489 (Part 1): 2015' -> 'is1489part12015'
    """
    if not code:
        return ""
    return re.sub(r"[^a-zA-Z0-9]", "", code).lower()


def truncate_text(text: Optional[str], max_len: int = 140) -> str:
    """
    Truncate text to max_len with ellipsis.
    """
    if not text:
        return ""
    text = text.strip()
    if len(text) <= max_len:
        return text
    return text[: max_len - 3].rstrip() + "..."
