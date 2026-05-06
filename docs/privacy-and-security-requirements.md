# Privacy And Security Requirements

## Purpose

This document defines the minimum privacy and security requirements MindMap Care must meet before any controlled pilot or production handling of real screening records.

It does not mean those controls are already implemented in the MVP. The current repository still uses synthetic demo data and remains unsuitable for live clinical deployment.

## Scope

These requirements apply to:

- screening intake responses
- identifiable patient or client details
- referral and follow-up records
- clinician review notes and overrides
- audit logs and exported reports
- infrastructure, backups, and support workflows that can access the above

## Current Position

MindMap Care is still an MVP prototype:

- no authentication or role-based access control is implemented yet
- no persistent production database is in place
- no immutable audit log is in place
- no production incident response workflow is implemented in code
- no real patient data should be entered into this repository or local demo environment

This document exists to make the target operating standard explicit before pilot preparation.

## Privacy And Security Principles

- Collect the minimum data necessary for screening, triage, referral, and follow-up.
- Keep the product non-diagnostic and avoid storing unnecessary narrative detail.
- Separate demo, testing, staging, and pilot environments.
- Restrict access according to role, site, and operational need.
- Preserve a trustworthy audit trail for screening, review, override, export, and access events.
- Define retention, deletion, and backup expectations before any live deployment.
- Treat shared-device and low-connectivity workflows as privacy-sensitive by default.

## Data Classification

| Data class | Examples | Handling expectation |
| --- | --- | --- |
| Public | repository docs, synthetic screenshots, architecture notes | may remain in git if no real identifiers are present |
| Internal operational | deployment configs, non-secret environment defaults, workflow metrics | restrict to project contributors and authorized operators |
| Sensitive screening metadata | facility, referral status, follow-up status, language, timestamps | protect in transit and at rest; role-based access required |
| Personally identifiable information | names, phone numbers, medical record numbers, exact birth dates, free-text notes that identify a person | collect only when required, encrypt at rest, restrict by role, exclude from exports unless necessary |
| High-risk safety information | crisis flags, suicidal ideation concerns, safeguarding notes, emergency contact details | highest access restrictions, urgent auditability, controlled export and retention rules |

## Minimum Requirements

### 1. Data Minimization

- Do not collect direct identifiers unless the workflow clearly requires them for follow-up or referral.
- Prefer programme IDs or facility-generated record IDs over national identifiers where feasible.
- Avoid open-ended text fields unless they are operationally necessary and reviewed for privacy risk.
- Separate operational identifiers from scoring features whenever possible.
- Do not store uploaded documents, images, or recordings in the MVP unless a specific approved use case exists.

### 2. Consent And Lawful Use

- Every live screening workflow must define who obtains consent, how it is recorded, and when screening should stop if consent is not granted.
- Consent language must explain that MindMap Care is a screening and triage support tool, not a diagnostic system.
- The workflow must document whether the legal basis is consent, clinical care, public health activity, research approval, or another approved basis.
- Consent status, version of consent wording, and timestamp should be captured in the audit trail for live use.
- If a programme involves minors or vulnerable adults, a site-specific consent and safeguarding review is required before launch.

### 3. Identity, Authentication, And Access Control

- Every pilot or production user must have a named account. Shared credentials are not acceptable.
- Role-based access control must exist at minimum for `screener`, `clinician_reviewer`, `supervisor`, and `admin`.
- Access should also be limited by site, programme, or facility where relevant.
- Administrators and supervisors should use stronger authentication than frontline demo access, ideally including multi-factor authentication.
- Session timeout and re-authentication rules must be defined for shared devices.
- Users should only see the minimum fields necessary for their role.
- Access to exports, audit logs, and configuration should be restricted to explicitly approved roles.

### 4. Encryption And Secret Management

- All live traffic must use HTTPS/TLS between browser, API, and backing services.
- Sensitive data at rest must be encrypted using platform-supported storage encryption.
- Secrets must not be committed to git, bundled into images, or stored in plain text shared folders.
- Environment secrets should be managed using the deployment platform's secret store or an equivalent managed vault.
- Backup copies containing sensitive records must inherit the same encryption and access requirements as the primary database.

