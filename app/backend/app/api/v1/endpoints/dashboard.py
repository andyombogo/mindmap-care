from fastapi import APIRouter

from app.schemas.dashboard import DashboardSummary

router = APIRouter(tags=["dashboard"])


@router.get("/summary", response_model=DashboardSummary)
def get_dashboard_summary() -> DashboardSummary:
    """Return a placeholder operations summary until persistence is added."""
    return DashboardSummary(
        total_screenings=0,
        high_risk_cases=0,
        urgent_referrals=0,
        pending_follow_ups=0,
        completed_referrals=0,
        risk_distribution={
            "low": 0,
            "moderate": 0,
            "high": 0,
            "urgent": 0,
        },
    )
