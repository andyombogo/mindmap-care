from typing import Literal

from pydantic import BaseModel, Field

RiskLevel = Literal["low", "moderate", "high", "urgent"]


class ExplanationFactor(BaseModel):
    """A factor that contributed to a risk result."""

    name: str = Field(min_length=1)
    description: str = Field(min_length=1)
    direction: Literal["increases_risk", "decreases_risk", "contextual"]
    weight: float = Field(ge=0, le=1)


class ExplanationRequest(BaseModel):
    """Request for a plain-language explanation of a risk result."""

    risk_score_id: str | None = None
    risk_level: RiskLevel
    contributing_factors: list[ExplanationFactor] = Field(default_factory=list)
    language: str = "en"


class ExplanationResponse(BaseModel):
    """Plain-language explanation for frontline review."""

    risk_level: RiskLevel
    summary: str
    contributing_factors: list[ExplanationFactor]
    caveats: list[str]
    recommended_review: str
