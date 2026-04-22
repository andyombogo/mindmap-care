# MindMap Care

[![CI](https://github.com/andyombogo/mindmap-care/actions/workflows/ci.yml/badge.svg)](https://github.com/andyombogo/mindmap-care/actions/workflows/ci.yml)
![Status](https://img.shields.io/badge/status-MVP%20prototype-0f766e)
![Clinical Use](https://img.shields.io/badge/clinical%20use-not%20diagnostic-b91c1c)
![Demo Data](https://img.shields.io/badge/demo%20data-synthetic%20only-2563eb)
![License](https://img.shields.io/badge/license-TBD-lightgrey)

MindMap Care is an explainable AI screening and triage platform for mental health, cognitive, and functional risk stratification in African health systems.

It helps care teams capture structured screening information, generate transparent mock risk summaries, prioritize review queues, and monitor aggregate follow-up needs. The current repository is an MVP prototype designed for product validation, technical review, and pilot-readiness conversations.

MindMap Care is not a diagnostic tool. It does not make autonomous treatment decisions. All risk outputs are decision-support signals for human review.

## Why It Matters

Many health systems face rising mental health, cognitive, disability, and functional care needs while specialist capacity remains limited. Screening workflows are often paper-based, fragmented, or difficult to prioritize at scale.

MindMap Care explores a practical middle layer:

- structured intake for frontline screening workflows
- deterministic mock risk scoring for end-to-end MVP testing
- explainable patient risk summaries for clinician review
- triage queues for care coordination
- operational dashboards for facility and programme leads
- documentation for validation, ethics, architecture, and pilot planning

The product direction is deliberately implementation-minded: useful workflows first, validated models only when evidence is available.

## Current Stage

This repository is ready for internal demos, partner review, and technical collaboration. It is not ready for live clinical deployment.

Implemented MVP pieces:

- Next.js + TypeScript frontend
- FastAPI backend
- screening intake UI
- patient risk summary page
- triage queue page connected to backend demo data
- dashboard overview connected to backend summary data
- deterministic mock inference layer
- synthetic demo screening data
- Docker Compose local development setup
- backend API tests and lightweight frontend test scaffold
- product, workflow, architecture, ethics, model, and pilot documentation

Not yet implemented:

- authentication and role-based access
- persistent database storage
- immutable audit logs
- clinician override workflow
- production data protection controls
- validated clinical model
- deployment monitoring and incident reporting

## Safe-Use Positioning

MindMap Care outputs must be interpreted as screening and triage support only.

- The mock inference engine is not trained on clinical data.
- Synthetic records are fictional and exist only for demos and tests.
- The MVP must not be used to diagnose mental health, dementia, disability, neurological, or functional conditions.
- Any real-world pilot requires clinical governance, ethics review where applicable, data protection review, training, and local validation.
- Moderate, high, and urgent outputs should remain visible for human review.

See [docs/regulatory-and-ethics-notes.md](docs/regulatory-and-ethics-notes.md) and [docs/model-card.md](docs/model-card.md) for more detail.

## Repository Structure

```text
mindmap-care/
|-- .github/           CI workflows and repository automation
|-- app/
|   |-- frontend/      Next.js + TypeScript clinical workflow UI
|   `-- backend/       FastAPI API, schemas, services, and mock inference integration
|-- assets/            Design and static media placeholders
|-- dashboards/        Analytics and reporting workspace
|-- data/              Synthetic demo data and local data staging guidance
|-- deployment/        Local deployment notes and future runbooks
|-- docs/              Product, clinical, technical, model, pilot, and ethics docs
|-- models/            Model interface notes and future model artifacts guidance
|-- scripts/           Local development helper scripts
|-- tests/             Backend and frontend test suites
|-- docker-compose.yml Local development orchestration
|-- CONTRIBUTING.md    Contribution guidance
|-- CODE_OF_CONDUCT.md Community standards
|-- LICENSE.md         License selection guidance
`-- README.md          Project front door
```

## MVP Demo Flow

1. Start the backend and frontend.
2. Open the dashboard to review seeded synthetic screening totals.
3. Open the triage queue to see prioritized fictional cases.
4. Submit a new screening intake form.
5. Review the generated patient risk summary.
6. Check the dashboard again to see updated mock counts.

The backend seeds fictional demo records by default from [data/synthetic/demo-screenings.json](data/synthetic/demo-screenings.json). Disable this with `MINDMAP_SEED_DEMO_DATA=false`.

## Quick Start

Prerequisites:

- Node.js 20+
- Python 3.11+
- Docker Desktop, optional but recommended

Run with Docker Compose:

```powershell
Copy-Item .env.example .env
docker compose up --build
```

Default local services:

- Frontend: http://localhost:3000
- Backend: http://localhost:8000
- Backend health check: http://localhost:8000/health
- Backend API docs: http://localhost:8000/docs

Run without Docker:

```powershell
Copy-Item app\frontend\.env.example app\frontend\.env.local
Copy-Item app\backend\.env.example app\backend\.env
```

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

Useful scripts:

```powershell
.\scripts\dev.ps1
```

```bash
./scripts/dev.sh
```

## Environment Setup

Root environment settings live in [.env.example](.env.example).

Common local overrides:

- `FRONTEND_PORT`
- `BACKEND_PORT`
- `NEXT_PUBLIC_API_BASE_URL`
- `MINDMAP_CORS_ALLOW_ORIGINS`
- `MINDMAP_SEED_DEMO_DATA`
- `MINDMAP_DEMO_DATA_PATH`

Service-specific templates are available at:

- [app/frontend/.env.example](app/frontend/.env.example)
- [app/backend/.env.example](app/backend/.env.example)

Never commit real credentials, patient identifiers, private clinical records, or production data exports.

## Testing

Backend tests:

```powershell
cd app\backend
.\.venv\Scripts\python.exe -m pytest ..\..\tests\backend
```

Frontend tests and type checks:

```powershell
cd app\frontend
npm run typecheck
npm run test
```

The current backend tests cover health endpoints, schema validation, mock inference behavior, seeded demo data, dashboard summary behavior, and triage queue behavior.

## Documentation

Key project documents:

- [Product overview](docs/product-overview.md)
- [Clinical workflow](docs/clinical-workflow.md)
- [Technical architecture](docs/technical-architecture.md)
- [Model card](docs/model-card.md)
- [Pilot strategy](docs/pilot-strategy.md)
- [Regulatory and ethics notes](docs/regulatory-and-ethics-notes.md)
- [Roadmap](ROADMAP.md)

## Target Users

Primary users:

- nurses and clinical officers
- primary care clinicians
- mental health care coordinators
- community health workers
- NGO and public health programme teams
- district, county, or facility managers

Secondary users:

- researchers
- digital health implementers
- health informatics teams
- monitoring and evaluation teams
- policy and programme stakeholders

## Validation Priorities

Before any real pilot or clinical use, the project needs:

- intended-use review by clinical and public health stakeholders
- local workflow validation with frontline staff
- review of explanation clarity and risk communication
- retrospective validation on appropriate labelled data where available
- subgroup performance review by age, sex, geography, language, and care setting
- calibration review for risk categories
- data protection and governance review
- prospective pilot evaluation with incident reporting and human oversight

## Contribution

Contributions are welcome for documentation, architecture, tests, frontend usability, backend API contracts, and validation planning.

Please read [CONTRIBUTING.md](CONTRIBUTING.md) and [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md) before opening issues or pull requests.

Do not contribute real patient data, private operational data, credentials, or unapproved model artifacts.

## License

The project license has not yet been selected. See [LICENSE.md](LICENSE.md) for current guidance.

Until a formal license is added, do not assume permission for production use, redistribution, or derivative commercial use.
