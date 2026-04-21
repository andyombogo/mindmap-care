from functools import lru_cache

from pydantic import Field
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """Runtime settings loaded from environment variables."""

    app_name: str = "MindMap Care API"
    app_version: str = "0.1.0"
    service_name: str = "mindmap-care-backend"
    environment: str = "local"
    api_v1_prefix: str = "/api/v1"
    cors_allow_origins: str = "http://localhost:3000"
    log_level: str = "INFO"
    request_timeout_seconds: int = Field(default=30, ge=1)

    model_config = SettingsConfigDict(
        env_file=".env",
        env_prefix="MINDMAP_",
        extra="ignore",
    )

    @property
    def cors_origins(self) -> list[str]:
        """Return CORS origins as a clean list for FastAPI middleware."""
        origins = [
            origin.strip()
            for origin in self.cors_allow_origins.split(",")
            if origin.strip()
        ]
        return origins or ["http://localhost:3000"]


@lru_cache
def get_settings() -> Settings:
    """Return cached settings for dependency injection and app setup."""
    return Settings()
