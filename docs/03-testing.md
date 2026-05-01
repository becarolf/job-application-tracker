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

The backend is still using temporary data stored in an array.

Since the tests can create, update, or delete applications, I reset the array before each test. This way, each test starts with the same sample data and does not affect the next one.

## Why I Added Tests Now

I added tests after building and refactoring the basic CRUD API.

This felt like the right time because the routes are working, but the app is still simple enough to test.

The goal is to have a safety net before replacing the temporary array with a real PostgreSQL database.