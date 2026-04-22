# MindMap Care Backlog

This backlog translates the roadmap into practical work items for moving from MVP prototype to controlled pilot readiness. Items should be refined into GitHub issues as priorities, owners, and pilot partners become clearer.

## Near Term

Focus: make the MVP more credible, reliable, reviewable, and safe for stakeholder walkthroughs.

| Category | Item | Outcome |
| --- | --- | --- |
| Product | Define the first pilot workflow in one concise journey map | Reviewers can understand the screening, triage, referral, and follow-up path without ambiguity |
| Product | Draft role definitions for screener, clinician reviewer, supervisor, and programme lead | UI and permissions can be designed around real users |
| Frontend | Add review/override placeholders to the risk summary page | Clinicians can see where judgment and accountability enter the workflow |
| Frontend | Add clearer empty states for dashboard, queue, and risk summary pages | Demo and local use remain understandable when no records exist |
| Frontend | Run and stabilize `npm run typecheck` and component tests once Node/npm are available | Frontend quality gates are real, not aspirational |
| Backend | Add persistent storage prototype using SQLite or Postgres-compatible repository patterns | Submitted screenings survive server restarts during demos |
| Backend | Add audit event schema for screening submission, scoring, summary view, export, and override | Future compliance and trust workflows have a foundation |
| Backend | Add structured error responses and request IDs | Support and debugging are easier during partner demos |
| Model | Document current mock scoring rules in plain language | Clinicians and technical reviewers can inspect how scores are produced |
| Model | Add deterministic fixture tests for low, moderate, high, and urgent mock outputs | Mock inference remains stable as the API evolves |
| Validation | Create a validation protocol outline | Partners can see how clinical review and later evidence generation will work |
| Security | Add security and privacy notes to docs | Reviewers can assess current gaps and planned mitigations |
| Deployment | Confirm Docker Compose works on a clean machine | Local demo setup becomes more reliable for collaborators |
| Pilot Support | Draft a one-page demo script for partner walkthroughs | Funders and pilot partners see a consistent story |
| Analytics | Add data completeness indicators to dashboard summary | Programme users can see whether screening records are usable |
| Integrations | Create an integration assumptions note for EMR, DHIS2, and referral systems | Future partner conversations have a concrete starting point |

## Medium Term

Focus: move from demo-ready to controlled pilot-ready with governance, persistence, review workflows, and operational monitoring.

| Category | Item | Outcome |
| --- | --- | --- |
| Product | Finalize MVP inclusion and exclusion criteria | Pilot teams know who should and should not be screened through the tool |
| Product | Define escalation pathways for urgent and high-risk outputs | High-risk cases have locally appropriate human actions |
| Frontend | Build clinician review queue actions: assign, schedule, close, escalate | Triage becomes operational rather than read-only |
| Frontend | Add data correction workflow for missing or invalid screening fields | Staff can resolve quality issues before review |
| Frontend | Add printable or exportable draft report with non-diagnostic language | Clinicians can share outputs safely in review workflows |
| Backend | Add authentication and role-based access control | Pilot data access can be restricted by user role |
| Backend | Add database migrations and repository layer | Storage becomes maintainable and deployment-friendly |
| Backend | Add audit log persistence and retrieval endpoints | Supervisors can review system usage and decisions |
| Model | Replace ad hoc mock rules with a documented baseline ruleset or interpretable baseline model | Early validation has a clearer target |
| Model | Add model metadata/versioning endpoints | Outputs can be traced to scoring logic and thresholds |
| Validation | Run structured clinician review of explanations and triage categories | Trust and usability evidence starts accumulating |
| Validation | Define minimum acceptable performance and safety thresholds | Go/no-go decisions become explicit |
| Security | Prepare data protection impact assessment materials | Pilot partners can review privacy and governance posture |
| Security | Add secrets management guidance and production configuration checklist | Deployment practices become less fragile |
| Deployment | Create staging deployment plan with backups, logs, and rollback steps | Pilot environment can be operated responsibly |
| Pilot Support | Draft training guide and quick reference sheet | Frontline users can be onboarded consistently |
| Analytics | Track referral completion, follow-up status, missingness, and override rates | Pilot evaluation can measure operational value |
| Integrations | Prototype import/export contract for referrals or screening records | Partner systems can exchange minimum useful data |

## Later Stage

Focus: scale from controlled pilot learning toward validated, governed, sustainable deployments.

| Category | Item | Outcome |
| --- | --- | --- |
| Product | Package implementation playbooks for different settings | Clinics, NGOs, and health programmes can adopt with less custom work |
| Product | Define pricing, support, and partnership models | Commercial or grant-funded pathways become concrete |
| Frontend | Add localization and language configuration | Workflows can adapt to country and programme needs |
| Frontend | Add offline-friendly or low-bandwidth capture patterns | Community and outreach workflows become more practical |
| Backend | Add multi-site tenancy and facility-level access controls | Larger deployments can separate programmes and sites safely |
| Backend | Add event monitoring, uptime checks, and operational alerts | Production support becomes measurable |
| Model | Train and evaluate candidate models on approved datasets | Model claims can be evidence-based instead of conceptual |
| Model | Add model monitoring for drift, calibration, and subgroup performance | Deployed model behavior can be reviewed over time |
| Validation | Complete retrospective and prospective pilot evaluation reports | Partners can decide whether to scale, redesign, or stop |
| Validation | Build a formal evidence package for funders, regulators, and health-system buyers | External stakeholders can assess clinical and operational value |
| Security | Conduct independent security review before production deployment | High-risk vulnerabilities are found before scale |
| Security | Implement incident response, breach handling, and data retention workflows | Governance is ready for real-world operations |
| Deployment | Create production infrastructure templates for selected hosting environments | Repeatable deployment becomes possible |
| Pilot Support | Build support desk workflow and implementation health checks | Pilot partners get timely help and documented issue resolution |
| Analytics | Add cohort, facility, programme, and equity dashboards | Leaders can monitor service demand, access, and outcomes |
| Integrations | Integrate with EMR, DHIS2, identity, referral, or messaging systems where appropriate | MindMap Care can fit into existing health-system infrastructure |

## Backlog Hygiene

- Convert items into GitHub issues before implementation.
- Attach each issue to a category, phase, owner, and acceptance criteria.
- Keep clinical safety, data protection, and validation implications visible.
- Do not treat synthetic demo data or mock inference behavior as clinical evidence.
- Revisit this backlog after each clinical review, technical review, or pilot partner discussion.
