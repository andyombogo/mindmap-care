# Pilot Strategy

## Pilot Goal

The first pilot should test whether MindMap Care can support structured screening, explainable triage, and follow-up coordination in a real care workflow.

The pilot should not be designed to prove broad clinical effectiveness immediately. It should first evaluate usability, workflow fit, safety, feasibility, and trust.

## Candidate Pilot Settings

Potential pilot environments:

- Primary care clinic
- Community health outreach programme
- Mental health integration programme
- University or research clinic
- NGO-supported care navigation programme
- County or district health facility

The best first site is one with committed clinical leadership, manageable patient volume, clear referral pathways, and a willingness to document feedback.

## Pilot Users

Pilot users may include:

- Nurses
- Clinical officers
- Community health workers
- Mental health coordinators
- Supervising clinicians
- Programme managers
- Monitoring and evaluation staff

## Pilot Scope

Recommended initial scope:

- One to three sites
- Small number of trained users
- Limited screening domains
- Clear inclusion criteria
- Human review for all moderate, high, and urgent outputs
- Manual confirmation of referral and follow-up actions
- No autonomous decision-making

## Success Measures

Operational measures:

- Number of screenings completed
- Time to complete screening
- Number of cases reviewed
- Referral completion rate
- Follow-up completion rate
- Missing data rate
- User-reported workflow burden

Trust and safety measures:

- Clinician understanding of explanations
- Override frequency and reasons
- Cases where output felt unsafe or inappropriate
- False reassurance concerns
- Escalation handling
- Patient privacy incidents

Implementation measures:

- Training time
- Technical downtime
- Support requests
- Connectivity issues
- Data quality issues
- Fit with existing referral pathways

## Pilot Readiness Checklist

Before pilot launch:

- Intended use is approved by clinical leadership
- Non-diagnostic positioning is clear
- Local referral and escalation pathways are documented
- User training materials are prepared
- Data protection review is completed
- Consent process is defined
- Incident reporting process is defined
- Support owner is identified
- Pilot metrics are agreed
- Data collection and retention plan is approved

## MVP Pilot-Readiness Status

The current repository is ready for internal walkthroughs and partner-facing workflow review, but not for live clinical use.

Ready for demo review:

- Synthetic screening records load by default for dashboard, triage queue, and risk summary walkthroughs
- Screening submission can call the backend and return a deterministic mock risk result
- Triage pages clearly support clinician review rather than autonomous decisions
- Documentation states the non-diagnostic, validation-dependent positioning
- Backend tests cover endpoint behavior, schema validity, demo data seeding, and mock inference

Not ready for live pilot use:

- No authentication or role-based access control
- No persistent database or immutable audit trail
- No validated clinical model or local performance evidence
- No production data protection assessment
- No incident reporting, override logging, or deployment monitoring workflow

Use this status section as a living checklist. Each item should be converted into a tracked issue before a real-world pilot.

## Pilot Operating Model

During the pilot:

- Start with supervised use
- Review early cases frequently
- Hold weekly implementation check-ins
- Track issues in a structured log
- Review explanations with clinicians
- Monitor missing data and follow-up completion
- Pause use if safety concerns emerge

## Evidence Package

At the end of a pilot, prepare:

- Workflow summary
- Usage metrics
- User feedback
- Safety and incident summary
- Data quality report
- Referral and follow-up results
- Model output review
- Recommendations for next phase

The evidence package should support a decision about whether to continue, redesign, validate further, or stop.
