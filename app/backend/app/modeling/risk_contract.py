from __future__ import annotations

from datetime import datetime, timezone
from enum import Enum
from typing import Any, Literal, Protocol
from uuid import uuid4

from pydantic import BaseModel, Field, field_validator


class TriageCategory(str, Enum):
    """Threshold-driven categories used for review and referral workflows."""

    LOW = "low"
    MODERATE = "moderate"
    HIGH = "high"
    URGENT = "urgent"


class Sex(str, Enum):
    FEMALE = "female"
    MALE = "male"
    INTERSEX = "intersex"
    UNKNOWN = "unknown"


class ScreenerRole(str, Enum):
    COMMUNITY_HEALTH_WORKER = "community_health_worker"
    NURSE = "nurse"
    CLINICIAN = "clinician"
    RESEARCHER = "researcher"
    OTHER = "other"


class ThresholdBand(BaseModel):
    """Inclusive lower bound for a triage category."""

    category: TriageCategory
    minimum_score: float = Field(ge=0, le=100)
    recommended_action: str
    requires_human_review: bool


DEFAULT_TRIAGE_THRESHOLDS: tuple[ThresholdBand, ...] = (
    ThresholdBand(
        category=TriageCategory.URGENT,
        minimum_score=85,
        recommended_action="Immediate clinician review and crisis or urgent referral pathway.",
        requires_human_review=True,
    ),
    ThresholdBand(
        category=TriageCategory.HIGH,
        minimum_score=70,
        recommended_action="Prioritize clinician review and referral planning.",
        requires_human_review=True,
    ),
    ThresholdBand(
        category=TriageCategory.MODERATE,
        minimum_score=35,
        recommended_action="Schedule follow-up and consider referral based on local context.",
        requires_human_review=False,
    ),
    ThresholdBand(
        category=TriageCategory.LOW,
        minimum_score=0,
        recommended_action="Provide routine guidance and monitor if concerns persist.",
        requires_human_review=False,
    ),
)


class ScreeningAnswer(BaseModel):
    """Single structured response captured during screening."""

    code: str = Field(min_length=1)
    label: str = Field(min_length=1)
    domain: str = Field(min_length=1)
    value: str | int | float | bool | None


class ScreeningInput(BaseModel):
    """Canonical input expected by the model interface layer."""

    screening_id: str | None = None
    patient_reference_id: str | None = None
    site_id: str = Field(min_length=1)
    screener_role: ScreenerRole
    age_years: int | None = Field(default=None, ge=0, le=120)
    sex: Sex = Sex.UNKNOWN
    screening_datetime: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    consent_confirmed: bool
    presenting_concerns: list[str] = Field(default_factory=list)
    responses: list[ScreeningAnswer] = Field(default_factory=list)
    notes: str | None = None
    safety_flags: list[str] = Field(default_factory=list)
    metadata: dict[str, str] = Field(default_factory=dict)

    @field_validator("responses")
    @classmethod
    def require_at_least_one_response(cls, responses: list[ScreeningAnswer]) -> list[ScreeningAnswer]:
        if not responses:
            raise ValueError("At least one screening response is required for inference.")
        return responses


class PreprocessedScreening(BaseModel):
    """Normalized features passed from preprocessing into inference."""

    screening_id: str
    domain_scores: dict[str, float]
    feature_vector: dict[str, float]
    missing_fields: list[str]
    safety_flags: list[str]
    data_quality_score: float = Field(ge=0, le=1)


class ExplanationFactor(BaseModel):
    """Human-readable factor contributing to a triage recommendation."""

    name: str
    domain: str
    direction: Literal["increases_risk", "decreases_risk", "contextual"]
    contribution: float = Field(ge=0, le=1)
    description: str


class ExplainabilityOutput(BaseModel):
    """Explanation payload shown to clinicians and programme reviewers."""

    summary: str
    factors: list[ExplanationFactor]
    caveats: list[str]
    method: str = "deterministic_mock_rules"


