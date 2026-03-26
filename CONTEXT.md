# skill-broad-1 — Project Context and Current State

This document records the purpose, stack, structure, and current development state of the `skill-broad-1` learning project so the repo (and our chat) can remember key context.

## Purpose

A minimal, learn-by-building project to practice event-driven backend architecture, infra tooling, and full-stack wiring. The business concept is intentionally simple: a booking + reminder platform where users can create/list/view bookings and the system can schedule reminders via events.

Keep business logic intentionally small — the learning focus is on NestJS architecture, Docker/Docker Compose, Kafka-style pub/sub (Redpanda), Redis, and PostgreSQL.

## Tech stack

- Frontend: Angular (existing app in `ui/`)
- Backend: NestJS (new app in `api/`)
- Database: PostgreSQL
- Cache: Redis (placeholder module exists; not fully integrated yet)
- Event bus: Redpanda (Kafka-compatible)
- Event client: kafkajs
- ORM: TypeORM
- Container orchestration for local dev: Docker Compose

## High-level architecture

- `ui/` — Angular SPA (kept as-is; minimal scaffolding added for models and API service)
- `api/` — NestJS monolith with modular layout (bookings, events, database, cache, health)
- `docker-compose.yml` — runs postgres, redis, redpanda, kafka-ui, api, and ui for local development

Events:
- When a booking is created the backend publishes a `booking.created` event (JSON payload) to the event bus.

## Code / files created (summary)

- `api/` — NestJS app skeleton
  - `src/app.module.ts`, `src/main.ts`
  - `src/bookings/*` — controller, service, entity, DTO
  - `src/events/*` — `EventsService` (producer using kafkajs)
  - `src/database/database.module.ts` — TypeORM config (synchronize: true for dev)
  - `api/.env.example`, `api/Dockerfile`, `api/package.json`, tsconfig files
- `ui/` additions
  - `src/app/models/booking.ts`
  - `src/app/services/booking.service.ts` (simple API client)
- `docker-compose.yml` — brings up postgres, redis, redpanda, kafka-ui, api, ui
- `README.md` — basic startup instructions
- `CONTEXT.md` (this file)

Paths (useful links):
- [api/package.json](api/package.json)
- [api/.env.example](api/.env.example)
- [api/src/bookings/entities/booking.entity.ts](api/src/bookings/entities/booking.entity.ts)
- [api/src/events/events.service.ts](api/src/events/events.service.ts)
- [ui/src/app/services/booking.service.ts](ui/src/app/services/booking.service.ts)
- [docker-compose.yml](docker-compose.yml)
- [README.md](README.md)

## Current runtime / dev status (as of this session)

- The NestJS `api` skeleton and files were created, including a simple `EventsService` that attempts to connect to the broker on module init.
- `docker-compose.yml` was added to run Postgres, Redis, Redpanda, Kafka UI, API, and UI. Redpanda (vectorized/redpanda) was chosen for local developer convenience.
- Angular `ui` was left intact; small service/model files were added to consume the API.
- You have started installing dependencies in `ui/` (last `npm i --silent` completed in the `ui` terminal).
- The `api` dev server was attempted (`npm run start:dev`) and returned a non-zero exit (exit code 130) in the provided terminal history — likely due to missing dependencies or environment (e.g., `@nestjs/*`, TypeORM, kafkajs, etc.).

Important runtime notes / gotchas:
- `api` expects environment variables (see `api/.env.example`) when run in Docker. When running locally, `@nestjs/config` and `dotenv` should be installed (they were installed in the workspace commands).
- TypeORM is configured with `synchronize: true` to speed up development — remove or replace with migrations for production-like workflows.
- `EventsService` will try to connect to Redpanda at `KAFKA_BROKER` (default `redpanda:9092`) during module init; if Redpanda isn't available the service logs a warning. This is fine for development but consider adding retry/backoff logic later.

## Next recommended steps (short-term)

1. Install backend dependencies inside `api/` and run `npm run start:dev` locally to iterate quickly:

   ```bash
   cd api
   npm install
   npm run start:dev
   ```

2. Start the full stack with Docker Compose to test end-to-end event publishing:

   ```bash
   docker compose build
   docker compose up
   ```

3. If `api` fails to start, check logs for missing packages or connection errors. Common fixes:
   - Ensure `node_modules` installed in `api/`.
   - Ensure Docker containers (Postgres, Redpanda) are up when running `api` in Docker.

4. Add a small consumer service (can be another NestJS module or a simple Node script) that subscribes to `booking.created` to simulate reminder scheduling. This helps close the event loop and practice consuming messages.

5. Integrate Redis client into `CacheModule` to experiment with caching and deduplication.

## Longer-term enhancements

- Implement migrations instead of `synchronize`.
- Add automated tests (unit and integration) for the `BookingsService` and event publishing.
- Add a simple consumer that creates reminder tasks and stores them or enqueues them for delivery.
- Add authentication (simple JWT) for API endpoints.

## Contact points in the code for quick edits

- Booking model & persistence: `api/src/bookings/entities/booking.entity.ts`
- Booking API flow: `api/src/bookings/bookings.controller.ts` and `api/src/bookings/bookings.service.ts`
- Event publishing: `api/src/events/events.service.ts`
- DB config: `api/src/database/database.module.ts`
- Frontend API client: `ui/src/app/services/booking.service.ts`

---

This file is a single-source memory for the project so future work (by you or by me) can pick up quickly. Update it as reality changes (e.g., if you split services, add migrations, or change the event bus).
