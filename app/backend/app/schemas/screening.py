from typing import Literal

from pydantic import BaseModel, Field


class ScreeningResponseItem(BaseModel):
    """Single screening question response."""

    code: str = Field(min_length=1)
    label: str = Field(min_length=1)
    value: str | int | float | bool | None
    domain: str = Field(min_length=1)


class ScreeningSubmission(BaseModel):
    """Patient screening payload submitted by a frontline workflow."""

    patient_reference_id: str | None = None
    site_id: str = Field(min_length=1)
    screener_role: Literal["community_health_worker", "nurse", "clinician", "researcher", "other"]
    age_years: int | None = Field(default=None, ge=0, le=120)
    sex: Literal["female", "male", "intersex", "unknown"] | None = None
    consent_confirmed: bool
    presenting_concerns: list[str] = Field(default_factory=list)
    responses: list[ScreeningResponseItem] = Field(default_factory=list)
    notes: str | None = None


class ScreeningSubmissionResponse(BaseModel):
    """Acknowledgement returned after a screening submission and mock scoring."""

    screening_id: str
    status: Literal["accepted"]
    received_items: int = Field(ge=0)
    next_steps: list[str]
    risk_score_id: str | None = None
    risk_category: Literal["low", "moderate", "high", "urgent"] | None = None
    risk_score: float | None = Field(default=None, ge=0, le=100)
    recommended_action: str | None = None
    risk_summary_url: str | None = None


class RiskSummaryFactor(BaseModel):
    """Contributing factor included in a patient risk summary."""

    name: str
    domain: str
    direction: str
    contribution: float = Field(ge=0, le=1)
    description: str


class PatientRiskSummaryResponse(BaseModel):
    """Patient-level mock risk summary for frontend review screens."""

    screening_id: str
    risk_score_id: str
    patient_reference_id: str | None
    display_id: str
    age_years: int | None
    sex: str
    site_id: str
    screener_role: str
    screened_at: str
    risk_category: Literal["low", "moderate", "high", "urgent"]
    score: float = Field(ge=0, le=100)
    confidence: float = Field(ge=0, le=1)
    recommended_action: str
    requires_human_review: bool
    triage_priority: str
    triage_window: str
    summary: str
    explanation_text: str
    contributing_factors: list[RiskSummaryFactor]
    caveats: list[str]
    model_id: str
    model_version: str
    generated_at: str
    data_quality_score: float = Field(ge=0, le=1)
    missing_fields: list[str]
    report_status: str
