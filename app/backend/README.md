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

## Placeholder Endpoints

- `POST /api/v1/screenings` accepts patient screening submissions.
- `POST /api/v1/risk/score` returns deterministic placeholder risk scoring.
- `POST /api/v1/explainability` returns a plain-language explanation payload.
- `GET /api/v1/dashboard/summary` returns dashboard summary totals.

These endpoints are intentionally simple. They define stable API contracts that can later be connected to persistence, validated models, audit logging, authentication, and deployment-specific integrations.