class ModelMetadata(BaseModel):
    """Metadata required to audit any generated risk result."""

    model_id: str
    name: str
    version: str
    model_type: Literal["mock_rules", "statistical", "machine_learning"]
    threshold_version: str
    generated_at: datetime
    intended_use: str
    limitations: list[str]


class RiskPredictionOutput(BaseModel):
    """Canonical prediction output returned by the model interface layer."""

    risk_score_id: str
    screening_id: str
    risk_category: TriageCategory
    score: float = Field(ge=0, le=100)
    confidence: float = Field(ge=0, le=1)
    recommended_action: str
    requires_human_review: bool
    thresholds: list[ThresholdBand]
    explanation: ExplainabilityOutput
    model_metadata: ModelMetadata


class ScreeningPreprocessor(Protocol):
    """Contract for future preprocessing implementations."""

    def transform(self, screening: ScreeningInput) -> PreprocessedScreening:
        """Convert raw screening input into normalized model features."""


class RiskInferenceModel(Protocol):
    """Contract for future real model implementations."""

    metadata: ModelMetadata

    def predict(self, features: PreprocessedScreening) -> RiskPredictionOutput:
        """Return risk prediction and explanation from normalized features."""


class MockScreeningPreprocessor:
    """Deterministic preprocessing used until validated models are introduced."""

    def transform(self, screening: ScreeningInput) -> PreprocessedScreening:
        screening_id = screening.screening_id or f"screening-{uuid4()}"
        domain_scores: dict[str, float] = {}
        feature_vector: dict[str, float] = {}
        missing_fields: list[str] = []
        safety_flags = list(screening.safety_flags)

        if screening.age_years is None:
            missing_fields.append("age_years")

        if screening.sex == Sex.UNKNOWN:
            missing_fields.append("sex")

        for answer in screening.responses:
            normalized_value = _coerce_response_value(answer.value)
            feature_vector[answer.code] = normalized_value
            domain_scores[answer.domain] = domain_scores.get(answer.domain, 0.0) + normalized_value

            is_safety_response = "safety" in answer.code.lower() or "safety" in answer.label.lower()
            if is_safety_response and normalized_value >= 2:
                safety_flags.append(answer.code)

            if answer.value is None:
                missing_fields.append(answer.code)

        data_quality_score = max(0.0, 1.0 - min(len(missing_fields) * 0.08, 0.6))

        return PreprocessedScreening(
            screening_id=screening_id,
            domain_scores=domain_scores,
            feature_vector=feature_vector,
            missing_fields=sorted(set(missing_fields)),
            safety_flags=sorted(set(safety_flags)),
            data_quality_score=round(data_quality_score, 2),
        )


