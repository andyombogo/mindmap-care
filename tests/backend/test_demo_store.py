from app.services.demo_store import (
    get_dashboard_summary,
    get_latest_risk_summary,
    get_triage_queue,
    list_audit_events,
    record_summary_view,
    reset_demo_store,
    save_screening_review,
    seed_demo_store_from_synthetic,
    submit_screening_for_mock_inference,
)
from app.schemas.screening import ScreeningReviewRequest, ScreeningSubmission


def test_demo_store_returns_mock_risk_summary_for_submission():
    reset_demo_store()
    submission = ScreeningSubmission(
        patient_reference_id="MC-200",
        site_id="clinic-001",
        screener_role="nurse",
        age_years=32,
        sex="female",
        consent_confirmed=True,
        responses=[
            {
                "code": "safety-risk",
                "label": "Safety concern",
                "domain": "safety",
                "value": 2,
            }
        ],
    )

    response = submit_screening_for_mock_inference(submission)
    summary = get_latest_risk_summary()

    assert response.risk_category == "urgent"
    assert summary is not None
    assert summary.patient_reference_id == "MC-200"
    assert summary.risk_category == "urgent"
    assert summary.contributing_factors


def test_demo_store_dashboard_counts_submitted_screenings():
    reset_demo_store()
    submission = ScreeningSubmission(
        site_id="clinic-001",
        screener_role="other",
        consent_confirmed=True,
        responses=[
            {
                "code": "mh-mood",
                "label": "Low mood",
                "domain": "mental_health",
                "value": 1,
            }
        ],
    )

    submit_screening_for_mock_inference(submission)
    dashboard = get_dashboard_summary()

    assert dashboard.total_screenings == 1
    assert sum(dashboard.risk_distribution.values()) == 1


def test_demo_store_seeds_synthetic_records_for_walkthroughs():
    reset_demo_store()

    seeded_count = seed_demo_store_from_synthetic()
    dashboard = get_dashboard_summary()
    queue = get_triage_queue()

    assert seeded_count == 12
    assert dashboard.total_screenings == 12
    assert dashboard.urgent_referrals >= 1
    assert len(queue) == 12
    assert queue[0].risk_category in {"urgent", "high"}


def test_demo_store_seed_is_idempotent():
    reset_demo_store()

    assert seed_demo_store_from_synthetic() == 12
    assert seed_demo_store_from_synthetic() == 0
    assert get_dashboard_summary().total_screenings == 12


def test_demo_store_records_submission_scoring_and_view_audit_events():
    reset_demo_store()
    submission = ScreeningSubmission(
        patient_reference_id="MC-500",
        site_id="clinic-001",
        screener_role="clinician",
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

    response = submit_screening_for_mock_inference(submission)
    record_summary_view(response.screening_id, actor="Frontend clinician")
    events = list_audit_events(response.screening_id)

    assert events is not None
    assert [event.event_type for event in events[:3]] == [
        "summary_viewed",
        "risk_scored",
        "screening_submitted",
    ]
    assert events[0].actor == "Frontend clinician"


def test_demo_store_review_updates_summary_and_audit_trail():
    reset_demo_store()
    submission = ScreeningSubmission(
        patient_reference_id="MC-501",
        site_id="clinic-001",
        screener_role="nurse",
        consent_confirmed=True,
        responses=[
            {
                "code": "safety-risk",
                "label": "Safety concern",
                "domain": "safety",
                "value": 2,
            }
        ],
    )

    response = submit_screening_for_mock_inference(submission)
    review_response = save_screening_review(
        response.screening_id,
        ScreeningReviewRequest(
            actor="Dr. Achieng",
            decision="escalate_urgency",
            assigned_to="Same-day referral desk",
            note="Escalated after phone safety check.",
        ),
    )

    assert review_response is not None
    assert review_response.review_status == "Urgency escalated by clinician"
    assert review_response.summary.assigned_to == "Same-day referral desk"
    assert review_response.summary.last_reviewed_by == "Dr. Achieng"
    assert review_response.audit_event.event_type == "override_recorded"
