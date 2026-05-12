# Pilot Go/No-Go Checklist

## Purpose

This checklist defines the launch gate for a controlled MindMap Care pilot.

A pilot should not begin until every critical item is complete, owned, or formally accepted as a managed residual risk by the appropriate governance owner.

## Decision Summary

| Decision | Meaning |
| --- | --- |
| Go | all critical requirements met, residual risks accepted, launch owner assigned |
| Conditional go | limited walkthrough or supervised dry run only; live use still blocked |
| No-go | critical safety, privacy, technical, or governance blocker remains unresolved |

## Product And Workflow

- [ ] intended use approved by local clinical leadership
- [ ] inclusion and exclusion criteria approved
- [ ] local referral pathways documented
- [ ] urgent and crisis escalation pathways documented
- [ ] human review requirements approved
- [ ] non-diagnostic wording visible in training and product surfaces
- [ ] pause criteria understood by clinical and programme owners

## Technical Readiness

- [ ] authentication implemented
- [ ] role-based access control implemented
- [ ] persistent database configured
- [ ] database migrations tested
- [ ] immutable audit log persistence tested
- [ ] frontend and backend deployed to approved environment
- [ ] HTTPS configured
- [ ] secrets managed outside git
- [ ] backup and restore process tested
- [ ] rollback process tested
- [ ] monitoring configured
- [ ] support owner assigned

## Privacy And Governance

- [ ] data protection review completed
- [ ] ethics or institutional review pathway resolved
- [ ] consent wording approved
- [ ] consent recording process tested
- [ ] retention schedule approved
- [ ] export permissions approved
- [ ] incident reporting pathway approved
- [ ] access review completed
- [ ] data sharing rules documented

## Validation And Trust

- [ ] clinician review of sample low, moderate, high, and urgent cases completed
- [ ] explanation clarity reviewed
- [ ] minimum safety thresholds defined
- [ ] performance evaluation dataset pathway identified where available
- [ ] subgroup and fairness review plan approved
- [ ] known limitations visible to users
- [ ] validation summary updated
- [ ] risk register reviewed

## Operations And Training

- [ ] training guide approved
- [ ] screeners trained
- [ ] clinician reviewers trained
- [ ] supervisors trained
- [ ] programme leads briefed
- [ ] downtime procedure tested
- [ ] data correction procedure tested
- [ ] incident drill or tabletop completed
- [ ] weekly review meeting scheduled
- [ ] feedback collection plan active

## No-Go Conditions

The launch should not proceed if any of the following are true:

- no clinical owner is assigned
- no data protection owner is assigned
- no incident owner is assigned
- authentication or role-based access is missing
- audit log persistence is missing
- urgent escalation pathway is missing
- consent process is not approved
- retention schedule is not approved
- users have not been trained
- high-risk workflow messages have not been reviewed
- monitoring cannot detect failed submissions or urgent-case delays

## Sign-Off Record

| Role | Name | Decision | Date | Notes |
| --- | --- | --- | --- | --- |
| Clinical owner | TBD | TBD | TBD | TBD |
| Data protection owner | TBD | TBD | TBD | TBD |
| Technical owner | TBD | TBD | TBD | TBD |
| Validation owner | TBD | TBD | TBD | TBD |
| Programme lead | TBD | TBD | TBD | TBD |

## Current MVP Decision

Current status: no-go for live pilot use.

Reason: the MVP still lacks authentication, role-based access control, persistent database storage, immutable audit logs, approved evaluation evidence, production monitoring, and site-specific governance approvals.
