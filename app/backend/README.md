# MindMap Care Backend

FastAPI service for MindMap Care.

## Purpose

Use this app for:

- API endpoints used by the frontend
- care workflow orchestration
- integrations with model services, dashboards, or data systems
- future authentication and audit logging

## Local Development

```powershell
py -m venv .venv
.\.venv\Scripts\python.exe -m pip install -r requirements.txt
.\.venv\Scripts\python.exe -m uvicorn app.main:app --reload
```
