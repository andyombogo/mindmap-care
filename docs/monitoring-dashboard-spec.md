# Monitoring Dashboard Specification

## Purpose

This specification defines the pilot monitoring dashboard MindMap Care should provide before live pilot use.

It is a product and analytics specification. The current MVP dashboard does not yet implement all indicators listed here.

## Monitoring Goals

- detect safety and follow-up gaps quickly
- show whether screening volume is manageable
- surface missing or invalid data
- track referral completion and unresolved high-risk cases
- monitor technical reliability
- support weekly pilot review meetings

## Core Dashboard Sections

### 1. Usage

| Indicator | Definition | Review cadence |
| --- | --- | --- |
| Screenings submitted | count of completed screenings | daily and weekly |
| Active users | named users who submitted or reviewed records | weekly |
| Site volume | screenings by site or facility | weekly |
| Screening completion time | median time from start to submission | weekly |

### 2. Risk And Safety

| Indicator | Definition | Review cadence |
| --- | --- | --- |
| Risk distribution | low, moderate, high, urgent categories | daily and weekly |
| Urgent cases pending review | urgent cases not yet closed or escalated | same day |
| High-risk unresolved cases | high-risk cases without recorded action | daily |
| Safety incidents | reported unsafe routing, crisis workflow, or harm concerns | immediate and weekly |
| Override rate | proportion of reviewed records with clinician override | weekly |

### 3. Referral And Follow-Up

| Indicator | Definition | Review cadence |
| --- | --- | --- |
| Referral completion rate | referred cases with completed referral outcome | weekly |
| Follow-up completion rate | cases with follow-up status completed | weekly |
| Overdue follow-ups | follow-ups past local target date | daily and weekly |
| Referral destination mix | referrals by receiving service or pathway | weekly |

### 4. Data Quality

| Indicator | Definition | Review cadence |
| --- | --- | --- |
| Missing required fields | records with required field gaps | daily |
| Data completeness score | aggregate completeness by site and role | weekly |
| Correction requests | records requiring correction | weekly |
| Duplicate screening flags | possible duplicate records | weekly |
| Out-of-range values | validation failures or suspicious inputs | weekly |

### 5. Operations And Reliability

| Indicator | Definition | Review cadence |
| --- | --- | --- |
| API error rate | failed backend requests | daily |
| Submission failures | failed screening submissions | daily |
| Audit write failures | failed audit log events | immediate |
| Downtime events | outages or degraded service | immediate and weekly |
| Failed logins | authentication failures | daily |

## Role Views

| Role | View |
| --- | --- |
| Screener | own submitted records and pending correction requests |
| Clinician reviewer | review queue, urgent cases, high-risk cases, assigned follow-ups |
| Supervisor | site-level volume, queue status, follow-up gaps, data quality, incidents |
| Programme lead | aggregate weekly trends, referral completion, implementation issues |
| Admin | user access, errors, audit status, release/version status |

## Alert Thresholds

Draft thresholds for local review:

- urgent case pending human action for more than same-day local target
- high-risk case without recorded action after one working day
- audit log write failure
- screening submission failure rate above 5 percent in a day
- missing required fields above 10 percent in a week
- overdue follow-up rate above 20 percent
- any privacy or safety incident

## Data Sources

Required future sources:

- screening records
- risk summaries
- clinician review actions
- referral records
- follow-up records
- audit events
- authentication events
- backend health checks
- incident reports

## MVP Gap

The current MVP dashboard shows basic synthetic screening volume, risk distribution, referral status, follow-up status, and completeness. Pilot monitoring still requires persistence, access control, audit log retrieval, error monitoring, incident logging, and alert thresholds.
