from __future__ import annotations

import json
from datetime import datetime, timezone
from pathlib import Path
from uuid import uuid4

from app.core.config import get_settings
from app.modeling import MockRiskInferenceEngine, ScreeningInput
from app.schemas.dashboard import DashboardSummary
from app.schemas.screening import (
    PatientRiskSummaryResponse,
    RiskSummaryFactor,
    ScreeningSubmission,
    ScreeningSubmissionResponse,
    TriageQueueItem,
)

MOCK_ENGINE = MockRiskInferenceEngine()

_risk_summaries: dict[str, PatientRiskSummaryResponse] = {}
_screening_inputs: dict[str, ScreeningInput] = {}
_latest_screening_id: str | None = None
_seed_loaded = False


def submit_screening_for_mock_inference(
    payload: ScreeningSubmission,
) -> ScreeningSubmissionResponse:
    """Run mock inference for a screening submission and keep it in memory."""
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
    summary, prediction = _run_and_store_screening(screening_input)

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
        risk_summary_url=f"/api/v1/screenings/{summary.screening_id}/risk-summary",
    )


def seed_demo_store_from_synthetic(path: str | Path | None = None) -> int:
    """Load fictional demo screenings into memory for reliable MVP walkthroughs."""
    global _seed_loaded

    if _seed_loaded:
        return 0

    demo_path = _resolve_demo_data_path(path or get_settings().demo_data_path)
    if demo_path is None:
        _seed_loaded = True
        return 0

    records = json.loads(demo_path.read_text(encoding="utf-8"))
    seeded_count = 0
    for record in records:
        screening_input = ScreeningInput.model_validate(record)
        if screening_input.screening_id in _risk_summaries:
            continue
        _run_and_store_screening(screening_input)
        seeded_count += 1

    _seed_loaded = True
    return seeded_count


def _run_and_store_screening(screening_input: ScreeningInput):
    """Run deterministic mock inference and persist the resulting demo summary."""
    global _latest_screening_id

    features = MOCK_ENGINE.preprocessor.transform(screening_input)
    prediction = MOCK_ENGINE.predict(features)
    summary = _build_patient_risk_summary(screening_input, features, prediction)
    screening_id = features.screening_id
    _risk_summaries[screening_id] = summary
    _screening_inputs[screening_id] = screening_input
    _latest_screening_id = screening_id

    return summary, prediction


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
    follow_up_statuses = [
        _safe_follow_up_status(
            _screening_inputs.get(summary.screening_id).metadata.get("follow_up_status")
            if _screening_inputs.get(summary.screening_id)
            else None,
            summary.risk_category,
        )
        for summary in _risk_summaries.values()
    ]
    completed_referrals = follow_up_statuses.count("complete")
    pending_follow_ups = total - completed_referrals

    return DashboardSummary(
        total_screenings=total,
        high_risk_cases=high_count,
        medium_risk_cases=distribution["moderate"],
        low_risk_cases=distribution["low"],
        urgent_referrals=distribution["urgent"],
        pending_follow_ups=pending_follow_ups,
        completed_referrals=completed_referrals,
        risk_distribution=distribution,
    )


def get_triage_queue() -> list[TriageQueueItem]:
    """Return a prioritized operational queue from stored demo screenings."""
    items = [
        _build_triage_queue_item(summary, _screening_inputs.get(screening_id))
        for screening_id, summary in _risk_summaries.items()
    ]
    return sorted(items, key=_triage_sort_value, reverse=True)


def reset_demo_store() -> None:
    """Clear in-memory state for tests."""
    global _latest_screening_id, _seed_loaded
    _risk_summaries.clear()
    _screening_inputs.clear()
    _latest_screening_id = None
    _seed_loaded = False


def _build_patient_risk_summary(
    screening_input: ScreeningInput,
    features,
    prediction,
) -> PatientRiskSummaryResponse:
    generated_at = datetime.now(timezone.utc).isoformat()
    category = prediction.risk_category.value

    return PatientRiskSummaryResponse(
        screening_id=features.screening_id,
        risk_score_id=prediction.risk_score_id,
        patient_reference_id=screening_input.patient_reference_id,
        display_id=screening_input.patient_reference_id or features.screening_id,
        age_years=screening_input.age_years,
        sex=screening_input.sex.value,
        site_id=screening_input.site_id,
        screener_role=screening_input.screener_role.value,
        screened_at=screening_input.screening_datetime.isoformat(),
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


def _build_triage_queue_item(
    summary: PatientRiskSummaryResponse,
    screening_input: ScreeningInput | None,
) -> TriageQueueItem:
    metadata = screening_input.metadata if screening_input else {}
    follow_up_status = _safe_follow_up_status(metadata.get("follow_up_status"), summary.risk_category)
    referral_urgency = metadata.get("referral_urgency") or _referral_urgency(summary.risk_category)
    concerns = screening_input.presenting_concerns if screening_input else []
    owner = "Clinical review queue" if summary.requires_human_review else "Facility team"

    return TriageQueueItem(
        screening_id=summary.screening_id,
        patient_reference_id=summary.patient_reference_id,
        display_id=summary.display_id,
        site_id=summary.site_id,
        risk_category=summary.risk_category,
        risk_score=summary.score,
        triage_priority=summary.triage_priority,
        triage_window=summary.triage_window,
        referral_urgency=referral_urgency,
        recommended_action=summary.recommended_action,
        follow_up_status=follow_up_status,
        missing_data_flags=summary.missing_fields,
        requires_human_review=summary.requires_human_review,
        screened_at=summary.screened_at,
        owner=owner,
        concern_summary=", ".join(concerns[:3]) if concerns else "Screening result awaiting review.",
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


def _triage_sort_value(item: TriageQueueItem) -> tuple[int, int, float, str]:
    category_rank = {"urgent": 4, "high": 3, "moderate": 2, "low": 1}
    follow_up_rank = {"overdue": 4, "pending": 3, "scheduled": 2, "complete": 1}
    return (
        category_rank[item.risk_category],
        follow_up_rank[item.follow_up_status],
        item.risk_score,
        item.screened_at,
    )


def _safe_follow_up_status(value: str | None, category: str) -> str:
    allowed = {"overdue", "pending", "scheduled", "complete"}
    if value in allowed:
        return value
    if category in {"urgent", "high"}:
        return "pending"
    if category == "moderate":
        return "scheduled"
    return "complete"


def _referral_urgency(category: str) -> str:
    labels = {
        "urgent": "same_day_review",
        "high": "priority_referral",
        "moderate": "routine_follow_up",
        "low": "routine_guidance",
    }
    return labels[category]


def _resolve_demo_data_path(path: str | Path) -> Path | None:
    candidate = Path(path)
    service_root = Path(__file__).resolve().parents[2]
    repo_root = Path(__file__).resolve().parents[4]
    candidates = [
        candidate,
        Path.cwd() / candidate,
        service_root / candidate,
        repo_root / candidate,
    ]

    for possible_path in candidates:
        if possible_path.exists():
            return possible_path

    return None
