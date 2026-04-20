Here’s your clean, **Copilot-ready `.md directive file`**.
Save this as:

👉 `SKILL_BROADENING_DIRECTIVE.md` in your `skill-broad-1` root

---

# Skill Broadening Directive (Angular → System-Level Engineer)

## Objective

Evolve from an Angular-focused architect into a **full-stack, system-minded engineer** capable of designing distributed systems and reaching ~$180k–$220k+ roles.

This project is a **learning lab**, not a production product.

Focus on:

* backend ownership
* event-driven thinking
* async processing
* system design fundamentals

---

## Core Philosophy

* Keep business logic extremely simple
* Focus on **architecture and data flow**
* Learn by building real systems
* Prefer clarity over complexity
* Avoid over-engineering early

---

## Project Concept

A simple **booking + reminder system**

Users can:

* create bookings
* view bookings
* schedule reminders
* track reminder status

This domain is intentionally simple so focus stays on **system design**

---

## Target Architecture (Progressive)

### Phase 1 (Monolith)

* Angular UI (existing)
* NestJS API
* PostgreSQL
* Redis
* Messaging system (Kafka or RabbitMQ)

### Phase 2 (Event-Driven Monolith)

* Publish events internally
* Consume events in same service
* Introduce async processing

### Phase 3 (Service Separation)

* booking-service
* reminder-service
* notification-worker

---

## Primary Stack

### Frontend

* Angular (existing)

### Backend

* NestJS
* Node.js (async patterns)

### Database

* PostgreSQL
* relational modeling

### Caching

* Redis

  * TTL
  * deduplication
  * rate limiting
  * locking

### Messaging

* Kafka OR RabbitMQ
* pub/sub concepts
* producers / consumers

### Infrastructure

* Docker
* Docker Compose

---

## Core Concepts to Master

### API Design

* REST structure
* DTOs
* validation
* error handling

### Async Processing

* background jobs
* delayed execution
* non-blocking workflows

### Event-Driven Architecture

* publish events instead of direct calls
* decouple services
* react to system events

### Pub/Sub Systems

* producer sends message
* broker holds message
* consumer processes message

### Idempotency

* same event processed twice does not break system

### Retries + Failure Handling

* retry failed jobs
* dead-letter queues
* error recovery

### Caching Strategy

* when to use Redis vs database
* cache invalidation

### System Boundaries

* when logic belongs in same service vs separate

### Data Flow Thinking

* track how data moves across system
* understand lifecycle of an event

---

## Practical Skill Checklist

### Backend

* [ ] Create NestJS API
* [ ] Build CRUD endpoints
* [ ] Validate input
* [ ] Connect to PostgreSQL
* [ ] Persist and retrieve data

### Redis

* [ ] Cache values
* [ ] Use TTL
* [ ] Prevent duplicate processing
* [ ] Implement simple rate limiting

### Messaging

* [ ] Create queue or topic
* [ ] Send message (producer)
* [ ] Receive message (consumer)
* [ ] Handle retries
* [ ] Handle failure cases

### Event Flow

* [ ] Publish "booking.created"
* [ ] Consume event
* [ ] Trigger async processing
* [ ] Log event lifecycle

### Infrastructure

* [ ] Run services with Docker
* [ ] Use docker-compose
* [ ] Connect all services locally

---

## Learning Plan (Daily Focus)

### Week 1 – Backend Foundation

* NestJS basics
* Controllers + services
* PostgreSQL
* DTOs + validation
* API design
* Auth basics
* CRUD implementation

### Week 2 – Systems Thinking

* Redis basics
* Caching patterns
* Async processing
* Event-driven architecture
* Pub/Sub system (Kafka or RabbitMQ)
* Producers / consumers
* Build event pipeline

### Week 3 – Real Patterns

* Idempotency
* Retries
* Dead-letter queues
* Rate limiting
* Logging
* System boundaries
* Refactor architecture

### Week 4 – Infra + Level Up

* Docker basics
* Docker Compose full stack
* Environment configuration
* Performance fundamentals
* Interview prep
* Final system polish

---

## Messaging System Guidance

Both Kafka and RabbitMQ can be used.

### RabbitMQ (Queue / Job Based)

Use when:

* assigning work to be done
* background processing
* single consumer handles job

Example:

* send email
* generate report
* process file

### Kafka (Event Stream Based)

Use when:

* multiple consumers need same event
* system reacts to events
* event history matters
* replay is useful

Example:

* booking created
* order placed
* user registered

---

## Key Mental Model

Instead of thinking:
"call this function"

Think:
"what happens to the data after this action?"

---

## Development Rules

* Start simple (single backend service)
* Add complexity gradually
* Avoid premature microservices
* Focus on understanding behavior, not tools
* Prefer working system over perfect design

---

## End Goal

Be able to confidently say:

"I built a system where an Angular frontend interacts with a NestJS API, events are published through a messaging system, Redis handles caching and idempotency, and background workers process asynchronous workflows."

That is the level required for higher-paying engineering roles.

---

When you paste this into Copilot, follow it up with:

> “Use this directive to guide all code generation and architectural decisions for this project.”

---

When you’re ready, come back and say:

👉 “Let’s implement step 1”
and I’ll walk you through it like a senior architect sitting next to you.
