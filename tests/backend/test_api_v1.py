from fastapi.testclient import TestClient

from app.main import app


def test_screening_submission_placeholder_accepts_payload():
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
    client = TestClient(app)
    response = client.get("/api/v1/dashboard/summary")

    assert response.status_code == 200
    assert response.json()["total_screenings"] == 0
