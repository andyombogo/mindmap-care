# Tests

Use this folder for cross-service tests and backend test suites.

Suggested structure:

```text
tests/
|-- backend/   FastAPI and backend integration tests
`-- frontend/  frontend test notes or future Playwright tests
```

## Backend

Run backend tests from `app/backend` so imports resolve against the FastAPI package:

```powershell
.\.venv\Scripts\python.exe -m pytest ..\..\tests\backend -p no:cacheprovider
```

The current backend tests cover:

- schema validity
- API endpoint behavior
- mock inference behavior
- deterministic scoring
- in-memory MVP demo store summaries

## Frontend

Frontend component tests live beside the components in `app/frontend/src`.

Run them from `app/frontend` after installing Node.js and dependencies:

```powershell
npm install
npm run test
```
