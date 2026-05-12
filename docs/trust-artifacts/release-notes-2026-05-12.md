# Release Notes

## Release Snapshot

- Date: 2026-05-12
- Release type: pilot-readiness documentation milestone
- Repository state: MVP prototype, synthetic-data only

## Included In This Milestone

- added a [pilot readiness framework](../pilot-readiness-framework.md) that maps the remaining roadmap work to concrete artifacts and blockers
- added a [pilot protocol](../pilot-protocol.md) covering site selection, users, inclusion criteria, workflow, metrics, oversight, and pause rules
- added a [pilot deployment plan](../pilot-deployment-plan.md) covering environment separation, access control, backups, monitoring, and rollback expectations
- added a [training guide](../training-guide.md) for screeners, clinician reviewers, supervisors, programme leads, and technical support
- added [pilot SOPs](../pilot-sops.md) for screening, review, referral, urgent escalation, correction, downtime, incidents, exports, and weekly review
- added a [consent and governance pack](../consent-and-governance.md)
- added a [monitoring dashboard specification](../monitoring-dashboard-spec.md)
- added a [feedback collection plan](../feedback-collection-plan.md)
- added a [pilot go/no-go checklist](../pilot-go-no-go-checklist.md)
- updated the README, docs index, backlog, and roadmap so Phase 5 documentation is discoverable

## Safe-Use Reminder

- MindMap Care is still not ready for live clinical deployment.
- The current scoring layer remains deterministic mock logic, not a validated clinical model.
- The repository still uses synthetic demo records only.
- Live pilot use remains blocked until authentication, role-based access control, persistence, immutable audit logging, deployment monitoring, and governance approvals are complete.

## Known Gaps After This Release

- no approved retrospective or prospective evaluation dataset is included
- no authentication or role-based access control is implemented
- no persistent database or immutable audit log is implemented
- no production monitoring dashboard is implemented
- no selected pilot site has approved the protocol, consent language, escalation pathways, or retention schedule
- no clinician review cycle has been completed against real or approved evaluation data

## Reviewer Follow-Up

- use the pilot readiness framework as the single map for what remains before live pilot use
- convert critical blockers into implementation issues before any site launch planning
- update the validation summary after the first clinician review cycle or approved dataset review
