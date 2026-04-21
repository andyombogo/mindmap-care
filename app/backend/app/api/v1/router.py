from fastapi import APIRouter

from app.api.v1.endpoints import dashboard, explainability, health, risk, screenings

api_router = APIRouter()
api_router.include_router(health.router)
api_router.include_router(screenings.router, prefix="/screenings")
api_router.include_router(risk.router, prefix="/risk")
api_router.include_router(explainability.router, prefix="/explainability")
api_router.include_router(dashboard.router, prefix="/dashboard")
