from pydantic import BaseModel, Field


class MissingFieldSummary(BaseModel):
    """Count of one missing data field across submitted screenings."""

    field: str = Field(min_length=1)
    count: int = Field(ge=0)


class DashboardSummary(BaseModel):
    """Operational dashboard totals for screening and referral workflows."""

    total_screenings: int = Field(ge=0)
    high_risk_cases: int = Field(ge=0)
    medium_risk_cases: int = Field(ge=0)
    low_risk_cases: int = Field(ge=0)
    urgent_referrals: int = Field(ge=0)
    pending_follow_ups: int = Field(ge=0)
    completed_referrals: int = Field(ge=0)
    risk_distribution: dict[str, int]
    average_data_quality_score: float = Field(default=0, ge=0, le=1)
    data_complete_records: int = Field(default=0, ge=0)
    records_with_missing_data: int = Field(default=0, ge=0)
    most_common_missing_fields: list[MissingFieldSummary] = Field(default_factory=list)
