from app.modeling import MockRiskInferenceEngine, ScreeningInput
from app.schemas.risk import RiskScoreRequest, RiskScoreResponse

MOCK_ENGINE = MockRiskInferenceEngine()


def score_screening(payload: RiskScoreRequest) -> RiskScoreResponse:
    """Return a deterministic placeholder risk score through the model contract."""
    screening = ScreeningInput(
        screening_id=payload.screening_id,
        site_id="api-risk-score-placeholder",
        screener_role="other",
        age_years=payload.age_years,
        sex="unknown",
        consent_confirmed=True,
        responses=[
            {
                "code": f"domain-{domain}",
                "label": f"{domain.replace('_', ' ').title()} domain score",
                "domain": domain,
                "value": score,
            }
            for domain, score in payload.domain_scores.items()
        ]
        or [
            {
                "code": "domain-general",
                "label": "General screening signal",
                "domain": "general",
                "value": 0,
            }
        ],
        safety_flags=payload.safety_flags,
    )
    prediction = MOCK_ENGINE.run(screening)

    return RiskScoreResponse(
        risk_score_id=prediction.risk_score_id,
        screening_id=payload.screening_id,
        risk_level=prediction.risk_category.value,
        score=prediction.score,
        recommended_action=prediction.recommended_action,
        explanation_url=f"/api/v1/explainability?risk_score_id={prediction.risk_score_id}",
        model_version=prediction.model_metadata.version,
        requires_human_review=prediction.requires_human_review,
    )
