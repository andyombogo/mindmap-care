from fastapi.testclient import TestClient

from app.main import app
from app.services.demo_store import reset_demo_store


def test_health_response_includes_generated_request_id_header():
    client = TestClient(app)

    response = client.get("/health")

    assert response.status_code == 200
    assert response.headers["X-Request-ID"]


def test_http_errors_use_structured_envelope_and_preserve_request_id():
    reset_demo_store()
    client = TestClient(app)

    response = client.get(
        "/api/v1/screenings/risk-summary/latest",
        headers={"X-Request-ID": "partner-demo-123"},
    )

    assert response.status_code == 404
    assert response.headers["X-Request-ID"] == "partner-demo-123"
    assert response.json() == {
        "error": {
            "code": "not_found",
            "message": "No screening summaries yet.",
            "request_id": "partner-demo-123",
            "details": None,
        }
    }


def test_validation_errors_are_structured_without_echoing_submitted_values():
    client = TestClient(app)

    response = client.post(
        "/api/v1/screenings",
        headers={"X-Request-ID": "validation-demo-456"},
        json={
            "site_id": "",
            "screener_role": "assistant",
            "consent_confirmed": True,
            "responses": [],
        },
    )

    payload = response.json()
    details = payload["error"]["details"]

    assert response.status_code == 422
    assert response.headers["X-Request-ID"] == "validation-demo-456"
    assert payload["error"]["code"] == "validation_error"
    assert payload["error"]["message"] == "Request validation failed."
    assert payload["error"]["request_id"] == "validation-demo-456"
    assert {"location", "message", "type"} <= set(details[0])
    assert "assistant" not in response.text
