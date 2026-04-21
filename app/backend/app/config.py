from functools import lru_cache
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """Backend runtime settings loaded from environment variables."""

    app_name: str = "MindMap Care API"
    environment: str = "local"
    cors_allow_origins: str = "http://localhost:3000"

    model_config = SettingsConfigDict(
        env_file=".env",
        env_prefix="MINDMAP_",
        extra="ignore",
    )


@lru_cache
def get_settings() -> Settings:
    return Settings()
