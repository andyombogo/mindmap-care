# Synthetic Demo Data

This directory contains fictional MindMap Care screening records for product prototyping, UI development, backend integration tests, and dashboard demos.

The records are synthetic. They do not represent real patients, real screening encounters, real facilities, or real clinical outcomes. Do not use this data for clinical validation, model performance claims, pilot evidence, or operational reporting.

The JSON records are aligned with the backend mock inference interface:

- `screening_id`
- `patient_reference_id`
- `site_id`
- `screener_role`
- `age_years`
- `sex`
- `screening_datetime`
- `consent_confirmed`
- `presenting_concerns`
- `responses`
- `notes`
- `safety_flags`
- `metadata`

Use `demo-screenings.json` when the app needs realistic but safe data for screening examples, triage queue demos, and dashboard metrics.
