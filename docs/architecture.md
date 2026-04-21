# Architecture Notes

MindMap Care starts as a modular monorepo:

- `app/frontend`: user-facing Next.js application
- `app/backend`: FastAPI backend and service API
- `models`: model artifacts and model documentation
- `data`: local data staging area
- `dashboards`: reporting and operational analytics
- `deployment`: deployment manifests and runbooks

Future decisions to capture here:

- authentication model
- patient/client data boundaries
- audit logging strategy
- model serving approach
- observability and incident response
