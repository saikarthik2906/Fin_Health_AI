import os
from cryptography.fernet import Fernet
from dotenv import load_dotenv
import base64
import hashlib

load_dotenv()

def _get_fernet():
    """
    Generate a Fernet key from ENCRYPTION_KEY
    """
    secret = os.getenv("ENCRYPTION_KEY")
    if not secret:
        raise ValueError("ENCRYPTION_KEY not set in .env")

    # Derive a 32-byte key
    key = hashlib.sha256(secret.encode()).digest()
    return Fernet(base64.urlsafe_b64encode(key))


def encrypt_value(value: str) -> str:
    fernet = _get_fernet()
    return fernet.encrypt(value.encode()).decode()


def decrypt_value(token: str) -> str:
    fernet = _get_fernet()
    return fernet.decrypt(token.encode()).decode()
