import pytest
from pydantic import ValidationError

from app.schemas.dashboard import DashboardSummary
from app.schemas.screening import AuditEventResponse, ScreeningReviewRequest, ScreeningSubmission


def test_screening_submission_schema_accepts_valid_payload():
    submission = ScreeningSubmission(
        patient_reference_id="MC-001",
        site_id="clinic-001",
        screener_role="nurse",
        age_years=41,
        sex="female",
        consent_confirmed=True,
        responses=[
            {
                "code": "mh-mood",
                "label": "Low mood",
                "domain": "mental_health",
                "value": 2,
            }
        ],
    )

    assert submission.site_id == "clinic-001"
    assert submission.responses[0].domain == "mental_health"


def test_screening_submission_rejects_invalid_age():
    with pytest.raises(ValidationError):
        ScreeningSubmission(
            site_id="clinic-001",
            screener_role="nurse",
            age_years=140,
            consent_confirmed=True,
            responses=[],
        )


def test_dashboard_summary_rejects_negative_counts():
    with pytest.raises(ValidationError):
        DashboardSummary(
            total_screenings=-1,
            high_risk_cases=0,
            medium_risk_cases=0,
            low_risk_cases=0,
            urgent_referrals=0,
            pending_follow_ups=0,
            completed_referrals=0,
            risk_distribution={"low": 0, "moderate": 0, "high": 0, "urgent": 0},
        )


def test_screening_review_request_requires_actor_and_assignee():
    review = ScreeningReviewRequest(
        actor="Dr. Achieng",
        decision="confirm_current_triage",
        assigned_to="Clinical review queue",
        note="Reviewed and accepted.",
    )

    assert review.actor == "Dr. Achieng"
    assert review.assigned_to == "Clinical review queue"


def test_audit_event_schema_accepts_structured_metadata():
    event = AuditEventResponse(
        event_id="audit-1",
        screening_id="scr-1",
        event_type="risk_scored",
        actor="mindmap_mock_engine",
        occurred_at="2026-04-23T12:00:00+00:00",
        detail="Scoring completed.",
        metadata={"risk_score": 72.5, "requires_human_review": True},
    )

    assert event.event_type == "risk_scored"
    assert event.metadata["requires_human_review"] is True
