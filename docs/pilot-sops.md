# Pilot Standard Operating Procedures

## Purpose

These SOPs define how MindMap Care should be used during a controlled pilot. Site-specific versions must be approved before live use.

## SOP 1: Screening

1. Confirm the user is authorized and using a named account.
2. Confirm the client is eligible for the pilot workflow.
3. Explain that MindMap Care supports screening and triage only.
4. Confirm and record consent.
5. Capture minimum required fields.
6. Complete screening responses.
7. Review validation warnings before submission.
8. Submit the screening.
9. Direct moderate, high, urgent, missing-data, or safety-flagged records to review.

## SOP 2: Risk Summary Review

1. Open the assigned risk summary.
2. Confirm client, site, screening timestamp, and consent status.
3. Review risk category, explanation factors, caveats, and missing-data warnings.
4. Compare output with clinical context.
5. Record one action:
   - accept recommendation
   - override category
   - request correction
   - refer
   - urgent escalate
   - close with routine monitoring
6. Record reason for any override or escalation.
7. Update referral or follow-up status.

## SOP 3: Referral

1. Confirm local referral pathway for the risk category.
2. Record referral destination and responsible staff member.
3. Communicate next steps using approved local language.
4. Update referral status.
5. Track completion until closed or escalated.
6. Flag unresolved high-risk referrals for supervisor review.

## SOP 4: Urgent Escalation

1. Do not wait for dashboard review if immediate safety concern exists.
2. Follow the approved local crisis or urgent referral pathway.
3. Notify the clinical owner or assigned urgent reviewer.
4. Record urgent action taken.
5. Keep the case visible until the urgent review outcome is documented.
6. Report any delay, confusion, or unsafe routing as an incident.

## SOP 5: Data Correction

1. Identify missing, invalid, duplicated, or inconsistent fields.
2. Confirm correction source and responsible staff member.
3. Correct only fields allowed by the pilot data policy.
4. Preserve audit log of original value, corrected value, actor, reason, and timestamp.
5. Re-review risk output if corrected data could change triage action.

## SOP 6: Downtime

1. Confirm whether the issue affects frontend, backend, network, login, or database.
2. Switch to approved manual screening and referral workflow.
3. Notify the technical owner and supervisor.
4. Record downtime start time, affected users, and affected records.
5. Do not back-enter records until the recovery process is approved.
6. Reconcile manual records after recovery according to data correction rules.

## SOP 7: Incident Reporting

Report immediately if any of the following occurs:

- privacy exposure or unauthorized access
- incorrect urgent routing
- user interprets output as diagnosis
- missing audit trail for high-risk action
- failed submission of moderate, high, or urgent record
- unsafe recommendation or unclear escalation language
- repeated downtime affecting follow-up

Incident record should include:

- date and time
- reporter
- affected site and role
- record ID if safe to include
- incident type
- severity
- immediate containment action
- owner
- follow-up decision

## SOP 8: Export And Report Handling

1. Export only when approved for the user role and workflow.
2. Confirm draft/non-diagnostic label is visible.
3. Do not save reports to shared or unmanaged devices.
4. Record export event in audit log.
5. Remove expired local copies according to retention policy.

## SOP 9: End-Of-Week Review

Supervisors should review:

- screening volume
- pending review queue
- urgent and high-risk cases
- referral completion
- follow-up gaps
- missing data
- override reasons
- incidents and downtime
- user feedback

Open actions should be assigned before the next pilot week starts.
