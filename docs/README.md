# MindMap Care Documentation

This folder contains the shared product, clinical, technical, model, pilot, and governance documentation for MindMap Care.

## Core Documents

- [Product overview](product-overview.md): product purpose, users, value proposition, and MVP framing
- [Clinical workflow](clinical-workflow.md): intended screening, review, triage, and follow-up workflow
- [Technical architecture](technical-architecture.md): frontend, backend, model interface, data, and deployment architecture
- [Risk register](risk-register.md): product, clinical, privacy, bias, safety, and implementation risks
- [Offline and low-bandwidth assumptions](offline-low-bandwidth-assumptions.md): connectivity, shared-device, and future offline-sync boundaries
- [Data dictionary](data-dictionary.md): MVP screening, risk summary, triage, audit, export, and dashboard fields
- [Model card](model-card.md): current mock model position, intended use, limitations, and validation needs
- [Mock scoring rules](mock-scoring-rules.md): plain-language scoring logic and deterministic fixture expectations
- [Validation protocol](validation-protocol.md): clinical, workflow, safety, fairness, and implementation review plan
- [Pilot strategy](pilot-strategy.md): pilot goals, operating model, readiness status, and evidence package
- [Pilot readiness framework](pilot-readiness-framework.md): remaining work map, Phase 5 artifact index, decision gates, and live-pilot blockers
- [Pilot protocol](pilot-protocol.md): site selection, pilot users, inclusion criteria, workflow, success metrics, oversight, and pause rules
- [Pilot deployment plan](pilot-deployment-plan.md): pilot environment, access, data protection, backup, monitoring, release, and rollback plan
- [Training guide](training-guide.md): role-specific onboarding for screeners, clinician reviewers, supervisors, programme leads, and support users
- [Pilot SOPs](pilot-sops.md): screening, review, referral, escalation, correction, downtime, incident, export, and weekly review procedures
- [Consent and governance pack](consent-and-governance.md): consent, retention, access, governance roles, approvals, and local decisions
- [Monitoring dashboard specification](monitoring-dashboard-spec.md): pilot usage, safety, referral, data quality, operations, and alert indicators
- [Feedback collection plan](feedback-collection-plan.md): feedback groups, methods, fields, triage rules, and closeout questions
- [Pilot go/no-go checklist](pilot-go-no-go-checklist.md): launch gate, no-go conditions, and sign-off record
- [Regulatory and ethics notes](regulatory-and-ethics-notes.md): safe-use, privacy, risk, and governance considerations
- [Privacy and security requirements](privacy-and-security-requirements.md): pre-pilot and production requirements for data handling, consent, access, retention, auditability, and operations
- [Trust artifact pack](trust-artifacts/README.md): current validation summary, release notes, and formal risk management process

## Documentation Principles

- Be explicit about what is ready, what is simulated, and what remains unvalidated.
- Preserve the non-diagnostic positioning of the product.
- Treat synthetic demo data as fictional and never as validation evidence.
- Write for clinicians, pilot partners, funders, and technical reviewers.
- Update docs when workflows, API contracts, model behavior, or deployment assumptions change.

## Missing Documents to Add Later

- API reference
- incident response process
