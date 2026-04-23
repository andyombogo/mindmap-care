from fastapi import APIRouter, HTTPException, status

from app.schemas.screening import (
    AuditEventResponse,
    PatientRiskSummaryResponse,
    ScreeningReviewRequest,
    ScreeningReviewResponse,
    ScreeningSubmission,
    ScreeningSubmissionResponse,
    TriageQueueItem,
)
from app.services.demo_store import (
    get_latest_risk_summary,
    get_risk_summary,
    get_triage_queue,
    list_audit_events,
    record_summary_view,
    save_screening_review,
    submit_screening_for_mock_inference,
)

router = APIRouter(tags=["screenings"])


@router.post("", response_model=ScreeningSubmissionResponse, status_code=status.HTTP_202_ACCEPTED)
def submit_screening(payload: ScreeningSubmission) -> ScreeningSubmissionResponse:
    """Accept a screening submission and return mock risk scoring context."""
    return submit_screening_for_mock_inference(payload)


@router.get("/risk-summary/latest", response_model=PatientRiskSummaryResponse)
def latest_risk_summary(actor: str = "api_client") -> PatientRiskSummaryResponse:
    """Return the latest submitted mock risk summary for demo workflows."""
    summary = get_latest_risk_summary()
    if summary is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="No screening summaries yet.")
    record_summary_view(summary.screening_id, actor)
    return summary


@router.get("/triage-queue", response_model=list[TriageQueueItem])
def triage_queue() -> list[TriageQueueItem]:
    """Return prioritized screening results for clinician review."""
    return get_triage_queue()


@router.get("/{screening_id}/risk-summary", response_model=PatientRiskSummaryResponse)
def patient_risk_summary(screening_id: str, actor: str = "api_client") -> PatientRiskSummaryResponse:
    """Return a patient risk summary for one screening record."""
    summary = get_risk_summary(screening_id)
    if summary is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Risk summary not found.")
    record_summary_view(screening_id, actor)
    return summary


@router.get("/{screening_id}/audit-events", response_model=list[AuditEventResponse])
def screening_audit_events(screening_id: str) -> list[AuditEventResponse]:
    """Return the stored audit trail for one screening record."""
    events = list_audit_events(screening_id)
    if events is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Audit trail not found.")
    return events


@router.post("/{screening_id}/review", response_model=ScreeningReviewResponse)
def review_screening(
    screening_id: str,
    payload: ScreeningReviewRequest,
) -> ScreeningReviewResponse:
    """Save a clinician review or override decision for one screening record."""
    response = save_screening_review(screening_id, payload)
    if response is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Risk summary not found.")
    return response
