# Regulatory And Ethics Notes

## Current Position

MindMap Care is currently an MVP and product prototype. It should be treated as screening and triage decision support, not a diagnostic or autonomous clinical system.

Regulatory classification will depend on jurisdiction, claims, deployment context, level of automation, and whether outputs influence clinical decisions.

## Core Ethics Principles

MindMap Care should be developed around:

- Human accountability
- Transparency
- Local validation
- Privacy and data minimization
- Fairness and subgroup review
- Clear escalation pathways
- Avoidance of overclaiming
- Respect for patient dignity and consent

## Patient Safety Risks

Key risks include:

- False reassurance from a low-risk output
- Over-referral from false positives
- Missed crisis escalation
- Unsafe use by insufficiently trained staff
- Misinterpretation of explanations
- Inappropriate use as diagnosis
- Incomplete data leading to misleading triage
- Bias across age, sex, language, geography, disability, or facility type

Mitigations should include clear disclaimers, human review, training, audit logs, escalation protocols, and validation before clinical claims.

## Data Protection Considerations

MindMap Care may process sensitive health information.

Data protection requirements should address:

- Consent and lawful basis for processing
- Minimum necessary data collection
- Patient identifier handling
- Secure storage
- Encryption in transit and at rest
- Access controls
- Audit logs
- Retention and deletion rules
- Data sharing agreements
- Cross-border hosting constraints

No real patient data should be committed to this repository.

## Bias And Fairness

The product must be evaluated for differential performance and workflow impact across relevant groups.

Subgroup review may include:

- Age
- Sex and gender where collected appropriately
- Language
- Geography
- Facility type
- Rural or urban setting
- Disability status
- Socioeconomic or access barriers where ethically collected

Fairness review should not be limited to model metrics. It should also examine who receives follow-up, who is missed, and who experiences burden or stigma.

## Explainability Requirements

Explanations should be:

- Plain-language
- Clinically interpretable
- Linked to input signals
- Clear about uncertainty
- Clear about non-diagnostic use
- Useful for action, not just technical justification

Explanations should not imply that the system knows the true diagnosis or cause of a patient's condition.

## Regulatory Readiness Questions

Before pilot expansion, clarify:

- Is the product regulated as software as a medical device in the target country?
- What clinical claims are being made?
- Is the output advisory or directive?
- Who is accountable for final decisions?
- What validation evidence is required?
- What approvals are needed from ethics boards, ministries, institutions, or facility leadership?
- What incident reporting process is required?

## Governance Recommendations

Create a governance process covering:

- Clinical owner
- Technical owner
- Data protection owner
- Model validation owner
- Incident review process
- Change control
- Release notes
- Model card updates
- Pilot partner review

## Safe Communication

External and internal communication should avoid:

- Calling outputs diagnoses
- Claiming clinical accuracy before validation
- Suggesting replacement of clinicians
- Presenting mock scores as clinical risk probabilities
- Downplaying false negatives or false positives

Recommended framing:

MindMap Care supports structured screening, explainable triage, and care navigation under human clinical oversight.
