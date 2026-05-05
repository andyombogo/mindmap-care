# Validation Protocol

## Purpose

This protocol defines how MindMap Care should be reviewed before any controlled pilot involving real screening workflows. It is a planning document, not evidence that the current mock engine is clinically validated.

## Validation Questions

- Do clinicians and frontline users understand the risk categories, explanations, and recommended actions?
- Are high-risk and urgent outputs routed to appropriate human review steps?
- Does the workflow capture enough data for safe triage without overburdening screeners?
- Are missing-data flags, caveats, and non-diagnostic language visible at decision points?
- Do outputs or workflow steps create avoidable bias across locally relevant groups?
- Can programme leads monitor screening volume, referrals, follow-up gaps, and data quality?

## Review Streams

| Stream | Review activity | Minimum artifact |
| --- | --- | --- |
| Clinical sense-check | Clinicians review sample low, moderate, high, and urgent cases | Annotated case review log |
| Explainability review | Users rate whether factors and caveats are understandable and actionable | Explanation review summary |
| Workflow usability | Frontline users complete supervised walkthroughs | Usability notes and friction log |
| Safety review | High-risk, urgent, and crisis pathways are checked against local escalation rules | Safety review checklist |
| Data quality review | Missingness, invalid values, and incomplete records are summarized | Data quality report |
| Fairness review | Outputs and workflow outcomes are compared across available subgroups | Subgroup review table |
| Implementation review | Downtime, support requests, training burden, and workflow fit are tracked | Implementation readiness summary |

## Candidate Metrics

Model and clinical metrics are only appropriate when an approved evaluation dataset or clinician-adjudicated reference process is available.

- Sensitivity
- Specificity
- Positive predictive value
- Negative predictive value
- Calibration by risk category
- Missingness robustness
- Override rate and override reasons
- Referral completion rate
- Follow-up completion rate
- Subgroup performance by age, sex, language, geography, facility type, and other approved local variables

## Case Review Set

The first review pack should include:

- at least five low-risk synthetic or de-identified cases
- at least five moderate-risk cases
- at least five high-risk cases
- at least five urgent or safety-flagged cases
- cases with missing age, unknown sex, missing domain responses, and conflicting contextual notes

No real patient data should be added to the repository. Any real-world review data must follow approved storage, access, consent, and governance requirements.

## Minimum Acceptance Thresholds

Thresholds must be agreed with clinical and programme stakeholders before pilot use. At minimum, the team should define:

- maximum acceptable urgent-case routing delay
- acceptable rate of unexplained or confusing outputs
- minimum explanation clarity score from clinician reviewers
- maximum unresolved missing-data rate
- acceptable override review process and escalation owner
- pause criteria for safety incidents or workflow misuse

## Failure Modes To Track

- Low-risk outputs that could create false reassurance
- High-risk outputs without practical referral capacity
- Safety flags that are missed, hidden, or delayed
- Explanations that imply diagnosis or certainty
- Missing data that changes the recommended action without enough warning
- Bias in who is referred, followed up, or left pending
- Use by staff without training or clinical supervision

## Go/No-Go Review

A controlled pilot should not start until:

- intended use has been approved by local clinical leadership
- escalation pathways are documented for the pilot site
- the non-diagnostic framing is visible in training and product surfaces
- validation review findings have been summarized with limitations
- data protection and incident reporting responsibilities are assigned
- a named clinical owner can pause or revise the workflow if risks emerge
