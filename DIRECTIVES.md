# Project Directives

Immediate directive (master):

- Provide one minimal, end-to-end booking flow that runs entirely locally with in-memory storage. The flow must include:
  - A UI form to create a booking and a UI list view to display bookings.
  - Backend endpoints: `GET /bookings`, `POST /bookings`, and `GET /health`.
  - No external services required (no Docker compose, no remote Postgres/Redis/Kafka).
  - Simple developer run commands to verify functionality (see acceptance criteria below).

Acceptance criteria:

- Running the API and UI locally allows creating a booking from the browser and seeing it in the list.
- The backend builds successfully (`api` `npm run build`) and the UI builds successfully (`ui` `npm run build`).
- A CI workflow is configured that runs the build for both `api` and `ui` on push/PR.

Why this directive exists:

- Keep the repo small, local-first, and easy to validate so we can iterate quickly on features before adding persistence or event infra.


How to verify locally:

```bash
# API
cd api
npm install
npm run start:dev

# UI
cd ui
npm install
npm run start
```

Then open the UI at `http://localhost:4200` and create a booking; alternatively call the API directly with `curl`: `curl -X POST http://localhost:3000/bookings -H "Content-Type: application/json" -d '{"customerName":"you","customerEmail":"you@example.com","appointmentTime":"2026-03-31T12:00:00.000Z"}'`.

CI note: to avoid accidental billing on GitHub Actions for this learning project, CI is configured to run manually only. Trigger builds from the Actions tab (or run `workflow_dispatch`) when you want verification; no automatic runs will execute on push or PR.
