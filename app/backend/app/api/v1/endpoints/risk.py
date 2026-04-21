from fastapi import APIRouter

from app.schemas.risk import RiskScoreRequest, RiskScoreResponse
from app.services.risk_scoring import score_screening

router = APIRouter(tags=["risk scoring"])


@router.post("/score", response_model=RiskScoreResponse)
def create_risk_score(payload: RiskScoreRequest) -> RiskScoreResponse:
    """Return a placeholder risk score from screening domain scores."""
    return score_screening(payload)
