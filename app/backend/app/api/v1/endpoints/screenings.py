from fastapi import APIRouter, HTTPException, status

from app.schemas.screening import (
    PatientRiskSummaryResponse,
    ScreeningSubmission,
    ScreeningSubmissionResponse,
    TriageQueueItem,
)
from app.services.demo_store import (
    get_latest_risk_summary,
    get_risk_summary,
    get_triage_queue,
    submit_screening_for_mock_inference,
)

router = APIRouter(tags=["screenings"])


@router.post("", response_model=ScreeningSubmissionResponse, status_code=status.HTTP_202_ACCEPTED)
def submit_screening(payload: ScreeningSubmission) -> ScreeningSubmissionResponse:
    """Accept a screening submission and return mock risk scoring context."""
    return submit_screening_for_mock_inference(payload)


@router.get("/risk-summary/latest", response_model=PatientRiskSummaryResponse)
def latest_risk_summary() -> PatientRiskSummaryResponse:
    """Return the latest submitted mock risk summary for demo workflows."""
    summary = get_latest_risk_summary()
    if summary is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="No screening summaries yet.")
    return summary


@router.get("/triage-queue", response_model=list[TriageQueueItem])
def triage_queue() -> list[TriageQueueItem]:
    """Return prioritized screening results for clinician review."""
    return get_triage_queue()


@router.get("/{screening_id}/risk-summary", response_model=PatientRiskSummaryResponse)
def patient_risk_summary(screening_id: str) -> PatientRiskSummaryResponse:
    """Return a patient risk summary for one screening record."""
    summary = get_risk_summary(screening_id)
    if summary is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Risk summary not found.")
    return summary
