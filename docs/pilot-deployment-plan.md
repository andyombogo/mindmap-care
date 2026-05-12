# Pilot Deployment Plan

## Purpose

This plan defines the minimum deployment expectations for a controlled MindMap Care pilot. It is a target plan; the current MVP does not yet meet all requirements for live use.

## Recommended Pilot Environment

Use a managed cloud environment with separate services for:

- frontend application
- backend API
- relational database
- audit log storage
- secrets management
- monitoring and logs
- backup storage

The pilot environment must be separate from local development and synthetic demo environments.

## Environment Separation

| Environment | Data allowed | Purpose |
| --- | --- | --- |
| Development | synthetic only | local feature work and tests |
| Demo | synthetic only | partner walkthroughs and internal review |
| Staging | synthetic or approved test data | release rehearsal and training |
| Pilot | approved pilot records only | controlled supervised use after governance approval |

## Required Controls Before Pilot Use

- HTTPS/TLS for all traffic
- authentication and named user accounts
- role-based access control for screener, clinician reviewer, supervisor, and admin
- database persistence with migrations
- encrypted storage and backups
- immutable audit log persistence
- environment secrets managed outside git
- deployment monitoring for uptime, errors, and failed requests
- rollback procedure and release notes
- incident owner and support contact

## Access Model

| Role | Minimum access |
| --- | --- |
| Screener | create screenings, view own submitted workflow status where needed |
| Clinician reviewer | review risk summaries, record overrides, referrals, and escalation actions |
| Supervisor | view queues, follow-up gaps, aggregate metrics, and audit summaries |
| Admin | manage users, site configuration, model/ruleset version, and exports |
| Technical support | time-bound troubleshooting access, approved and logged |

## Data Protection

- No production or pilot secrets in source control.
- No real patient data in repository fixtures, screenshots, or issue comments.
- Database, backups, logs, and exports must follow the approved retention schedule.
- Draft reports should be watermarked and access-limited.
- Support access to sensitive data should require approval and audit logging.

## Backup And Recovery

Before launch, define:

- backup frequency
- backup retention period
- restore owner
- restore test schedule
- maximum acceptable data loss
- maximum acceptable recovery time

Minimum expectation:

- daily encrypted backups during pilot
- documented restore test before launch
- rollback procedure for failed application releases

## Monitoring

Operational monitoring should include:

- frontend availability
- backend health checks
- API error rates
- failed authentication attempts
- screening submission failures
- risk scoring failures
- audit log write failures
- export activity
- urgent case review delays
- referral and follow-up gaps

## Release And Rollback

Every pilot release should have:

- release note
- changed files or feature summary
- model or scoring-rule version status
- migration status
- rollback owner
- verification checklist

Rollback is required if a release causes:

- incorrect routing of high-risk or urgent outputs
- audit log write failure
- access control regression
- data corruption or failed submissions
- repeated user-facing errors that block review

## Deployment Checklist

- [ ] Pilot site and environment selected
- [ ] DNS and HTTPS configured
- [ ] Database provisioned
- [ ] Backup plan tested
- [ ] Secrets configured outside git
- [ ] Authentication implemented
- [ ] Role permissions tested
- [ ] Audit log persistence tested
- [ ] Monitoring dashboard configured
- [ ] Incident contact assigned
- [ ] Rollback procedure tested
- [ ] Staging release verified

## Current Blockers

The MVP cannot be deployed for live pilot use until authentication, role-based access control, persistence, audit log storage, monitoring, backups, and incident response ownership are implemented and reviewed.
