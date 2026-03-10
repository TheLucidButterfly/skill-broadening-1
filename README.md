# skill-broad-1

Learning project that demonstrates a simple event-driven full-stack architecture.

Services:
- `ui` (Angular SPA)
- `api` (NestJS backend)
- `postgres` (bookings persistence)
- `redis` (cache / future use)
- `redpanda` (Kafka-compatible event bus)
- `kafka-ui` (UI to inspect topics)

Quick start (Docker Compose):

1. Build and run everything:

```bash
docker compose build
docker compose up
```

2. Services (default ports):
- Postgres: 5432
- Redis: 6379
- Redpanda (Kafka): 9092
- Kafka UI: 8080
- API: 3000
- UI: 4200

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
