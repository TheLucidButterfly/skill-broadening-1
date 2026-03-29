# skill-broad-1

Learning project that demonstrates a simple event-driven full-stack architecture.

Services:
- `ui` (Angular SPA)
- `api` (NestJS backend)

Local development:

1. API (development):

```bash
cd api
npm install
npm run start:dev
```

2. UI (development):

```bash
cd ui
npm install
npm run start
```

API endpoints (examples):
- POST /bookings -> create booking
- GET /bookings -> list bookings
- GET /bookings/:id -> booking details
- GET /health -> health

Notes:
- The API uses TypeORM with `synchronize: true` for dev convenience. Do not use in production.
- Events are published to the topic `booking.created` as JSON messages.

Local dev (API):

cd api
npm install
npm run start:dev

Local dev (UI):

cd ui
npm install
npm run start
# skill-broadening-1
# skill-broadening-1
