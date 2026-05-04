# Database Setup

This document explains the first database setup for the Job Application Tracker.

The project uses PostgreSQL as the database.

For local development, PostgreSQL runs inside Docker. Prisma is used to define the database schema, run migrations, and connect the backend to the database.

## Tools

I am using:

- PostgreSQL as the database
- Docker to run PostgreSQL locally
- Prisma to manage the database schema and queries

## Local Database

The database is defined in `docker-compose.yml`.

Current local database setup:

```txt
Database: job_tracker
User: job_tracker_user
Port on my machine: 5433
Port inside the container: 5432
```

These values are for local development only.

The port is mapped like this:

```txt
5433:5432
```

This means my computer connects to PostgreSQL using port `5433`, but inside the Docker container PostgreSQL still uses its default port, `5432`.

## Environment Variable

The backend connects to the database using `DATABASE_URL` inside `server/.env`.

The `.env` file is not committed to GitHub because it can contain sensitive information, like database passwords.

The local connection string follows this format:

```txt
postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public
```

## Prisma Schema

The first database model is `JobApplication`.

I started with only this model because the main goal was to replace the temporary in-memory array with a real database.

The model stores the main job application information:

```txt
company
jobTitle
jobUrl
location
salaryMin
salaryMax
status
dateApplied
notes
createdAt
updatedAt
```

## Migrations

Prisma migrations are stored in:

```txt
server/prisma/migrations
```

To run migrations from the `server` folder:

```bash
npx prisma migrate dev
```

## Current Database Decision

For the first database version, I only added the `JobApplication` model.

I decided not to add users, tags, reminders, contacts, or documents yet because I wanted to keep the first database step focused.

The goal for this phase was:

```txt
Before:
API → service → in-memory array

After:
API → service → Prisma → PostgreSQL
```

Later, I can add more models as the app grows.