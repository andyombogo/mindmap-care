# Data Dictionary

## Purpose

This dictionary describes the MVP data objects used by MindMap Care for screening intake, mock scoring, explainability, triage, audit events, and dashboard summaries. It is intended for developers, clinical reviewers, validation partners, and pilot planners.

Current status: fields are for synthetic/demo data and API contract development. They are not a final production data model.

## Screening Submission

Source: `POST /api/v1/screenings`

| Field | Type | Required | Description | Notes |
| --- | --- | --- | --- | --- |
| `patient_reference_id` | string or null | No | Local patient or client reference shown in review screens | Avoid direct identifiers in demos |
| `site_id` | string | Yes | Facility, outreach, programme, or demo site identifier | Minimum length 1 |
| `screener_role` | enum | Yes | Role submitting the screening | `community_health_worker`, `nurse`, `clinician`, `researcher`, `other` |
| `age_years` | integer or null | No | Patient age in years | Valid range 0 to 120 |
| `sex` | enum or null | No | Recorded sex value for demo workflows | `female`, `male`, `intersex`, `unknown` |
| `consent_confirmed` | boolean | Yes | Whether consent has been confirmed for this screening workflow | Required for all submissions |
| `presenting_concerns` | list of strings | No | Short concern labels captured at intake | Used in queue concern summaries |
| `responses` | list of response items | No | Structured screening question responses | Empty responses create a data-quality placeholder |
| `notes` | string or null | No | Screener notes or clinical context | Must not contain real patient data in repo demos |

## Screening Response Item

| Field | Type | Required | Description | Notes |
| --- | --- | --- | --- | --- |
| `code` | string | Yes | Stable question or response code | Used for missing-field flags |
| `label` | string | Yes | Human-readable response label | Shown in clinical review context where needed |
| `value` | string, number, boolean, or null | No | Captured response value | Numeric non-negative values feed mock scoring |
| `domain` | string | Yes | Screening domain | Examples: `mental_health`, `cognition`, `function`, `safety` |

## Mock Risk Summary

Source: `/api/v1/screenings/{screening_id}/risk-summary`

| Field | Type | Description |
| --- | --- | --- |
| `screening_id` | string | Generated or seeded screening identifier |
| `risk_score_id` | string | Generated score identifier for traceability |
| `patient_reference_id` | string or null | Submitted local patient reference |
| `display_id` | string | Identifier shown in frontend screens |
| `age_years` | integer or null | Submitted age |
| `sex` | string | Submitted sex or `unknown` |
| `site_id` | string | Submitted facility or programme site |
| `screener_role` | string | Submitted screener role |
| `screened_at` | ISO datetime | Screening timestamp |
| `risk_category` | enum | `low`, `moderate`, `high`, or `urgent` |
| `score` | number | Mock score from 0 to 100 |
| `confidence` | number | Mock confidence from 0 to 1 |
| `recommended_action` | string | Suggested human action for triage workflow |
| `requires_human_review` | boolean | Whether clinician review is required |
| `triage_priority` | string | Priority label shown in summary and queue |
| `triage_window` | string | Suggested review or follow-up window |
| `review_status` | string | Current clinician review status |
| `assigned_to` | string | Current review owner or queue |
| `last_reviewed_at` | ISO datetime or null | Last saved review timestamp |
| `last_reviewed_by` | string or null | Last reviewer or assigned actor |
| `summary` | string | Plain-language result summary |
| `explanation_text` | string | Explanation shown to reviewers |
| `contributing_factors` | list | Main factors behind the mock risk result |
| `caveats` | list of strings | Non-diagnostic limitations and review reminders |
| `model_id` | string | Mock engine or model identifier |
| `model_version` | string | Mock engine version |
| `generated_at` | ISO datetime | Summary generation timestamp |
| `data_quality_score` | number | Score from 0 to 1 based on missingness and captured context |
| `missing_fields` | list of strings | Missing or incomplete field identifiers |
| `report_status` | string | Draft report status for export workflow |

