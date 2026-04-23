# MindMap Care Backend

FastAPI service for MindMap Care, an explainable AI screening and triage platform for mental health, cognitive, and functional risk stratification in African health systems.

## What This Service Provides

- Application entrypoint in `app/main.py`.
- Root health check at `/health` for containers and uptime monitoring.
- Versioned API routes under `/api/v1`.
- Environment-based settings in `app/core/config.py`.
- Console logging setup in `app/core/logging.py`.
- Pydantic request and response schemas in `app/schemas`.
- Modular placeholder endpoints for screening, risk scoring, explainability, and dashboard summaries.
- Synthetic demo-data seeding for repeatable MVP walkthroughs.

## Folder Structure

```text
app/
  main.py                 # FastAPI app factory and middleware setup
  api/v1/                 # Versioned API router and endpoint modules
  core/                   # Settings and logging helpers
  schemas/                # Pydantic models for API contracts
  services/               # Lightweight business logic placeholders
```

## Local Development

Create a virtual environment, install dependencies, and start the API:

```powershell
py -m venv .venv
.\.venv\Scripts\python.exe -m pip install -r requirements.txt
.\.venv\Scripts\python.exe -m uvicorn app.main:app --reload
```

The API will be available at:

- Health check: http://localhost:8000/health
- API docs: http://localhost:8000/docs
- Versioned health check: http://localhost:8000/api/v1/health

## Docker

From the repository root:

```powershell
Copy-Item .env.example .env
docker compose up --build backend
```

The backend container runs with reload enabled through `docker-compose.yml` and exposes port `8000` by default. Override `BACKEND_PORT` or `MINDMAP_*` settings in the root `.env` file when needed.

## Environment Variables

Copy `.env.example` to `.env` for local overrides:

```powershell
Copy-Item .env.example .env
```

Supported settings use the `MINDMAP_` prefix:

- `MINDMAP_APP_NAME`
- `MINDMAP_APP_VERSION`
- `MINDMAP_SERVICE_NAME`
- `MINDMAP_ENVIRONMENT`
- `MINDMAP_API_V1_PREFIX`
- `MINDMAP_CORS_ALLOW_ORIGINS`
- `MINDMAP_LOG_LEVEL`
- `MINDMAP_REQUEST_TIMEOUT_SECONDS`
- `MINDMAP_SEED_DEMO_DATA`
- `MINDMAP_DEMO_DATA_PATH`

By default, the service loads `data/synthetic/demo-screenings.json` into the in-memory demo store at startup. These records are fictional and should only be used for product demos, local testing, and workflow review.

## Placeholder Endpoints

- `POST /api/v1/screenings` accepts patient screening submissions.
- `GET /api/v1/screenings/triage-queue` returns prioritized demo queue items.
- `GET /api/v1/screenings/risk-summary/latest` returns the newest stored risk summary.
- `GET /api/v1/screenings/{screening_id}/risk-summary` returns one stored risk summary.
- `GET /api/v1/screenings/{screening_id}/audit-events` returns the in-memory audit trail for that screening.
- `POST /api/v1/screenings/{screening_id}/review` saves a clinician review or override decision.
- `POST /api/v1/risk/score` returns deterministic placeholder risk scoring.
- `POST /api/v1/explainability` returns a plain-language explanation payload.
- `GET /api/v1/dashboard/summary` returns dashboard summary totals.

These endpoints are intentionally simple. They define stable API contracts that can later be connected to persistence, validated models, fuller audit retrieval, authentication, and deployment-specific integrations. The current inference logic is a deterministic mock and must not be treated as clinical evidence.