### 5. Logging And Auditability

- Audit logs must capture who did what, when, where, and against which record.
- Minimum audit events:
  - screening submitted
  - risk score generated
  - risk summary viewed
  - clinician override created or changed
  - referral action recorded
  - report exported
  - record corrected
  - access denied event
  - configuration or model/ruleset change
- Audit entries should include actor ID, role, site, request ID, timestamp, action type, target record ID, and outcome.
- Audit logs must be append-only in the pilot or production environment.
- Audit logs should be retained longer than routine screening records where local policy allows.

### 6. Data Retention And Deletion

Retention must be agreed with the pilot partner, governance lead, and legal or ethics reviewers before launch.

Recommended starting expectations:

| Record type | Default expectation before local approval |
| --- | --- |
| Synthetic demo records | may remain in repo if clearly fictional |
| Local developer test data | delete after local testing; do not sync to shared folders if sensitive |
| Screening records with identifiers | shortest period compatible with care and reporting obligations; define per pilot |
| Audit logs | retain longer than editable workflow records to preserve accountability |
| Draft exports | expire quickly, watermark as draft, and avoid uncontrolled local copies |
| Backups | encrypted, access-limited, and deleted according to approved retention schedule |

Required retention controls:

- documented retention schedule by record type
- documented deletion owner and deletion method
- backup retention and restore testing plan
- procedure for correcting or removing records when policy requires it
- special handling for legal hold, incident review, or safeguarding escalation

### 7. Shared-Device And Low-Connectivity Controls

- Devices used in clinics or outreach settings must have screen-lock expectations and supervised sign-out behavior.
- Browsers should not persist sensitive form drafts without an approved offline design.
- Cached pages, downloaded exports, and print files should be minimized.
- If offline capture is later introduced, it must define local encryption, sync conflict handling, device loss response, and local retention limits before release.

### 8. Infrastructure And Operations

- Separate environments must exist for development, staging, and live deployment.
- Production or pilot data must never be mixed with demo seed data.
- Backup, restore, log review, and rollback procedures must be written and tested.
- Dependencies and container images should have an update and vulnerability review cadence.
- Monitoring should include service availability, error rates, failed logins, export activity, and high-risk workflow events.
- Support access to live data must be time-bound, approved, and logged.

### 9. Incident And Breach Handling

- A named incident owner must exist before pilot launch.
- Privacy or safety incidents must have a documented escalation path, including who can pause use.
- The team must define severity levels for unauthorized access, mistaken disclosure, data loss, and unsafe workflow behavior.
- Incident records should capture timeline, impact, containment action, notification obligations, and preventive follow-up.
- Any incident involving crisis workflow failure or unauthorized disclosure of identifiable records should trigger immediate review of continued use.

## Go/No-Go Requirements Before Pilot

MindMap Care should not enter a live pilot until all of the following are true:

- authentication and role-based access control are implemented
- persistent storage and backup strategy are in place
- audit log persistence is implemented and reviewable
- retention schedule is approved
- consent workflow is approved
- deployment secrets are managed outside the repository
- incident reporting owner and pause authority are assigned
- data export controls are documented
- local legal, ethics, and governance expectations are identified

## Evidence To Maintain

The following supporting artifacts should exist and stay current:

- [Risk register](risk-register.md)
- [Regulatory and ethics notes](regulatory-and-ethics-notes.md)
- [Technical architecture](technical-architecture.md)
- [Pilot strategy](pilot-strategy.md)
- [Trust artifact pack](trust-artifacts/README.md)

## Immediate Follow-On Implementation Work

These requirements translate into the next engineering and operational tasks:

- implement authentication and role-based access control
- add persistent storage and migration tooling
- persist audit logs and expose review endpoints
- add secrets management and deployment configuration checklist
- define pilot retention schedule and deletion workflow
- add incident response and privacy event runbook