## Contributing Factor

| Field | Type | Description |
| --- | --- | --- |
| `name` | string | Factor label |
| `domain` | string | Domain connected to the factor |
| `direction` | string | Whether the factor increases or lowers concern |
| `contribution` | number | Relative contribution from 0 to 1 |
| `description` | string | Plain-language explanation |

## Triage Queue Item

Source: `/api/v1/screenings/triage-queue`

| Field | Type | Description |
| --- | --- | --- |
| `screening_id` | string | Screening identifier used to open the risk summary |
| `patient_reference_id` | string or null | Local patient reference, if supplied |
| `display_id` | string | Patient or screening label shown in the queue |
| `site_id` | string | Facility or programme site |
| `risk_category` | enum | `low`, `moderate`, `high`, or `urgent` |
| `risk_score` | number | Mock risk score |
| `triage_priority` | string | Priority label |
| `triage_window` | string | Recommended review timing |
| `referral_urgency` | string | Operational referral urgency label |
| `recommended_action` | string | Action text shown in queue |
| `follow_up_status` | enum | `overdue`, `pending`, `scheduled`, or `complete` |
| `missing_data_flags` | list of strings | Missing data indicators |
| `requires_human_review` | boolean | Whether human review is required |
| `screened_at` | ISO datetime | Screening timestamp |
| `owner` | string | Queue owner or facility team |
| `concern_summary` | string | Short concern summary from intake |

## Clinician Review

Source: `POST /api/v1/screenings/{screening_id}/review`

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `actor` | string | Yes | Reviewer name, role, or queue label |
| `decision` | enum | Yes | `confirm_current_triage`, `escalate_urgency`, `reduce_urgency`, or `hold_for_more_context` |
| `assigned_to` | string | Yes | Handoff owner or review queue |
| `note` | string or null | No | Review note or disposition context |

## Report Export

Source: `POST /api/v1/screenings/{screening_id}/report-export`

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `actor` | string | Yes | User or role requesting export |
| `export_format` | enum | No | `print`, `pdf`, or `html`; defaults to `print` |
| `note` | string or null | No | Optional export context |

The current export workflow records a draft report export audit event. It does not yet generate a finalized clinical document.

## Audit Event

| Field | Type | Description |
| --- | --- | --- |
| `event_id` | string | Generated audit identifier |
| `screening_id` | string | Screening tied to the event |
| `event_type` | enum | `screening_submitted`, `risk_scored`, `summary_viewed`, `review_saved`, `override_recorded`, or `report_exported` |
| `actor` | string | User, role, or system component responsible |
| `occurred_at` | ISO datetime | Event timestamp |
| `detail` | string | Human-readable event detail |
| `metadata` | object | Structured event metadata |

## Dashboard Summary

Source: `/api/v1/dashboard/summary`

| Field | Type | Description |
| --- | --- | --- |
| `total_screenings` | integer | Total records in the demo store |
| `high_risk_cases` | integer | High plus urgent cases |
| `medium_risk_cases` | integer | Moderate-risk cases |
| `low_risk_cases` | integer | Low-risk cases |
| `urgent_referrals` | integer | Urgent-risk cases |
| `pending_follow_ups` | integer | Follow-ups not marked complete |
| `completed_referrals` | integer | Records marked complete |
| `risk_distribution` | object | Counts by risk category |
| `average_data_quality_score` | number | Mean data quality score from 0 to 1 |
| `data_complete_records` | integer | Records without tracked missing fields |
| `records_with_missing_data` | integer | Records with one or more missing fields |
| `most_common_missing_fields` | list | Top missing fields and counts |

## Data Handling Rules

- Do not commit real patient data, private operational data, or production exports.
- Use synthetic or explicitly approved de-identified data only.
- Treat `patient_reference_id`, notes, report exports, and audit metadata as sensitive in real deployments.
- Add authentication, access control, retention, encryption, and audit persistence before pilot use.
- Update this dictionary whenever schemas, API contracts, or dashboard metrics change.
