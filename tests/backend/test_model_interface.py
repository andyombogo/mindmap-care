import pytest

from app.modeling import MockRiskInferenceEngine, ScreeningInput, TriageCategory
from app.modeling.risk_contract import triage_for_score


def test_mock_engine_returns_prediction_and_explanation():
    engine = MockRiskInferenceEngine()
    screening = ScreeningInput(
        screening_id="screening-001",
        patient_reference_id="MC-001",
        site_id="clinic-001",
        screener_role="nurse",
        age_years=42,
        sex="female",
        consent_confirmed=True,
        responses=[
            {
                "code": "mh-mood",
                "label": "Low mood",
                "domain": "mental_health",
                "value": 2,
            },
            {
                "code": "safety-risk",
                "label": "Safety concern",
                "domain": "safety",
                "value": 2,
            },
        ],
    )

    prediction = engine.run(screening)

    assert prediction.screening_id == "screening-001"
    assert prediction.risk_category == TriageCategory.URGENT
    assert prediction.requires_human_review is True
    assert prediction.explanation.factors
    assert prediction.model_metadata.model_type == "mock_rules"


def test_threshold_triage_without_safety_flags():
    assert triage_for_score(20).category == TriageCategory.LOW
    assert triage_for_score(45).category == TriageCategory.MODERATE
    assert triage_for_score(75).category == TriageCategory.HIGH
    assert triage_for_score(90).category == TriageCategory.URGENT


@pytest.mark.parametrize(
    ("fixture_name", "response_value", "expected_score", "expected_category", "requires_review"),
    [
        ("low", 2, 16.0, TriageCategory.LOW, False),
        ("moderate", 5, 40.0, TriageCategory.MODERATE, False),
        ("high", 9, 72.0, TriageCategory.HIGH, True),
        ("urgent", 11, 88.0, TriageCategory.URGENT, True),
    ],
)
def test_mock_engine_fixture_outputs_cover_each_triage_category(
    fixture_name,
    response_value,
    expected_score,
    expected_category,
    requires_review,
):
    engine = MockRiskInferenceEngine()
    screening = ScreeningInput(
        screening_id=f"screening-{fixture_name}",
        site_id="clinic-001",
        screener_role="nurse",
        age_years=38,
        sex="female",
        consent_confirmed=True,
        responses=[
            {
                "code": f"fixture-{fixture_name}",
                "label": f"{fixture_name.title()} fixture",
                "domain": "mental_health",
                "value": response_value,
            }
        ],
    )

    prediction = engine.run(screening)

    assert prediction.score == expected_score
    assert prediction.risk_category == expected_category
    assert prediction.requires_human_review is requires_review
    assert prediction.explanation.summary.startswith(
        f"Mock rules produced a {expected_category.value} triage category"
    )


def test_mock_engine_is_deterministic_for_same_screening():
    engine = MockRiskInferenceEngine()
    screening = ScreeningInput(
        screening_id="screening-deterministic",
        site_id="clinic-001",
        screener_role="clinician",
        age_years=35,
        sex="male",
        consent_confirmed=True,
        responses=[
            {
                "code": "mh-anxiety",
                "label": "Anxiety",
                "domain": "mental_health",
                "value": 2,
            },
            {
                "code": "fn-daily",
                "label": "Daily living difficulty",
                "domain": "function",
                "value": 1,
            },
        ],
    )

    first_prediction = engine.run(screening)
    second_prediction = engine.run(screening)

    assert first_prediction == second_prediction
    assert first_prediction.risk_score_id.startswith("risk-")


def test_preprocessing_tracks_missing_fields():
    engine = MockRiskInferenceEngine()
    screening = ScreeningInput(
        site_id="clinic-001",
        screener_role="other",
        consent_confirmed=True,
        responses=[
            {
                "code": "fn-daily",
                "label": "Daily living difficulty",
                "domain": "function",
                "value": None,
            }
        ],
    )

    features = engine.preprocessor.transform(screening)

    assert "age_years" in features.missing_fields
    assert "sex" in features.missing_fields
    assert "fn-daily" in features.missing_fields
    assert 0 <= features.data_quality_score <= 1
