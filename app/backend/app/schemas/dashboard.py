from pydantic import BaseModel, Field


class DashboardSummary(BaseModel):
    """Operational dashboard totals for screening and referral workflows."""

    total_screenings: int = Field(ge=0)
    high_risk_cases: int = Field(ge=0)
    urgent_referrals: int = Field(ge=0)
    pending_follow_ups: int = Field(ge=0)
    completed_referrals: int = Field(ge=0)
    risk_distribution: dict[str, int]
