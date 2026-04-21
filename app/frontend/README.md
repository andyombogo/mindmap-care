# MindMap Care Frontend

Next.js + TypeScript application for the MindMap Care user experience.

## Purpose

Use this app for:

- care team workflow screens
- patient or client intake flows
- dashboard entry points
- frontend integration with the FastAPI backend

## Current Scaffold

The frontend includes:

- dashboard-style home page
- top navigation and responsive sidebar shell
- new screening route at `/screenings/new`
- patient risk summary route at `/patients/risk-summary`
- triage queue route at `/triage`
- dashboard overview route at `/dashboard`
- reusable UI components in `src/components`
- placeholder API helpers in `src/lib/api.ts`
- sample clinical workflow data in `src/lib/sample-data.ts`

## Local Development

```powershell
npm install
npm run dev
```

The app expects `NEXT_PUBLIC_API_BASE_URL` to point at the backend API.
