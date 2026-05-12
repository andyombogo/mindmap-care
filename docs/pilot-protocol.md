# Pilot Protocol

## Purpose

This protocol describes the first controlled pilot structure for MindMap Care. It is a planning artifact for site review and governance preparation, not approval to start live clinical use.

## Pilot Objective

Assess whether MindMap Care can support structured screening, explainable triage, referral coordination, and follow-up monitoring in a supervised African health-system workflow.

The pilot should test feasibility, safety, usability, explanation clarity, workflow fit, and operational value before making any model-performance or clinical-effectiveness claims.

## Candidate Site Profile

The first site should have:

- committed clinical leadership
- manageable screening volume
- existing referral and escalation pathways
- willingness to document user feedback and workflow issues
- ability to assign a data protection or governance contact
- basic internet access for supervised use
- named support contact for downtime and issue reporting

## Pilot Users

| Role | Pilot responsibility |
| --- | --- |
| Screener | Captures consent status and screening responses |
| Clinician reviewer | Reviews moderate, high, urgent, and uncertain outputs |
| Supervisor | Monitors queues, missing data, referral gaps, and user support needs |
| Programme lead | Reviews aggregate trends, operational value, and readiness decisions |
| Technical owner | Maintains deployment, logs, uptime, backups, and incident response |
| Data protection owner | Reviews consent, access, retention, exports, and privacy incidents |

## Inclusion Criteria

Draft criteria for local review:

- adult clients or locally approved age group for the pilot setting
- individuals presenting through a participating facility, outreach programme, university clinic, NGO programme, or care-navigation pathway
- individuals who provide appropriate consent under the approved pilot workflow
- screening domains limited to the pilot-approved use case

## Exclusion Criteria

Draft exclusions for local review:

- clients who decline consent
- emergency cases requiring immediate clinical attention before digital screening
- individuals outside the pilot-approved age group or care pathway
- cases where local language, capacity, safety, or privacy constraints prevent appropriate screening
- any use case requiring diagnosis, treatment assignment, or autonomous decision-making

## Pilot Workflow

1. Screener confirms consent and records minimum required intake fields.
2. Screener completes the structured screening form.
3. System generates a non-diagnostic risk category, explanation factors, caveats, and recommended human action.
4. Low-risk outputs receive local routine advice or monitoring guidance.
5. Moderate, high, urgent, missing-data, or safety-flagged outputs are routed to human review.
6. Clinician reviewer confirms, overrides, escalates, or records referral action.
7. Supervisor tracks pending reviews, referral outcomes, follow-up status, and missing data.
8. Programme lead reviews aggregate operational metrics during scheduled pilot check-ins.

## Success Measures

| Domain | Measures |
| --- | --- |
| Workflow feasibility | screenings completed, completion time, pending queue volume, downtime events |
| Safety | urgent-case review time, crisis pathway adherence, unsafe-output reports, pause events |
| Trust | explanation clarity, clinician confidence, override rate, override reasons |
| Data quality | missing required fields, invalid values, correction requests, completeness trend |
| Follow-up | referral completion, follow-up completion, unresolved high-risk cases |
| Implementation | training time, support requests, user burden, workflow fit |

## Minimum Oversight

- A named clinical owner can pause or modify pilot use.
- A named technical owner can pause deployment, revoke access, or roll back changes.
- A named data protection owner can review incidents, exports, and retention questions.
- All moderate, high, urgent, and safety-flagged outputs require human review.
- No output should be treated as diagnosis or autonomous treatment guidance.

## Pause Criteria

Pause pilot use if any of the following occurs:

- urgent or crisis cases are routed incorrectly or delayed
- users interpret outputs as diagnosis despite training and UI copy
- privacy incident or unauthorized access occurs
- audit trail is incomplete for high-risk workflow steps
- repeated workflow confusion changes clinical action
- deployment instability prevents safe review or follow-up

## Evidence To Capture

- screening counts by site, role, and week
- review queue status
- referral and follow-up outcomes
- user feedback logs
- safety and incident logs
- data quality summaries
- explanation review notes
- release notes and configuration changes

## Open Decisions Before Launch

- selected site and local clinical owner
- approved screening domains
- approved inclusion and exclusion criteria
- consent wording and language
- retention schedule
- referral and urgent escalation pathways
- support hours and downtime owner
- go/no-go decision authority
