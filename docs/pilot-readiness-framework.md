# Pilot Readiness Framework

## Purpose

This framework translates the remaining roadmap work into a practical pilot-readiness packet for MindMap Care. It clarifies what is already documented, what still blocks live use, and which artifacts should be reviewed before any controlled pilot.

MindMap Care remains an MVP prototype. This framework supports planning and stakeholder review; it does not approve live clinical deployment.

## Current Readiness Position

| Area | Current status | Remaining blocker before live pilot |
| --- | --- | --- |
| Product scope | Intended use and non-diagnostic positioning documented | Site-specific approval of inclusion, exclusion, referral, and escalation rules |
| Workflow | Screening, triage, review, referral, and follow-up workflow documented | Walkthrough with named pilot site staff and clinical owner |
| Application | MVP frontend and backend support synthetic screening demos | Authentication, role-based access, persistence, immutable audit logs, and deployment monitoring |
| Data and model | Synthetic data, mock scoring rules, model card, and validation protocol documented | Approved evaluation data, clinician review, performance thresholds, and subgroup analysis |
| Privacy and security | Requirements documented | Data protection review, retention approval, access control, backup plan, and incident response owner |
| Pilot operations | Strategy documented | Protocol, training, SOPs, monitoring plan, feedback plan, and go/no-go checklist reviewed with pilot partners |

## Phase 5 Artifact Map

| Roadmap item | Artifact | Readiness use |
| --- | --- | --- |
| Pilot protocol | [Pilot protocol](pilot-protocol.md) | Defines site selection, users, workflow, metrics, support, and pause rules |
| Deployment plan | [Pilot deployment plan](pilot-deployment-plan.md) | Defines target environment, access, data protection, backup, monitoring, and rollback expectations |
| Training materials | [Training guide](training-guide.md) | Gives role-specific onboarding structure and quick-reference content |
| Standard operating procedures | [Pilot SOPs](pilot-sops.md) | Defines daily screening, referral, escalation, downtime, correction, and incident procedures |
| Consent and governance | [Consent and governance pack](consent-and-governance.md) | Defines consent, privacy, ethics, governance, retention, and approval expectations |
| Monitoring dashboard | [Monitoring dashboard specification](monitoring-dashboard-spec.md) | Defines usage, quality, referral, safety, error, and follow-up monitoring indicators |
| Feedback collection | [Feedback collection plan](feedback-collection-plan.md) | Defines who gives feedback, how it is captured, and how it affects decisions |
| Go/no-go checklist | [Pilot go/no-go checklist](pilot-go-no-go-checklist.md) | Provides the launch decision gate and blocker list |

## Remaining Work Framework

### Critical Before Live Pilot

These must be complete before identifiable screening records are handled:

- implement authentication and role-based access control
- add persistent database storage and migrations
- persist immutable audit logs for screening, review, export, override, and access events
- approve consent wording, retention schedule, data protection review, and incident owner
- document local referral, urgent escalation, and crisis response pathways
- complete clinician review of explanations, categories, and high-risk messages
- define minimum acceptable safety, workflow, and performance thresholds

### Important Before Controlled Pilot Launch

These should be complete before the first site starts supervised use:

- configure deployment monitoring, error tracking, backup, rollback, and support ownership
- prepare user accounts, role assignments, and access review process
- run training with screeners, clinician reviewers, supervisors, and programme leads
- test downtime, data correction, incident reporting, and export procedures
- confirm approved evaluation dataset pathway where available
- create issue tracker labels for safety, privacy, validation, deployment, and pilot feedback

### After Early Pilot Walkthroughs

These should be updated once real stakeholder feedback exists:

- validation summary
- risk register
- release notes
- training guide
- SOPs
- monitoring indicators
- backlog priorities

## Decision Gates

| Gate | Minimum evidence |
| --- | --- |
| Internal demo | Synthetic demo data loads, non-diagnostic language visible, core workflow works locally |
| Partner walkthrough | Pilot protocol draft, safe-use framing, feedback plan, and risk register available |
| Controlled pilot preparation | Data protection review, access model, deployment plan, SOPs, training, and go/no-go checklist reviewed |
| Live controlled pilot | Technical blockers resolved, governance approvals recorded, training complete, monitoring active, pause owner assigned |

## How To Maintain This Framework

- Update this framework after each clinical, technical, privacy, or pilot partner review.
- Keep roadmap checkboxes aligned with artifacts that actually exist in the repository.
- Do not mark implementation-dependent controls as live-ready until code, deployment, and operational ownership are in place.
- Treat every pilot artifact as a draft until a named pilot site and governance owner approve it.
