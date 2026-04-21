from pydantic import BaseModel


class HealthResponse(BaseModel):
    """Health response shared by root and versioned endpoints."""

    status: str
    service: str
    environment: str
    version: str
