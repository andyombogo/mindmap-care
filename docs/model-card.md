# Model Card

## Model Name

MindMap Care Mock Risk Inference Engine

## Version

`0.1.0`

## Status

Development mock engine. Not clinically validated.

## Intended Use

The current engine supports product prototyping, UI integration, API contract testing, and workflow demonstration.

It is intended to produce deterministic mock risk outputs from structured screening responses so teams can test the end-to-end experience before introducing a validated model.

## Not Intended For

The current engine must not be used for:

- Diagnosis
- Autonomous clinical decision-making
- Emergency response without human review
- Treatment recommendations
- Production clinical deployment
- Claims of clinical performance

## Inputs

Expected inputs include:

- Screening ID
- Patient reference ID, optional
- Site ID
- Screener role
- Age
- Sex
- Consent confirmation
- Structured screening responses
- Presenting concerns
- Clinical notes
- Safety flags

## Outputs

The mock engine returns:

- Risk score from 0 to 100
- Risk category: low, moderate, high, urgent
- Confidence estimate
- Recommended action
- Human review requirement
- Contributing factors
- Explanation text
- Caveats
- Model metadata

## Scoring Approach

The MVP uses transparent rules:

- Screening response values are normalized into numeric features.
- Domain scores are summed.
- Safety flags increase urgency.
- Missing data reduces confidence and may add contextual explanation.
- Threshold bands map scores to triage categories.

This is deterministic and intentionally simple.

The exact development-only scoring formula, triage thresholds, and fixture expectations are documented in [mock-scoring-rules.md](mock-scoring-rules.md).

## Explainability

The explanation output includes:

- Domain-level contributors
- Safety flag explanation when applicable
- Missing data caveat when applicable
- Non-diagnostic caveats
- Recommended clinician review framing

The explanation is designed to support review, not to justify an automated decision.

## Limitations

The current engine:

- Is not trained on clinical data
- Is not locally validated
- Does not estimate true disease probability
- Does not handle language, culture, comorbidity, or social determinants robustly
- Does not replace clinical assessment
- Does not provide calibrated risk
- Does not account for longitudinal history

## Validation Status

No clinical validation has been completed.

Before any pilot use involving real patients, the team should define:

- Target population
- Intended screening domains
- Reference standard or clinical review process
- Evaluation metrics
- Subgroup analysis plan
- Safety monitoring approach
- Governance approval pathway

## Monitoring Requirements

Future validated models should be monitored for:

- Distribution drift
- Missing data rates
- False positives and false negatives
- Override rates
- Referral completion
- Subgroup performance
- Calibration
- Safety incidents

## Replacement Plan

The mock engine is designed to be replaced by a validated model that implements the same interface:

- Preprocessing contract
- Prediction output schema
- Explainability output schema
- Model metadata structure
- Threshold configuration

This allows the product workflow to mature before the clinical model is finalized.
