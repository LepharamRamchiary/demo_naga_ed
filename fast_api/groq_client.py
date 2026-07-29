import json
import logging

import httpx

from config import GROQ_API_KEY, GROQ_API_URL, GROQ_MODEL

logger = logging.getLogger("uvicorn.error")


class GroqAPIError(Exception):
    """Raised when the Groq API call fails or returns an unusable response."""


def _build_prompt(interests: list[str]) -> list[dict]:
    interests_str = ", ".join(interests)

    system_prompt = (
        "You are a creative username generator. Given a list of a user's "
        "interests, you invent short, catchy, memorable usernames suitable "
        "for a social or gaming platform. Rules:\n"
        "1. Generate exactly 3 usernames.\n"
        "2. Each username must be unique (no duplicates or near-duplicates).\n"
        "3. Each username must be 3-20 characters, alphanumeric only "
        "(letters, numbers, no spaces, underscores allowed sparingly).\n"
        "4. Usernames should creatively combine or reference the given "
        "interests — avoid generic words like 'user' or 'player123'.\n"
        "5. Respond with ONLY a JSON object in this exact shape, no extra "
        'text, no markdown fences: {"suggestions": ["name1", "name2", "name3"]}'
    )

    user_prompt = f"Interests: {interests_str}"

    return [
        {"role": "system", "content": system_prompt},
        {"role": "user", "content": user_prompt},
    ]


async def generate_username_suggestions(interests: list[str]) -> list[str]:
    """
    Calls the Groq chat completions API and returns 3 username suggestions.
    Raises GroqAPIError on any failure (network, auth, malformed response).
    """
    if not GROQ_API_KEY:
        raise GroqAPIError(
            "GROQ_API_KEY is not configured on the server. "
            "Set it as an environment variable."
        )

    payload = {
        "model": GROQ_MODEL,
        "messages": _build_prompt(interests),
        "temperature": 0.9,
        "max_tokens": 200,
        "response_format": {"type": "json_object"},
    }

    headers = {
        "Authorization": f"Bearer {GROQ_API_KEY}",
        "Content-Type": "application/json",
    }

    try:
        async with httpx.AsyncClient(timeout=15.0) as client:
            response = await client.post(GROQ_API_URL, json=payload, headers=headers)
    except httpx.TimeoutException as exc:
        raise GroqAPIError("Groq API request timed out.") from exc
    except httpx.RequestError as exc:
        raise GroqAPIError(f"Failed to reach Groq API: {exc}") from exc

    if response.status_code == 401:
        raise GroqAPIError("Groq API rejected the request: invalid API key.")
    if response.status_code == 429:
        raise GroqAPIError("Groq API rate limit exceeded. Try again shortly.")
    if response.status_code >= 400:
        logger.error("Groq API error %s: %s", response.status_code, response.text)
        raise GroqAPIError(f"Groq API returned an error ({response.status_code}).")

    try:
        data = response.json()
        content = data["choices"][0]["message"]["content"]
    except (KeyError, IndexError, json.JSONDecodeError) as exc:
        raise GroqAPIError("Unexpected response shape from Groq API.") from exc

    try:
        parsed = json.loads(content)
        suggestions = parsed["suggestions"]
    except (json.JSONDecodeError, KeyError, TypeError) as exc:
        raise GroqAPIError("Groq API returned content that was not valid JSON.") from exc

    if not isinstance(suggestions, list) or not all(
        isinstance(s, str) and s.strip() for s in suggestions
    ):
        raise GroqAPIError("Groq API returned malformed username suggestions.")

    # De-duplicate while preserving order, then trim/pad to exactly 3
    seen = set()
    unique_suggestions = []
    for s in suggestions:
        cleaned = s.strip()
        if cleaned.lower() not in seen:
            seen.add(cleaned.lower())
            unique_suggestions.append(cleaned)

    if len(unique_suggestions) < 3:
        raise GroqAPIError("Groq API did not return 3 unique usernames.")

    return unique_suggestions[:3]