import os

from dotenv import load_dotenv

load_dotenv()

GROQ_API_KEY: str | None = os.getenv("GROQ_API_KEY")
GROQ_API_URL: str = "https://api.groq.com/openai/v1/chat/completions"
GROQ_MODEL: str = os.getenv("GROQ_MODEL", "llama-3.3-70b-versatile")

ALLOWED_ORIGINS: list[str] = [
    origin.strip()
    for origin in os.getenv("ALLOWED_ORIGINS", "").split(",")
    if origin.strip()
]