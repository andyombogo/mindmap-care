# Technical Architecture

## Overview

MindMap Care is a lightweight monorepo with a Next.js frontend, FastAPI backend, shared documentation, and placeholder model/data spaces.

The current MVP architecture is designed for product prototyping and pilot conversations. It is not yet a production clinical deployment.

## Top-Level Components

```text
app/frontend   Next.js TypeScript user interface
app/backend    FastAPI API service and mock inference layer
docs           Product, clinical, technical, model, pilot, and ethics docs
models         Model metadata and future model artifacts
data           Local data staging; sensitive data stays out of git
tests          Backend and future integration tests
deployment     Deployment notes and infrastructure placeholders
```

## Frontend

The frontend provides:

- Screening intake form
- Patient risk summary page
- Triage queue
- Dashboard overview
- API client helpers
- Loading and fallback states for demo workflows

Important frontend files:

- `app/frontend/src/components/NewScreeningForm.tsx`
- `app/frontend/src/app/patients/risk-summary/page.tsx`
- `app/frontend/src/app/triage/page.tsx`
- `app/frontend/src/app/dashboard/page.tsx`
- `app/frontend/src/lib/api.ts`

## Backend

The backend provides:

- Health check endpoint
- Versioned API routing under `/api/v1`
- Screening submission endpoint
- Mock risk summary endpoint
- Dashboard summary endpoint
- Mock model interface and deterministic scoring
- In-memory demo store for MVP integration

Important backend files:

- `app/backend/app/main.py`
- `app/backend/app/api/v1/router.py`
- `app/backend/app/api/v1/endpoints/screenings.py`
- `app/backend/app/api/v1/endpoints/dashboard.py`
- `app/backend/app/modeling/risk_contract.py`
- `app/backend/app/services/demo_store.py`

## MVP Data Flow

1. Frontend submits screening data to `POST /api/v1/screenings`.
2. Backend converts the submission into the model interface schema.
3. Mock inference engine preprocesses responses and applies deterministic rules.
4. Backend stores the generated summary in memory.
5. Frontend redirects to the risk summary page with the screening ID.
6. Risk summary page fetches `/api/v1/screenings/{screening_id}/risk-summary`.
7. Dashboard page fetches `/api/v1/dashboard/summary`.

## Current Persistence

The MVP currently uses an in-memory demo store. This is intentional for fast product prototyping.

Limitations:

- Data resets when the backend restarts
- Not suitable for real patient data
- Not suitable for production audit requirements
- No role-based access control yet

Production persistence should eventually include a database, audit tables, encryption strategy, and migration tooling.

## API Design Principles

- Keep versioned routes under `/api/v1`
- Keep request and response schemas explicit
- Treat model outputs as decision-support objects, not diagnosis objects
- Preserve model metadata and explanation fields
- Return useful errors and fallback-safe responses
- Keep the mock engine replaceable

## Future Production Requirements

Before pilot or production use, the architecture should add:

- Database persistence
- Authentication and role-based permissions
- Audit logging
- Secure secret management
- Input validation and rate limiting
- Deployment observability
- Backup and recovery plan
- Data retention configuration
- Environment-specific configuration
- Integration strategy for EMR or health information systems
