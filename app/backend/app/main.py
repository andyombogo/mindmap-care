from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.v1.router import api_router
from app.core.config import get_settings
from app.core.logging import configure_logging
from app.schemas.health import HealthResponse
from app.services.demo_store import seed_demo_store_from_synthetic


def create_app() -> FastAPI:
    """Create the FastAPI application."""
    settings = get_settings()
    configure_logging(settings.log_level)

    app = FastAPI(
        title=settings.app_name,
        version=settings.app_version,
        description=(
            "Explainable AI screening and triage API for mental health, "
            "cognitive, and functional risk stratification."
        ),
    )

    app.add_middleware(
        CORSMiddleware,
        allow_origins=settings.cors_origins,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    @app.get("/health", response_model=HealthResponse, tags=["health"])
    def health_check() -> HealthResponse:
        """Unversioned health check for containers and uptime monitors."""
        return HealthResponse(
            status="ok",
            service=settings.service_name,
            environment=settings.environment,
            version=settings.app_version,
        )

    app.include_router(api_router, prefix=settings.api_v1_prefix)

    if settings.seed_demo_data:
        seed_demo_store_from_synthetic(settings.demo_data_path)

    return app


app = create_app()
