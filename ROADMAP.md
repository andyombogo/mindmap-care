# MindMap Care Roadmap

MindMap Care is being developed as an explainable AI screening and triage platform for mental health, cognitive, and functional risk stratification in African health systems. This roadmap keeps the work practical: define the product clearly, design clinical workflows before overbuilding, validate model behavior, and move toward pilots only when safety, trust, and operational readiness are in place.

## Phase 0: Product Definition

### Objective

Define the clinical, operational, and ethical boundaries for MindMap Care before building the core product.

### Deliverables

- Clear product brief describing the target conditions, screening use cases, and triage decisions supported by the platform.
- Initial user personas for primary care clinicians, community health workers, mental health specialists, program managers, and health system administrators.
- Prioritized problem statements for African health system contexts, including workforce constraints, referral bottlenecks, stigma, low specialist coverage, and variable data availability.
- Definition of intended use, clinical disclaimers, non-diagnostic positioning, and escalation boundaries.
- Initial list of target settings, such as primary care clinics, community outreach programs, hospitals, universities, NGOs, and county or ministry programs.
- Risk register covering clinical harm, bias, privacy, overreliance, false reassurance, data misuse, and implementation failure.

### Exit Criteria

- The product scope is narrow enough to guide MVP decisions.
- The platform is explicitly positioned as screening and triage support, not diagnosis or replacement of clinical judgment.
- Stakeholders can explain who the product serves, what decision it supports, and what it must not do.
- Top clinical, data, privacy, and deployment risks are documented.

## Phase 1: Workflow Design

### Objective

Design real-world screening and triage workflows that fit into African health delivery environments.

### Deliverables

- End-to-end workflow maps for patient intake, screening, risk scoring, explanation review, referral, follow-up, and reporting.
- Role-based workflow definitions for community health workers, nurses, clinicians, supervisors, and administrators.
- Triage categories and action pathways, such as low risk, monitor, refer, urgent referral, and crisis escalation.
- Draft screening journey for mental health, cognitive risk, and functional impairment use cases.
- Human-in-the-loop review points for clinician override, referral confirmation, and risk escalation.
- Offline, low-bandwidth, and shared-device usage assumptions.
- Data capture requirements, including required fields, optional fields, consent status, language, location, referral outcome, and follow-up status.

### Exit Criteria

- A user can move through the proposed MVP workflow without ambiguity.
- Every risk output has a corresponding recommended human action.
- The workflow supports practical constraints such as limited connectivity, busy clinics, and non-specialist users.
- The product team can distinguish MVP workflow requirements from future enhancements.

## Phase 2: Data And Model Layer

### Objective

Build a transparent, auditable data and model foundation that can support explainable screening and triage.

### Deliverables

- Data dictionary for screening responses, demographic context, functional indicators, referral metadata, and outcome labels.
- Synthetic or de-identified seed datasets for local development and UI testing.
- Initial risk stratification approach, starting with interpretable baseline models and rules before advanced machine learning.
- Model card template describing intended use, limitations, training data, fairness considerations, and evaluation results.
- Explainability layer that surfaces the main factors contributing to a risk result in plain language.
- Backend API contracts for screening submission, risk scoring, explanation retrieval, and audit logging.
- Data quality checks for missingness, invalid values, inconsistent responses, duplicate records, and out-of-range inputs.
- Privacy and security requirements for personally identifiable information, consent, access control, and data retention.

### Exit Criteria

- The model layer can produce a reproducible risk category and explanation from a valid screening record.
- Outputs are traceable to model version, input version, and scoring logic.
- Data assumptions and known limitations are visible to developers and clinical reviewers.
- The system can run safely with synthetic or non-sensitive development data.

## Phase 3: MVP Application

### Objective

Deliver a working MVP application that demonstrates the core screening, explainability, triage, and reporting experience.

### Deliverables

