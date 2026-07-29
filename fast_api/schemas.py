from pydantic import BaseModel, Field, field_validator


class UsernameSuggestionRequest(BaseModel):
    """Request body for POST /api/suggest-username"""

    interests: list[str] = Field(
        ...,
        min_length=1,
        max_length=10,
        description="List of user interests/hobbies used to generate username ideas.",
        examples=[["gaming", "anime", "cooking"]],
    )

    @field_validator("interests")
    @classmethod
    def interests_must_be_non_empty_strings(cls, value: list[str]) -> list[str]:
        cleaned = [v.strip() for v in value if isinstance(v, str) and v.strip()]
        if not cleaned:
            raise ValueError("interests must contain at least one non-empty string")
        return cleaned


class UsernameSuggestionResponse(BaseModel):
    """Response body for POST /api/suggest-username"""

    suggestions: list[str] = Field(
        ...,
        description="Three unique, creative username suggestions.",
        examples=[["PixelRamen42", "AnimeChefKazu", "QuestAndTaste"]],
    )


class ErrorResponse(BaseModel):
    """Standard error shape returned on failure."""

    success: bool = False
    message: str