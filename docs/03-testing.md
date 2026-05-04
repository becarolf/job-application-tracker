# Testing Notes

These are my first automated tests for the backend API.

## Tools

I am using:

- Vitest to run the tests
- Supertest to test the Express routes without needing to use the browser or curl

## How to Run the Tests

From the `server` folder:

```bash
npm test
```

## What I Am Testing

Right now, the tests cover the main backend routes:

```txt
GET /health
GET /api/applications
GET /api/applications/:id
POST /api/applications
PATCH /api/applications/:id
DELETE /api/applications/:id
```

I am also testing some basic error cases:

```txt
404 when a job application does not exist
400 when required fields are missing
```

## Test Data

The backend is now connected to PostgreSQL.

Before each test, the `JobApplication` table is cleared and fresh sample data is inserted again.

This way, each test starts with the same data and does not affect the next one.

## Why I Added Tests Now

I added tests after building and refactoring the basic CRUD API.

This felt like the right time because the routes were already working, and I wanted a safety net before and after connecting the API to PostgreSQL.

The tests help me make sure the API still works when I change the internal implementation.