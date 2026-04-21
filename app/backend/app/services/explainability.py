from app.schemas.explainability import ExplanationRequest, ExplanationResponse


def build_explanation(payload: ExplanationRequest) -> ExplanationResponse:
    """Build a placeholder explanation response from supplied factors."""
    if payload.contributing_factors:
        leading_factor = max(payload.contributing_factors, key=lambda item: item.weight)
        summary = (
            f"The result is {payload.risk_level} risk. The strongest recorded "
            f"contributor is {leading_factor.name}."
        )
    else:
        summary = (
            f"The result is {payload.risk_level} risk. No detailed contributing "
            "factors were supplied for this placeholder explanation."
        )

    return ExplanationResponse(
        risk_level=payload.risk_level,
        summary=summary,
        contributing_factors=payload.contributing_factors,
        caveats=[
            "This is screening and triage support, not a diagnosis.",
            "A trained human reviewer should interpret the result in clinical and social context.",
        ],
        recommended_review="Review the screening record and confirm the appropriate referral pathway.",
    )
