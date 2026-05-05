# Risk Register

## Purpose

This register captures the main clinical, ethical, data, privacy, operational, and implementation risks for MindMap Care while it remains an MVP prototype. It should be reviewed before any partner demo, controlled pilot, or change that affects screening, triage, reporting, or data handling.

MindMap Care is not diagnostic. Current scoring uses deterministic mock rules and synthetic data only.

## Review Cadence

| Review moment | Owner | Expected action |
| --- | --- | --- |
| Monthly during MVP development | Product lead | Refresh likelihood, severity, mitigations, and open actions |
| Before partner walkthroughs | Product lead and clinical owner | Check that non-diagnostic language and escalation boundaries are visible |
| Before pilot preparation | Clinical owner, data protection owner, technical owner | Confirm risks have owners, mitigations, and pause criteria |
| After incident, safety concern, or major workflow change | Relevant risk owner | Update risk, document action taken, and decide whether to pause use |

## Severity Scale

| Severity | Meaning |
| --- | --- |
| Low | Limited inconvenience or minor documentation gap |
| Medium | Workflow, trust, or quality issue that could affect safe use if repeated |
| High | Could lead to inappropriate triage, privacy exposure, partner harm, or unsafe workflow behavior |
| Critical | Could contribute to patient harm, crisis mishandling, major data breach, or deployment stoppage |

## Register

| ID | Risk | Severity | Owner | Mitigations | Review cadence | Status |
| --- | --- | --- | --- | --- | --- | --- |
| R-001 | Users interpret mock risk outputs as diagnosis or clinical certainty | Critical | Clinical owner | Keep non-diagnostic language in README, model card, risk summary UI, training, and report exports; require human review for high-risk outputs | Every release | Open |
| R-002 | False reassurance from low-risk output delays needed care | High | Clinical owner | Include caveats, encourage judgment override, define escalation rules when context conflicts with score | Monthly and before pilot | Open |
| R-003 | False positive or over-referral overwhelms limited specialist capacity | High | Programme lead | Track referral load, review thresholds with clinicians, include routine follow-up pathways for moderate cases | Monthly | Open |
| R-004 | Safety or crisis concern is missed, hidden, or routed too slowly | Critical | Clinical owner | Safety flags force urgent category; local crisis pathway must be approved before pilot; urgent cases require same-day human review | Before pilot and after any safety event | Open |
| R-005 | Bias across age, sex, language, geography, disability, site type, or access context | High | Validation owner | Define subgroup review plan, monitor missingness and override patterns, avoid clinical claims before local validation | Validation review cycle | Open |
| R-006 | Missing or invalid data produces misleading triage | High | Technical owner | Data quality score, missing-field flags, structured validation errors, dashboard completeness indicators | Every release | Open |
| R-007 | Real patient data is committed to the repository | Critical | Technical owner | Maintain synthetic-only data guidance, `.gitignore` local data folders, contributor warnings, and review before commits | Every commit touching data | Open |
| R-008 | Sensitive patient identifiers are over-collected or exposed in exports | High | Data protection owner | Minimize identifiers, mark report exports as drafts, define retention and access rules before pilot | Before pilot | Open |
| R-009 | Shared devices expose patient summaries or audit screens to unauthorized users | High | Technical owner | Require authentication before pilot, document shared-device assumptions, avoid persistent sessions in future design | Before pilot | Open |
| R-010 | Users over-rely on automated recommendations instead of clinical judgment | High | Clinical owner | Human-in-the-loop checkpoints, override capture, model limitations in UI and docs, training emphasis | Monthly and training review | Open |
| R-011 | Audit trail is incomplete or mutable during MVP demos | Medium | Technical owner | Current in-memory audit events support traceability demos only; persistent immutable audit logs remain required before pilot | Every release | Open |
| R-012 | Connectivity failures interrupt screening or review workflows | Medium | Product lead | Document low-bandwidth assumptions, design graceful fallbacks, avoid claiming offline support until implemented | Workflow review | Open |
| R-013 | Pilot partner assumes product is production-ready because demo is polished | High | Product lead | Keep MVP/prototype labels, readiness checklist, and not-ready-for-live-use section current | Before demos | Open |
| R-014 | Data retention, consent, and governance expectations are unclear | High | Data protection owner | Add privacy requirements, consent workflow, data retention plan, and governance approvals before pilot | Before pilot | Open |
| R-015 | Model or rule changes are not communicated to reviewers | Medium | Validation owner | Maintain model card, mock scoring rules, release notes, and validation summary templates | Every model/rule change | Open |

## Open Actions

- Assign named people or roles for clinical owner, data protection owner, technical owner, validation owner, product lead, and programme lead before pilot preparation.
- Convert high and critical risks into GitHub issues with acceptance criteria.
- Add pause criteria for crisis-routing concerns, privacy incidents, and unsafe product interpretation.
- Review this register after any clinician feedback session or partner walkthrough.
