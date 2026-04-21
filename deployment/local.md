# Local Deployment Notes

Local development uses the root `docker-compose.yml`.

```powershell
docker compose up --build
```

The compose file starts:

- `frontend` on port `3000`
- `backend` on port `8000`

Use this file to document local service dependencies as the project grows.
