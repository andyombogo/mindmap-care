# MindMap Care

MindMap Care is an explainable AI screening and triage platform for mental health, cognitive, and functional risk stratification in African health systems.

The project is designed to help care teams identify people who may need additional assessment, follow-up, or referral while keeping the reasoning visible, auditable, and appropriate for resource-constrained clinical and public health settings.

MindMap Care is not a diagnostic tool. It is a decision-support and workflow product concept intended to support human-led screening, prioritization, and care navigation.

## Project Overview

Mental health, cognitive decline, disability, and functional impairment are often under-detected in routine care, especially where specialist capacity is limited. MindMap Care aims to combine structured screening inputs, contextual risk signals, explainable model outputs, and workflow tools into a practical triage layer for health systems.

The repository is organized as a production-minded monorepo:

- a Next.js frontend for care team workflows
- a FastAPI backend for scoring, triage, and integration APIs
- shared documentation for product, validation, deployment, and governance
- dedicated spaces for models, data, dashboards, tests, deployment, and assets

## Problem Statement

African health systems face a growing burden of mental health, cognitive, and functional care needs, but screening and referral workflows are often constrained by:

- limited specialist availability
- fragmented patient records and paper-based workflows
- delayed identification of high-need patients
- inconsistent use of validated screening tools
- limited visibility into why a patient is prioritized
- scarce local validation data for AI-enabled tools
- weak integration between community, primary care, and specialist services

Many AI health products are built for high-resource environments and do not fit the operational realities of clinics, community health programs, district hospitals, NGOs, and public health teams. MindMap Care starts from those constraints.

## Solution Summary

MindMap Care proposes a lightweight, explainable screening and triage platform that can:

- capture structured screening inputs from care teams or community workflows
- estimate risk across mental health, cognitive, and functional domains
- explain the major signals contributing to each risk result
- recommend triage categories such as routine follow-up, enhanced screening, referral, or urgent review
- support review notes, human override, and care navigation workflows
- generate aggregate dashboards for program monitoring and service planning
- preserve validation, audit, and safe-use documentation alongside the product

The goal is not to replace clinicians. The goal is to make early identification and follow-up more consistent, transparent, and scalable.

## Core Value Proposition

MindMap Care helps health teams move from fragmented screening to structured, explainable triage.

For care teams, it offers:

- clearer prioritization of who may need follow-up
- transparent reasoning behind risk categories
- fewer missed cases in busy workflows
- simple digital handoff between screening and care navigation

For health system leaders, it offers:

- population-level visibility into mental health and functional risk patterns
- auditable screening and referral workflows
- a foundation for locally validated AI decision support
- a platform that can be adapted to country, county, program, or facility needs

## Target Users

Primary users:

- primary care clinicians
- nurses and clinical officers
- mental health care coordinators
- community health workers
- NGO and public health program teams
- district or county health managers

Secondary users:

- researchers validating screening tools
- digital health implementers
- health informatics teams
- monitoring and evaluation teams
- policymakers reviewing service demand and referral gaps

## What Makes It Different

MindMap Care is designed around real implementation constraints rather than only model performance.

Key differentiators:

- Explainability first: every score should be accompanied by understandable drivers and limitations.
- African health system fit: workflows should support community, primary care, and referral settings.
- Human-in-the-loop triage: model outputs should support, not replace, clinical judgment.
- Multi-domain screening: mental health, cognition, and function are treated as connected care needs.
- Validation-aware product design: the repository separates model development, validation, safe-use guidance, and deployment.
- Operational usefulness: dashboards and triage queues matter as much as the prediction endpoint.
- Lightweight deployment path: the architecture can start small and mature toward regulated or enterprise environments.

## Design Principles

1. Human accountability stays central.
   Care decisions should remain with trained staff, with AI used as a transparent support layer.

2. Explainability is a product requirement.
   Users should understand the main drivers of a triage result and the uncertainty around it.

3. Local validation matters.
   Models should not be positioned as clinically reliable without validation in the target population and workflow.

4. Privacy by default.
   Sensitive health data, patient identifiers, and raw clinical data should never be committed to the repository.

5. Start simple, scale responsibly.
   The MVP should prioritize reliable screening, review, and follow-up workflows before advanced automation.

6. Design for low-friction adoption.
   The product should work in practical environments with limited staffing, mixed digital maturity, and variable connectivity.

7. Auditability over black boxes.
   Inputs, outputs, overrides, versions, and validation assumptions should be traceable.

## Planned Features

Planned product capabilities include:

- structured screening intake forms
- configurable triage rules and thresholds
- explainable risk scoring for mental health, cognitive, and functional risk
- patient or client risk summaries
- review queue for care coordinators
- referral and follow-up workflow tracking
- human override with reason capture
- facility, program, and county-level dashboards
- model card and validation report generation
- API endpoints for integration with other digital health systems
- role-based access controls
- audit logs for scoring, review, export, and override events
- offline-friendly or low-bandwidth workflow options
- localization-ready interface text

