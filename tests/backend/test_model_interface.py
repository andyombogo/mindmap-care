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
