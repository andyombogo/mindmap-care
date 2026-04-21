from uuid import uuid4

from app.schemas.risk import RiskScoreRequest, RiskScoreResponse

SAFETY_FLAG_WEIGHT = 25


def score_screening(payload: RiskScoreRequest) -> RiskScoreResponse:
    """Return a deterministic placeholder risk score for early API integration."""
    domain_total = sum(max(0, score) for score in payload.domain_scores.values())
    safety_total = len(payload.safety_flags) * SAFETY_FLAG_WEIGHT
    score = min(100.0, domain_total + safety_total)

    if payload.safety_flags:
        risk_level = "urgent"
        recommended_action = "Immediate human review and crisis or urgent referral pathway."
    elif score >= 70:
        risk_level = "high"
        recommended_action = "Prioritize clinician review and referral planning."
    elif score >= 35:
        risk_level = "moderate"
        recommended_action = "Schedule follow-up and consider referral based on context."
    else:
        risk_level = "low"
        recommended_action = "Provide routine guidance and monitor if concerns persist."

    risk_score_id = str(uuid4())
    return RiskScoreResponse(
        risk_score_id=risk_score_id,
        screening_id=payload.screening_id,
        risk_level=risk_level,
        score=score,
        recommended_action=recommended_action,
        explanation_url=f"/api/v1/explainability?risk_score_id={risk_score_id}",
        model_version="placeholder-rules-v0",
        requires_human_review=risk_level in {"high", "urgent"},
    )