- Next.js frontend for screening intake, risk result review, explanation display, referral guidance, and basic dashboards.
- FastAPI backend for health checks, screening APIs, scoring orchestration, configuration, and audit logging.
- Local development setup using Docker Compose for frontend and backend services.
- Role-aware interface patterns for frontline users and administrators.
- MVP dashboard showing screening volume, risk distribution, referral status, follow-up status, and data completeness.
- Environment templates for local configuration without committing secrets.
- Automated smoke tests for backend health, scoring endpoints, and frontend build integrity.
- Clear README setup instructions for developers and pilot collaborators.

### Exit Criteria

- A developer can start the MVP locally from documented setup commands.
- A user can complete a screening, receive a risk category, view an explanation, and see recommended triage action.
- Basic operational dashboards reflect submitted screening data.
- The application has enough tests and structure to support safe iteration.

## Phase 4: Validation And Trust

### Objective

Evaluate whether MindMap Care is clinically sensible, explainable, fair, and trustworthy enough for controlled pilot preparation.

### Deliverables

- Validation plan covering clinical review, model performance, workflow usability, fairness, and implementation feasibility.
- Test datasets or retrospective datasets approved for evaluation where available.
- Metrics for sensitivity, specificity, positive predictive value, negative predictive value, calibration, missingness robustness, and subgroup performance.
- Explainability review protocol for clinicians and frontline users.
- Bias and fairness review across age, gender, language, geography, facility type, and other locally relevant variables.
- Safety review of crisis escalation pathways and high-risk outputs.
- Documentation of known failure modes, edge cases, and recommended mitigations.
- Trust artifacts, including model cards, validation summaries, release notes, and risk management documentation.

### Exit Criteria

- Clinical reviewers agree that outputs are understandable and action-oriented.
- Validation results are documented with limitations and subgroup analysis.
- The team has identified minimum acceptable performance thresholds for pilot use.
- High-risk workflows and escalation messages have been reviewed for safety.

## Phase 5: Pilot Readiness

### Objective

Prepare the product, operations, documentation, and governance needed for a small controlled pilot.

### Deliverables

- Pilot protocol describing site selection, users, inclusion criteria, workflow, success metrics, and support model.
- Deployment plan for a selected pilot environment, including hosting, access control, data protection, backups, and monitoring.
- Training materials for frontline users, supervisors, and clinical reviewers.
- Standard operating procedures for screening, referral, escalation, downtime, data correction, and incident reporting.
- Consent, privacy, and governance documentation aligned with local institutional and regulatory requirements.
- Monitoring dashboard for usage, errors, referral completion, high-risk cases, and follow-up gaps.
- Feedback collection plan for users, patients, clinicians, and program leaders.
- Go/no-go checklist for pilot launch.

### Exit Criteria

- A pilot site can understand how the system will be used, governed, supported, and evaluated.
- Required ethical, institutional, and data protection approvals are identified or in progress.
- Users can be trained with documented materials and support procedures.
- The system has monitoring, rollback, and incident response plans.

## Phase 6: Commercialization Transition

### Objective

Convert validated pilot learning into a sustainable product, partnership, and business pathway.

### Deliverables

- Commercial positioning for health systems, NGOs, research institutions, employers, universities, insurers, and public sector programs.
- Pricing and packaging hypotheses, such as hosted SaaS, institutional licensing, implementation support, analytics modules, or grant-funded deployments.
- Evidence package summarizing pilot outcomes, clinical value, operational value, usability, safety, and implementation lessons.
- Product requirements for scale, including multi-site management, localization, advanced analytics, integrations, and enterprise security.
- Partnership plan for ministries of health, county governments, hospitals, universities, NGOs, and digital health implementers.
- Regulatory and compliance pathway for target countries and deployment contexts.
- Sustainability plan covering support, maintenance, data stewardship, model monitoring, and continuous validation.

### Exit Criteria

- The team can clearly articulate the buyer, user, payer, and beneficiary for each target market.
- Pilot evidence is strong enough to support partnership discussions or grant applications.
- The product roadmap reflects real deployment learning rather than assumptions.
- The next investment, partnership, or implementation milestone is defined.
