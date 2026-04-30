from typing import Any

from pydantic import BaseModel, Field


class ErrorEnvelope(BaseModel):
    """Consistent API error shape returned by exception handlers."""

    code: str = Field(min_length=1)
    message: str = Field(min_length=1)
    request_id: str = Field(min_length=1)
    details: list[dict[str, Any]] | None = None


class ErrorResponse(BaseModel):
    """Top-level structured error response."""

    error: ErrorEnvelope
