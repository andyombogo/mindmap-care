# Frontend Tests

Frontend component tests are colocated under `app/frontend/src/**/*.test.tsx`.

Current coverage focuses on lightweight render checks for reusable clinical UI components and the screening intake form.

Run from `app/frontend`:

```powershell
npm install
npm run test
```

Future additions:

- Playwright tests for the full screening to risk-summary workflow
- accessibility checks for clinical workflow screens
- API mocking for dashboard and risk summary loading states
