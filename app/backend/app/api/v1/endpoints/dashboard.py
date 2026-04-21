from fastapi import APIRouter

from app.schemas.dashboard import DashboardSummary
from app.services.demo_store import get_dashboard_summary as get_demo_dashboard_summary

router = APIRouter(tags=["dashboard"])


@router.get("/summary", response_model=DashboardSummary)
def get_dashboard_summary() -> DashboardSummary:
    """Return operational summary derived from in-memory demo screenings."""
    return get_demo_dashboard_summary()
