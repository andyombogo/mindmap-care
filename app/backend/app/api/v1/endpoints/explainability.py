from fastapi import APIRouter

from app.schemas.explainability import ExplanationRequest, ExplanationResponse
from app.services.explainability import build_explanation

router = APIRouter(tags=["explainability"])


@router.post("", response_model=ExplanationResponse)
def explain_risk_result(payload: ExplanationRequest) -> ExplanationResponse:
    """Return a plain-language explanation for a risk result."""
    return build_explanation(payload)
