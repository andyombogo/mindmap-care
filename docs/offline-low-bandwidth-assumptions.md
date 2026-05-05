# Offline, Low-Bandwidth, And Shared-Device Assumptions

## Purpose

MindMap Care is intended for health delivery environments where connectivity, device access, and user time may be constrained. This document defines current assumptions so the MVP does not overclaim offline readiness.

Current status: the MVP is online-first. It has fallback demo states, but it does not yet support secure offline data capture or sync.

## Target Contexts

- Primary care clinics with intermittent internet
- Community outreach sessions using tablets or shared laptops
- NGO or county programme offices with limited IT support
- Facilities where multiple staff members may use one workstation
- Review workflows where clinicians may open dashboards on shared office devices

## Current MVP Assumptions

| Area | Assumption | Current support |
| --- | --- | --- |
| Screening intake | User has an active connection to submit a screening to the backend | Supported online only |
| Risk scoring | Mock scoring runs on the backend after submission | Supported online only |
| Dashboard | Dashboard depends on backend summary endpoint or static fallback data | Supported with demo fallback |
| Triage queue | Queue depends on backend seeded or submitted records | Supported online with static fallback |
| Risk summary | Summary loads from the backend or a static demo placeholder | Supported online with fallback |
| Report export | Export action records a draft audit event through the backend | Supported online only |
| Audit trail | Audit events live in memory and reset on backend restart | Demo only |
| Authentication | No real session management exists yet | Not implemented |
| Offline sync | No local encrypted queue or conflict resolution exists yet | Not implemented |

## Low-Bandwidth Design Rules

- Keep core screens text-first and lightweight.
- Avoid large media assets in clinical workflow screens.
- Keep API responses compact and explicit.
- Show clear loading, empty, fallback, and error states.
- Allow users to retry failed API actions without re-entering all context where possible.
- Avoid implying that a submitted action was saved unless the backend confirms it.
- Use dashboard summaries instead of large raw record tables for routine programme monitoring.

## Shared-Device Safety Assumptions

Before any live pilot, shared-device use requires:

- authentication and role-based access
- short session timeout for shared workstations
- explicit sign-out control
- no real patient identifiers in browser-stored demo data
- protection against showing one user's previous patient summary to another user
- audit events for summary views, reviews, overrides, and report exports
- training that users should not leave patient summaries visible on shared screens

The current MVP should only be used with synthetic data in shared-device demos.

## Future Offline Requirements

Offline or low-connectivity support should not be added casually because it changes privacy, safety, and audit responsibilities.

Minimum future requirements:

- encrypted local draft storage
- clear unsynced-record indicators
- conflict handling when records are edited on multiple devices
- sync audit trail for created, updated, failed, and retried submissions
- retention limit for local drafts
- ability to discard local drafts safely
- device-level access controls and training
- pilot-site approval for any offline workflow

## Product Boundaries

MindMap Care should not claim offline support until:

- offline capture has been implemented and tested
- local data is encrypted
- sync failures are visible and recoverable
- audit trail behavior is defined
- shared-device risks are reviewed by the data protection owner
- clinical owners approve how delayed scoring or delayed referral routing will be handled

## Open Questions

- Which pilot settings require true offline capture rather than low-bandwidth optimization?
- What is the maximum acceptable delay between screening and risk scoring?
- Should community outreach workflows collect full screening data offline, or only pre-screening notes?
- Which patient identifiers are acceptable on shared devices?
- Who is responsible for clearing or syncing devices after outreach sessions?
