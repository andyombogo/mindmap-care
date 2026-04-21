from typing import Literal

from pydantic import BaseModel, Field

RiskLevel = Literal["low", "moderate", "high", "urgent"]


class RiskScoreRequest(BaseModel):
    """Input payload for placeholder risk stratification."""

    screening_id: str | None = None
    age_years: int | None = Field(default=None, ge=0, le=120)
    domain_scores: dict[str, float] = Field(
        default_factory=dict,
        description="Scores keyed by domain, for example depression, cognition, or function.",
    )
    safety_flags: list[str] = Field(
        default_factory=list,
        description="Human-readable flags such as suicidal_ideation or severe_impairment.",
    )


class RiskScoreResponse(BaseModel):
    """Risk scoring output for triage and explanation workflows."""

    risk_score_id: str
    screening_id: str | None
    risk_level: RiskLevel
    score: float = Field(ge=0, le=100)
    recommended_action: str
    explanation_url: str
    model_version: str
    requires_human_review: bool