## MVP Scope

The MVP should focus on a narrow, credible workflow:

- intake form for a small set of screening and contextual variables
- backend endpoint for risk scoring and triage category assignment
- explainability summary for each score
- frontend triage result page
- review queue for follow-up prioritization
- simple dashboard of aggregate risk categories
- documented safe-use guidance and limitations
- test coverage for scoring, validation, and API behavior
- Docker-based local development setup

The MVP should prove that a care team can capture inputs, receive an explainable triage result, and route the case to the next appropriate action.

## Non-Goals

MindMap Care is not currently intended to:

- diagnose mental health, dementia, disability, or neurological conditions
- replace clinician assessment
- make autonomous treatment decisions
- provide emergency or crisis triage without human review
- claim clinical performance before local validation
- store real patient data in this repository
- act as a complete electronic medical record
- optimize for complex model architectures before workflow usefulness is proven

## Proposed Repository Structure

```text
mindmap-care/
|-- .github/           GitHub Actions and repository automation
|-- app/
|   |-- frontend/      Next.js + TypeScript user interface
|   `-- backend/       FastAPI service and backend application code
|-- assets/            Brand, design, diagrams, and static media source files
|-- dashboards/        Analytics dashboards and operational reporting assets
|-- data/              Local data staging area; raw/sensitive data stays out of git
|-- deployment/        Deployment manifests, infrastructure notes, and runbooks
|-- docs/              Product, architecture, validation, and governance documentation
|-- models/            Model metadata and approved lightweight model documentation
|-- scripts/           Developer helper scripts for local setup and run loops
|-- tests/             Cross-service test suites and test documentation
|-- docker-compose.yml Local development orchestration
|-- .env.example       Root environment example for local development
`-- .gitignore         Repository-wide ignore rules
```

## Validation Priorities

Validation should proceed in stages:

1. Clinical and public health review of intended use, non-goals, and workflow fit.
2. Retrospective validation on labelled screening or assessment datasets where available.
3. Subgroup performance review by age, sex, geography, language, facility type, and care setting.
4. Calibration review so risk categories match observed rates in the target population.
5. Workflow validation with care teams to assess usability, trust, and actionability.
6. Prospective pilot evaluation before any high-stakes deployment.
7. Ongoing monitoring for drift, bias, override rates, and referral outcomes.

Core validation questions:

- Does the tool identify people who need additional assessment without creating unsafe overconfidence?
- Are explanations understandable to the intended users?
- Are false negatives and false positives reviewed in the local care context?
- Do triage recommendations lead to feasible next actions?
- Does the product reduce delays, missed follow-up, or workflow burden?

## Commercialization Path

Potential commercialization paths include:

- pilot deployments with NGOs, research programs, and public health partners
- licensed SaaS for care coordination programs
- enterprise deployments for hospitals or integrated care networks
- implementation packages for county, district, or national health programs
- research and validation collaborations with universities or health institutes
- API-based integration with existing electronic medical record or community health systems

Commercial readiness will require:

- clear regulatory and clinical safety positioning
- local validation evidence
- data protection and hosting strategy
- role-based access and audit logging
- support and implementation playbooks
- pricing aligned with public health and NGO procurement realities

## Current Stage

MindMap Care is currently at the scaffold and product-definition stage.

The repository includes:

- production-minded monorepo structure
- frontend and backend starter apps
- Docker Compose local development setup
- environment example files
- documentation placeholders
- model, data, dashboard, deployment, and test directories

Next priorities:

- define the first MVP workflow
- choose initial screening domains and input schema
- draft safe-use and validation documentation
- implement first scoring API contract
- design the first triage result screen
- add backend and frontend tests around the MVP workflow

## Local Development

Prerequisites:

- Node.js 20+
- Python 3.11+
- Docker Desktop, optional but recommended

Configure environment files:

```powershell
Copy-Item .env.example .env
Copy-Item app\frontend\.env.example app\frontend\.env.local
Copy-Item app\backend\.env.example app\backend\.env
```

Run with Docker Compose:

```powershell
docker compose up --build
```

Default local services:

- Frontend: http://localhost:3000
- Backend: http://localhost:8000
- Backend health check: http://localhost:8000/health

Run without Docker:

```powershell
cd app\backend
py -m venv .venv
.\.venv\Scripts\python.exe -m pip install -r requirements.txt
.\.venv\Scripts\python.exe -m uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

```powershell
cd app\frontend
npm install
npm run dev
```

Or use:

```powershell
.\scripts\dev.ps1
```

## Contribution Note

Contributions are welcome once the project direction and MVP scope are formalized.

Good early contributions include:

- documentation improvements
- architecture notes
- test scaffolding
- frontend accessibility improvements
- backend API contract design
- validation and safe-use review
- African health system workflow feedback

Please do not commit real patient data, private screening data, credentials, or generated model artifacts unless they have been explicitly approved for public release.
