from __future__ import annotations

from datetime import datetime, timezone
from uuid import uuid4

from app.modeling import MockRiskInferenceEngine, ScreeningInput
from app.schemas.dashboard import DashboardSummary
from app.schemas.screening import (
    PatientRiskSummaryResponse,
    RiskSummaryFactor,
    ScreeningSubmission,
    ScreeningSubmissionResponse,
)

MOCK_ENGINE = MockRiskInferenceEngine()

_risk_summaries: dict[str, PatientRiskSummaryResponse] = {}
_latest_screening_id: str | None = None


def submit_screening_for_mock_inference(
    payload: ScreeningSubmission,
) -> ScreeningSubmissionResponse:
    """Run mock inference for a screening submission and keep it in memory."""
    global _latest_screening_id

    screening_id = f"scr-{uuid4()}"
    screening_input = ScreeningInput(
        screening_id=screening_id,
        patient_reference_id=payload.patient_reference_id,
        site_id=payload.site_id,
        screener_role=payload.screener_role,
        age_years=payload.age_years,
        sex=payload.sex or "unknown",
        consent_confirmed=payload.consent_confirmed,
        presenting_concerns=payload.presenting_concerns,
        responses=[response.model_dump() for response in payload.responses]
        or [
            {
                "code": "screening-empty",
                "label": "No structured responses submitted",
                "domain": "data_quality",
                "value": None,
            }
        ],
        notes=payload.notes,
    )
    features = MOCK_ENGINE.preprocessor.transform(screening_input)
    prediction = MOCK_ENGINE.predict(features)
    summary = _build_patient_risk_summary(payload, screening_id, features, prediction)

    _risk_summaries[screening_id] = summary
    _latest_screening_id = screening_id

    return ScreeningSubmissionResponse(
        screening_id=screening_id,
        status="accepted",
        received_items=len(payload.responses),
        next_steps=[
            "Mock risk scoring completed",
            "Review patient risk summary",
            "Confirm referral or follow-up action",
        ],
        risk_score_id=prediction.risk_score_id,
        risk_category=prediction.risk_category.value,
        risk_score=prediction.score,
        recommended_action=prediction.recommended_action,
        risk_summary_url=f"/api/v1/screenings/{screening_id}/risk-summary",
    )


def get_risk_summary(screening_id: str) -> PatientRiskSummaryResponse | None:
    """Return a stored mock risk summary by screening ID."""
    return _risk_summaries.get(screening_id)


def get_latest_risk_summary() -> PatientRiskSummaryResponse | None:
    """Return the newest risk summary, if one exists."""
    if _latest_screening_id is None:
        return None
    return get_risk_summary(_latest_screening_id)


def get_dashboard_summary() -> DashboardSummary:
    """Return dashboard counts derived from mock inference results."""
    distribution = {"low": 0, "moderate": 0, "high": 0, "urgent": 0}
    for summary in _risk_summaries.values():
        distribution[summary.risk_category] += 1

    total = sum(distribution.values())
    high_count = distribution["high"] + distribution["urgent"]
    pending_follow_ups = sum(
        1
        for summary in _risk_summaries.values()
        if summary.requires_human_review or summary.risk_category in {"moderate", "high", "urgent"}
    )

    return DashboardSummary(
        total_screenings=total,
        high_risk_cases=high_count,
        medium_risk_cases=distribution["moderate"],
        low_risk_cases=distribution["low"],
        urgent_referrals=distribution["urgent"],
        pending_follow_ups=pending_follow_ups,
        completed_referrals=0,
        risk_distribution=distribution,
    )


def reset_demo_store() -> None:
    """Clear in-memory state for tests."""
    global _latest_screening_id
    _risk_summaries.clear()
    _latest_screening_id = None


def _build_patient_risk_summary(
    payload: ScreeningSubmission,
    screening_id: str,
    features,
    prediction,
) -> PatientRiskSummaryResponse:
    generated_at = datetime.now(timezone.utc).isoformat()
    category = prediction.risk_category.value

    return PatientRiskSummaryResponse(
        screening_id=screening_id,
        risk_score_id=prediction.risk_score_id,
        patient_reference_id=payload.patient_reference_id,
        display_id=payload.patient_reference_id or screening_id,
        age_years=payload.age_years,
        sex=payload.sex or "unknown",
        site_id=payload.site_id,
        screener_role=payload.screener_role,
        screened_at=generated_at,
        risk_category=category,
        score=prediction.score,
        confidence=prediction.confidence,
        recommended_action=prediction.recommended_action,
        requires_human_review=prediction.requires_human_review,
        triage_priority=_triage_priority(category),
        triage_window=_triage_window(category),
        summary=prediction.explanation.summary,
        explanation_text=prediction.explanation.summary,
        contributing_factors=[
            RiskSummaryFactor(
                name=factor.name,
                domain=factor.domain,
                direction=factor.direction,
                contribution=factor.contribution,
                description=factor.description,
            )
            for factor in prediction.explanation.factors
        ],
        caveats=prediction.explanation.caveats,
        model_id=prediction.model_metadata.model_id,
        model_version=prediction.model_metadata.version,
        generated_at=generated_at,
        data_quality_score=features.data_quality_score,
        missing_fields=features.missing_fields,
        report_status="Draft report not exported",
    )


def _triage_priority(category: str) -> str:
    priorities = {
        "urgent": "Priority 1",
        "high": "Priority 2",
        "moderate": "Priority 3",
        "low": "Routine",
    }
    return priorities[category]


def _triage_window(category: str) -> str:
    windows = {
        "urgent": "Same day review",
        "high": "Review within 48 hours",
        "moderate": "Follow-up within 14 days",
        "low": "Routine guidance",
    }
    return windows[category]
