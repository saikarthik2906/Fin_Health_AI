import psycopg2
import os
from dotenv import load_dotenv
from security import encrypt_value

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")

def get_connection():
    if not DATABASE_URL:
        raise ValueError("DATABASE_URL not set in .env")
    return psycopg2.connect(DATABASE_URL)


def init_db():
    """
    Create table if it doesn't exist
    """
    conn = get_connection()
    cur = conn.cursor()

    cur.execute("""
        CREATE TABLE IF NOT EXISTS financial_reports (
            id SERIAL PRIMARY KEY,
            business_name TEXT NOT NULL,
            score INTEGER,
            risk_level TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
    """)

    conn.commit()
    cur.close()
    conn.close()


def save_report(business_name: str, score: int, risk_level: str):
    """
    Save encrypted business name and result
    """
    conn = get_connection()
    cur = conn.cursor()

    encrypted_name = encrypt_value(business_name)

    cur.execute("""
        INSERT INTO financial_reports (business_name, score, risk_level)
        VALUES (%s, %s, %s);
    """, (encrypted_name, score, risk_level))

    conn.commit()
    cur.close()
    conn.close()
