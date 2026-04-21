from fastapi import APIRouter

router = APIRouter(tags=["health"])


@router.get("/health")
def health_check() -> dict[str, str]:
    """Lightweight readiness endpoint for Docker, deploys, and uptime checks."""
    return {
        "status": "ok",
        "service": "mindmap-care-backend",
    }
