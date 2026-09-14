"""
Database Connection Manager
Supports PostgreSQL when DATABASE_URL is configured, with safe fallback to SQLite.
"""

import sqlite3
import os
from typing import Any, Optional
from ..config import DATABASE_URL, SQLITE_DB_PATH
from ..models.database_models import CREATE_REPORTS_TABLE_SQL, CREATE_VERIFICATION_LOGS_TABLE_SQL


class DatabaseConnectionManager:
    def __init__(self):
        self.is_postgres = False
        self._pg_conn = None
        self._initialized = False

    def init_db(self):
        if self._initialized:
            return

        # Attempt PostgreSQL connection if DATABASE_URL is provided
        if DATABASE_URL and (DATABASE_URL.startswith("postgres://") or DATABASE_URL.startswith("postgresql://")):
            try:
                import psycopg2
                # Convert postgres:// to postgresql:// for psycopg2 if needed
                pg_url = DATABASE_URL
                if pg_url.startswith("postgres://"):
                    pg_url = "postgresql://" + pg_url[11:]
                
                conn = psycopg2.connect(pg_url)
                with conn.cursor() as cur:
                    cur.execute(CREATE_REPORTS_TABLE_SQL)
                    cur.execute(CREATE_VERIFICATION_LOGS_TABLE_SQL)
                conn.commit()
                conn.close()
                self.is_postgres = True
                print("[Database] Successfully connected to PostgreSQL and initialized statutory tables.")
                self._initialized = True
                return
            except Exception as e:
                print(f"[Database] PostgreSQL connection notice ({e}). Falling back to local SQLite engine.")

        # Fallback to SQLite
        try:
            SQLITE_DB_PATH.parent.mkdir(parents=True, exist_ok=True)
            conn = sqlite3.connect(str(SQLITE_DB_PATH))
            cur = conn.cursor()
            
            # SQLite-compatible schemas
            sqlite_reports_sql = """
            CREATE TABLE IF NOT EXISTS reports (
                id TEXT PRIMARY KEY,
                identifier TEXT NOT NULL,
                category TEXT NOT NULL,
                description TEXT NOT NULL,
                contact TEXT,
                location TEXT,
                status TEXT DEFAULT 'SUBMITTED_FOR_SCRUTINY',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
            """
            sqlite_verif_sql = """
            CREATE TABLE IF NOT EXISTS verification_logs (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                identifier TEXT NOT NULL,
                id_type TEXT NOT NULL,
                is_valid INTEGER DEFAULT 0,
                status TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
            """
            cur.execute(sqlite_reports_sql)
            cur.execute(sqlite_verif_sql)
            conn.commit()
            conn.close()
            print(f"[Database] Initialized SQLite local database at {SQLITE_DB_PATH}")
            self._initialized = True
        except Exception as e:
            print(f"[Database] SQLite init error: {e}")

    def get_connection(self):
        """
        Returns a context manager or live database connection.
        """
        if not self._initialized:
            self.init_db()

        if self.is_postgres and DATABASE_URL:
            try:
                import psycopg2
                pg_url = DATABASE_URL
                if pg_url.startswith("postgres://"):
                    pg_url = "postgresql://" + pg_url[11:]
                return psycopg2.connect(pg_url)
            except Exception:
                pass

        # SQLite connection
        SQLITE_DB_PATH.parent.mkdir(parents=True, exist_ok=True)
        return sqlite3.connect(str(SQLITE_DB_PATH))


_db_manager: Optional[DatabaseConnectionManager] = None


def get_db_manager() -> DatabaseConnectionManager:
    global _db_manager
    if _db_manager is None:
        _db_manager = DatabaseConnectionManager()
    return _db_manager


def init_db():
    get_db_manager().init_db()


def get_db_connection():
    return get_db_manager().get_connection()
