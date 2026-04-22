# Contributing to MindMap Care

Thank you for considering a contribution. MindMap Care is a health-tech MVP, so contributions should improve safety, clarity, reliability, and usefulness for real care workflows.

## Current Contribution Priorities

Good early contributions include:

- documentation improvements
- clinical workflow review
- frontend accessibility and usability polish
- backend API contract improvements
- testing around schemas, endpoints, and mock inference behavior
- validation planning and model governance notes
- deployment and environment setup improvements

Please avoid large rewrites unless they are discussed first.

## Safety and Data Rules

Do not contribute:

- real patient data
- private clinical notes
- identifiable health information
- credentials, API keys, tokens, or secrets
- production database exports
- proprietary model artifacts without explicit permission

Use synthetic or fictional data only. Label demo data clearly.

MindMap Care is not diagnostic software. Contributions must preserve the non-diagnostic positioning and human-review workflow.

## Local Setup

From the repository root:

```powershell
Copy-Item .env.example .env
docker compose up --build
```

Backend development:

```powershell
cd app\backend
py -m venv .venv
.\.venv\Scripts\python.exe -m pip install -r requirements.txt
.\.venv\Scripts\python.exe -m pytest ..\..\tests\backend
```

Frontend development:

```powershell
cd app\frontend
npm install
npm run typecheck
npm run test
```

## Pull Request Guidance

For pull requests:

- keep changes focused
- explain the user, clinical, or developer impact
- include tests when behavior changes
- update docs when setup, workflow, or API contracts change
- state whether frontend, backend, or Docker checks were run
- call out any clinical safety, privacy, or validation implications

## Review Expectations

Reviewers should prioritize:

- correctness and reliability
- clarity of clinical workflow
- privacy and data safety
- explainability and non-diagnostic language
- test coverage for important behavior
- maintainability over novelty

## Issues

When opening an issue, include:

- expected behavior
- current behavior
- affected workflow or component
- reproduction steps where relevant
- screenshots for UI issues
- safety or data-governance concerns if applicable

## Community Standards

All contributors are expected to follow the [Code of Conduct](CODE_OF_CONDUCT.md).
