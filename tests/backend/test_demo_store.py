from app.services.demo_store import (
    get_dashboard_summary,
    get_latest_risk_summary,
    reset_demo_store,
    submit_screening_for_mock_inference,
)
from app.schemas.screening import ScreeningSubmission


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
