from fastapi.testclient import TestClient

from app.main import app
from app.services.demo_store import reset_demo_store


def test_screening_submission_placeholder_accepts_payload():
    reset_demo_store()
    client = TestClient(app)
    response = client.post(
        "/api/v1/screenings",
        json={
            "site_id": "clinic-001",
            "screener_role": "nurse",
            "age_years": 42,
            "consent_confirmed": True,
            "presenting_concerns": ["low mood", "memory concerns"],
            "responses": [
                {
                    "code": "mh-1",
                    "label": "Feeling down",
                    "value": 2,
                    "domain": "mental_health",
                }
            ],
        },
    )

    assert response.status_code == 202
    assert response.json()["status"] == "accepted"
    assert response.json()["received_items"] == 1
    assert response.json()["risk_score_id"].startswith("risk-")
    assert response.json()["risk_category"] in {"low", "moderate", "high", "urgent"}
    assert response.json()["risk_summary_url"]


def test_latest_risk_summary_returns_submitted_screening():
    reset_demo_store()
    client = TestClient(app)
    create_response = client.post(
        "/api/v1/screenings",
        json={
            "patient_reference_id": "MC-100",
            "site_id": "clinic-001",
            "screener_role": "nurse",
            "age_years": 42,
            "sex": "female",
            "consent_confirmed": True,
            "responses": [
                {
                    "code": "safety-risk",
                    "label": "Safety concern",
                    "value": 2,
                    "domain": "safety",
                }
            ],
        },
    )

    response = client.get("/api/v1/screenings/risk-summary/latest")

    assert response.status_code == 200
    assert response.json()["screening_id"] == create_response.json()["screening_id"]
    assert response.json()["patient_reference_id"] == "MC-100"
    assert response.json()["risk_category"] == "urgent"


def test_risk_scoring_placeholder_flags_urgent_safety_cases():
    client = TestClient(app)
    response = client.post(
        "/api/v1/risk/score",
        json={
            "screening_id": "screening-001",
            "domain_scores": {"mental_health": 20},
            "safety_flags": ["suicidal_ideation"],
        },
    )

    assert response.status_code == 200
    assert response.json()["risk_level"] == "urgent"
    assert response.json()["requires_human_review"] is True


def test_dashboard_summary_placeholder_returns_counts():
    reset_demo_store()
    client = TestClient(app)
    client.post(
        "/api/v1/screenings",
        json={
            "site_id": "clinic-001",
            "screener_role": "nurse",
            "consent_confirmed": True,
            "responses": [
                {
                    "code": "mh-1",
                    "label": "Feeling down",
                    "value": 2,
                    "domain": "mental_health",
                }
            ],
        },
    )

    response = client.get("/api/v1/dashboard/summary")

    assert response.status_code == 200
    assert response.json()["total_screenings"] == 1
    assert "medium_risk_cases" in response.json()