class MockRiskInferenceEngine:
    """End-to-end mock inference engine for development and demos.

    This class intentionally avoids real ML. It preserves the interface shape
    that a validated model should implement later.
    """

    def __init__(
        self,
        preprocessor: ScreeningPreprocessor | None = None,
        thresholds: tuple[ThresholdBand, ...] = DEFAULT_TRIAGE_THRESHOLDS,
    ) -> None:
        self.preprocessor = preprocessor or MockScreeningPreprocessor()
        self.thresholds = thresholds
        self.metadata = ModelMetadata(
            model_id="mindmap-care-mock-risk-v0",
            name="MindMap Care Mock Risk Interface",
            version="0.1.0",
            model_type="mock_rules",
            threshold_version="thresholds-v0.1",
            generated_at=datetime.now(timezone.utc),
            intended_use="Development-only screening and triage workflow support.",
            limitations=[
                "Not trained or validated for clinical decision-making.",
                "Not diagnostic and must not replace clinician review.",
                "Uses deterministic placeholder scoring for end-to-end app testing.",
            ],
        )

    def run(self, screening: ScreeningInput) -> RiskPredictionOutput:
        """Preprocess a screening record and return a mock prediction."""
        return self.predict(self.preprocessor.transform(screening))

    def predict(self, features: PreprocessedScreening) -> RiskPredictionOutput:
        score = self._score(features)
        threshold = triage_for_score(score, features.safety_flags, self.thresholds)
        explanation = self._explain(features, score, threshold.category)

        return RiskPredictionOutput(
            risk_score_id=f"risk-{uuid4()}",
            screening_id=features.screening_id,
            risk_category=threshold.category,
            score=score,
            confidence=self._confidence(features),
            recommended_action=threshold.recommended_action,
            requires_human_review=threshold.requires_human_review,
            thresholds=list(self.thresholds),
            explanation=explanation,
            model_metadata=self.metadata.model_copy(update={"generated_at": datetime.now(timezone.utc)}),
        )

    def _score(self, features: PreprocessedScreening) -> float:
        domain_total = sum(max(0.0, value) for value in features.domain_scores.values())
        safety_boost = 35 if features.safety_flags else 0
        missing_data_penalty = min(len(features.missing_fields) * 2.0, 10.0)
        raw_score = (domain_total * 8.0) + safety_boost + missing_data_penalty
        return round(min(100.0, raw_score), 1)

    def _confidence(self, features: PreprocessedScreening) -> float:
        feature_count_factor = min(len(features.feature_vector) / 8, 1.0)
        confidence = (features.data_quality_score * 0.75) + (feature_count_factor * 0.25)
        return round(max(0.1, min(confidence, 0.99)), 2)

    def _explain(
        self,
        features: PreprocessedScreening,
        score: float,
        category: TriageCategory,
    ) -> ExplainabilityOutput:
        factors = [
            ExplanationFactor(
                name=f"{domain.replace('_', ' ').title()} score",
                domain=domain,
                direction="increases_risk",
                contribution=round(min(value / 12, 1.0), 2),
                description=f"{domain.replace('_', ' ').title()} responses contributed {value:.1f} points before scaling.",
            )
            for domain, value in sorted(features.domain_scores.items(), key=lambda item: item[1], reverse=True)
            if value > 0
        ]

        if features.safety_flags:
            factors.insert(
                0,
                ExplanationFactor(
                    name="Safety flag",
                    domain="safety",
                    direction="increases_risk",
                    contribution=1.0,
                    description="At least one safety-related response triggered urgent human review logic.",
                ),
            )

        if features.missing_fields:
            factors.append(
                ExplanationFactor(
                    name="Missing data",
                    domain="data_quality",
                    direction="contextual",
                    contribution=round(min(len(features.missing_fields) / 10, 1.0), 2),
                    description="Missing fields reduce certainty and should be resolved during review.",
                )
            )

        return ExplainabilityOutput(
            summary=(
                f"Mock rules produced a {category.value} triage category with score {score}. "
                "This output supports review and triage only."
            ),
            factors=factors,
            caveats=[
                "This is not a diagnosis.",
                "The mock model is for workflow testing only.",
                "Clinicians should verify safety, context, and referral appropriateness.",
            ],
        )


def triage_for_score(
    score: float,
    safety_flags: list[str] | None = None,
    thresholds: tuple[ThresholdBand, ...] = DEFAULT_TRIAGE_THRESHOLDS,
) -> ThresholdBand:
    """Return the threshold band for a score, with safety flags forcing urgent review."""
    if safety_flags:
        return next(threshold for threshold in thresholds if threshold.category == TriageCategory.URGENT)

    ordered_thresholds = sorted(thresholds, key=lambda threshold: threshold.minimum_score, reverse=True)
    return next(threshold for threshold in ordered_thresholds if score >= threshold.minimum_score)


def screening_input_from_mapping(payload: dict[str, Any]) -> ScreeningInput:
    """Build a canonical screening input from API or test dictionaries."""
    return ScreeningInput.model_validate(payload)


def _coerce_response_value(value: str | int | float | bool | None) -> float:
    if value is None:
        return 0.0

    if isinstance(value, bool):
        return 1.0 if value else 0.0

    if isinstance(value, (int, float)):
        return float(value)

    normalized = value.strip().lower()
    if normalized in {"yes", "true", "present"}:
        return 1.0
    if normalized in {"no", "false", "absent", ""}:
        return 0.0

    try:
        return float(normalized)
    except ValueError:
        return 0.0
