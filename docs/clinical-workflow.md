# Clinical Workflow

## Intended Workflow

MindMap Care supports a human-led screening and triage workflow.

1. A patient or client is screened by a trained staff member.
2. The screener records patient context and structured domain responses.
3. The backend runs mock inference during MVP use.
4. The system returns a risk category, score, explanation, and suggested triage action.
5. A clinician or supervisor reviews higher-risk cases.
6. The care team documents referral, follow-up, escalation, or routine guidance.
7. Facility and programme leads monitor aggregate activity and bottlenecks.

## Screening Intake

The MVP intake form captures:

- Patient identifier
- Age
- Sex
- Screening date
- Facility or programme site
- Screener role
- Mental health assessment fields
- Cognitive assessment fields
- Functional assessment fields
- Clinician notes
- Referral urgency and triage notes

The form is structured so clinical staff can complete it quickly while still capturing enough information for transparent triage.

## Risk Summary Review

The patient risk summary should show:

- Overall risk category
- Score and confidence estimate
- Contributing factors
- Explanation text
- Suggested triage action
- Triage priority and review window
- Audit metadata
- Clear non-diagnostic language

The summary should be reviewed by a human before being treated as operational guidance.

## Triage Queue

The triage queue helps teams prioritize review based on:

- Risk category
- Screening time
- Referral urgency
- Missing data flags
- Follow-up status

This is an operational worklist. It should help answer what needs action today.

## Recommended Human Review Points

Human review is required or strongly recommended when:

- Risk category is urgent or high
- Safety concern is present
- Referral urgency is marked priority or urgent
- Data quality is low or key fields are missing
- The patient has functional impairment plus limited support
- The screener adds contextual concern in notes
- The output conflicts with clinical judgment

## Escalation Boundaries

MindMap Care should not handle emergencies by itself.

If a safety or crisis concern is recorded, the platform should direct users toward the local crisis pathway, urgent clinician review, or facility escalation process. The exact pathway must be configured and approved by the pilot site.

## Documentation Expectations

Every reviewed case should eventually support:

- Who screened the patient
- When screening occurred
- What data was used
- What risk category was generated
- What explanation was shown
- Who reviewed the case
- What action was taken
- Whether follow-up was completed

These records are necessary for clinical governance, pilot evaluation, and trust.
