# Risk Management Plan

## Purpose

This plan defines how MindMap Care should identify, review, escalate, and respond to safety, privacy, quality, and implementation risks as it moves from MVP prototype toward controlled pilot preparation.

It complements the [risk register](../risk-register.md) by describing the operating process around those risks.

## Scope

This plan applies to:

- product workflow changes
- scoring-rule or model changes
- UI changes affecting triage, explanation, referral, or export behavior
- privacy and security incidents
- pilot-readiness decisions
- partner demos that could create unsafe assumptions about readiness

## Governance Roles

The following roles must be assigned before pilot use:

| Role | Primary responsibility |
| --- | --- |
| Product lead | Maintains roadmap alignment, readiness claims, and cross-functional review cadence |
| Clinical owner | Reviews safety language, escalation pathways, and pause criteria |
| Technical owner | Reviews architecture, logging, deployment, and implementation controls |
| Data protection owner | Reviews consent, retention, data access, export controls, and privacy incidents |
| Validation owner | Maintains validation summaries, evidence tracking, and model-change review |
| Programme lead | Reviews workflow fit, referral practicality, staffing constraints, and rollout readiness |

During the MVP stage, one person may temporarily hold more than one role, but the responsibilities still need explicit ownership.

## Risk Categories

- Clinical safety
- Triage and workflow quality
- Explainability and overreliance
- Bias and fairness
- Privacy and confidentiality
- Access control and infrastructure security
- Data quality and auditability
- Deployment and operational resilience
- Partner communication and readiness claims

## Risk Lifecycle

### 1. Identify

Risks can be identified through:

- roadmap or backlog review
- code or architecture changes
- clinician feedback
- partner walkthroughs
- test failures
- incident reports
- deployment or support observations

### 2. Assess

Every new or changed risk should record:

- concise description of the harm or failure mode
- likely trigger or scenario
- severity
- owner
- current mitigation
- next review point

Severity meanings follow the [risk register](../risk-register.md).

### 3. Mitigate

Mitigations can include:

- product copy changes
- workflow guardrails
- training or documentation changes
- tests
- infrastructure controls
- access restrictions
- escalation or pause rules

### 4. Verify

Before a risk is considered reduced, the team should verify the mitigation through one or more of:

- test coverage
- document review
- clinician review
- demo walkthrough
- deployment checklist
- incident drill or tabletop exercise

### 5. Escalate

Escalate immediately when a risk involves:

- possible patient harm or crisis-routing failure
- unauthorized access or disclosure of sensitive data
- misleading readiness claims to partners
- model or rule changes that materially affect triage output
- repeated workflow confusion that could change human action

### 6. Track Or Close

- Risks stay open while the product remains vulnerable to the scenario.
- Risks can move to monitoring when controls exist but ongoing review is still needed.
- Risks can close only when the scenario is no longer relevant or a stronger replacement control is in place.

## Review Cadence

| Review moment | Required participants | Minimum output |
| --- | --- | --- |
| Monthly during MVP | Product lead, technical owner | updated risk register and action list |
| Before partner demos | Product lead, clinical owner | readiness and messaging check |
| Before model or scoring-rule changes | Validation owner, clinical owner, technical owner | impact review and release note |
| Before pilot go/no-go | all named owners | signed readiness review and open-risk decision |
| After incidents or near misses | relevant owners | incident summary, mitigation update, pause decision |

## Change Control Expectations

The following changes require explicit review before release:

- scoring thresholds or category logic
- explanation text that changes recommended action
- export format changes
- new fields that collect identifiers or sensitive notes
- authentication, access, or retention policy changes
- deployment environment or hosting changes

Each of these changes should update, at minimum:

- release notes
- risk register if risk posture changes
- validation summary if evidence or limitations change

## Pause And Rollback Criteria

The team should be able to pause demos, pilots, or new releases if any of the following occurs:

- urgent or crisis cases are routed incorrectly or unclearly
- users consistently interpret outputs as diagnosis despite current safeguards
- privacy incident or unauthorized export occurs
- audit trail becomes incomplete for high-risk workflow steps
- major regression changes risk category or explanation behavior unexpectedly
- partner materials imply live readiness beyond the documented state

## Required Records

Maintain the following artifacts together:

- [Risk register](../risk-register.md)
- [Validation protocol](../validation-protocol.md)
- [Validation summary](validation-summary-2026-05-06.md)
- [Release notes](release-notes-2026-05-06.md)
- [Privacy and security requirements](../privacy-and-security-requirements.md)
- [Pilot strategy](../pilot-strategy.md)

## Immediate Next Actions

- assign named owners to the governance roles before pilot planning
- convert privacy, access control, persistence, and audit requirements into implementation issues
- add a pilot incident response runbook and deployment runbook
- create a new validation summary after the first clinician review cycle
