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
    """Acknowledgement returned after a screening submission."""

    screening_id: str
    status: Literal["accepted"]
    received_items: int = Field(ge=0)
    next_steps: list[str]
