# Release Notes

## Release Snapshot

- Date: 2026-05-06
- Release type: roadmap follow-through and trust-documentation milestone
- Repository state: MVP prototype, synthetic-data only

## Included In This Milestone

- added a production-facing [privacy and security requirements](../privacy-and-security-requirements.md) document covering data minimization, consent, access control, retention, auditability, infrastructure, and incident expectations
- added a trust artifact pack for validation summaries, release notes, and risk management
- published an initial MVP validation summary for reviewers
- published a formal risk management plan for governance and escalation handling
- updated the root README, docs index, roadmap, and backlog to reference the new trust and privacy artifacts

## Why This Matters

- reviewers now have a clearer line between what the MVP already does and what must exist before a real pilot
- privacy and security expectations are written down instead of being implied across scattered documents
- change communication now has a defined home for future stakeholder-facing releases

## Safe-Use Reminder

- the mock scoring engine is still deterministic prototype logic, not a clinically validated model
- synthetic demo data remains the only supported repository data
- the product still lacks authentication, persistent audit logs, and live-deployment protections

## Known Gaps After This Release

- no approved evaluation dataset is available in the repository
- no database-backed storage or migrations are implemented yet
- no role-based access control is implemented yet
- no production deployment runbook or incident response runbook is finalized yet

## Reviewer Follow-Up

- use the [validation summary](validation-summary-2026-05-06.md) for readiness discussions
- use the [risk management plan](risk-management-plan.md) with the [risk register](../risk-register.md) during roadmap and pilot reviews
- convert the documented privacy and security requirements into implementation issues before any live pilot planning
