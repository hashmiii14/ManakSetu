"""
Database Models and Schema Definitions for PostgreSQL / SQLite
"""

from datetime import datetime
from typing import Optional
from dataclasses import dataclass, asdict


@dataclass
class ReportRecord:
    id: str
    identifier: str
    category: str
    description: str
    contact: str = ""
    location: str = ""
    status: str = "SUBMITTED_FOR_SCRUTINY"
    created_at: str = ""

    def to_dict(self):
        return asdict(self)


@dataclass
class VerificationLogRecord:
    identifier: str
    id_type: str
    is_valid: bool
    status: str
    created_at: str = ""

    def to_dict(self):
        return asdict(self)


CREATE_REPORTS_TABLE_SQL = """
CREATE TABLE IF NOT EXISTS reports (
    id VARCHAR(64) PRIMARY KEY,
    identifier VARCHAR(255) NOT NULL,
    category VARCHAR(128) NOT NULL,
    description TEXT NOT NULL,
    contact VARCHAR(255),
    location VARCHAR(255),
    status VARCHAR(64) DEFAULT 'SUBMITTED_FOR_SCRUTINY',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
"""

CREATE_VERIFICATION_LOGS_TABLE_SQL = """
CREATE TABLE IF NOT EXISTS verification_logs (
    id SERIAL PRIMARY KEY,
    identifier VARCHAR(255) NOT NULL,
    id_type VARCHAR(64) NOT NULL,
    is_valid BOOLEAN DEFAULT FALSE,
    status VARCHAR(64),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
"""
