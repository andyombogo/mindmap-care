# Local Deployment Notes

Local development uses the root `docker-compose.yml`.

```powershell
docker compose up --build
```

The compose file starts:

- `frontend` on port `3000`
- `backend` on port `8000`

Useful checks:

```powershell
docker compose ps
docker compose logs -f backend
docker compose logs -f frontend
```

The backend loads synthetic demo records by default from `data/synthetic/demo-screenings.json`. This keeps first-run demos reliable for dashboard, triage queue, and risk summary review. Set `MINDMAP_SEED_DEMO_DATA=false` in `.env` to start with an empty in-memory demo store.

Use this file to document local service dependencies as the project grows.
