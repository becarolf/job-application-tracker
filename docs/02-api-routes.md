# API Routes

These are the first backend routes for the Job Application Tracker.

Right now, the data is temporary and is stored in an array inside the backend code. Later, I will connect these routes to a PostgreSQL database.

## GET /health

This route checks if the backend is running.

It is not related to the job application data. It is just a simple way to confirm that the server is working.

Example response:

```json
{
  "status": "ok",
  "message": "Backend is running"
}
```

## /api/applications

This is the main route for job application data.

So far, I created these routes:

```txt
GET /api/applications
POST /api/applications
GET /api/applications/:id
PATCH /api/applications/:id
DELETE /api/applications/:id
```

## GET /api/applications

This route returns the list of job applications.

For now, it returns the sample applications stored in the backend array.

Example response:

```json
[
  {
    "id": 1,
    "company": "Shopify",
    "jobTitle": "Junior Software Developer",
    "jobUrl": "https://example.com/shopify-job",
    "location": "Toronto, ON",
    "status": "Applied",
    "dateApplied": "2026-04-29"
  }
]
```

## POST /api/applications

This route creates a new job application.

It receives the data in the request body, creates a new application object, adds it to the array, and returns the new application.

Required fields:

```txt
company
jobTitle
```

Optional fields:

```txt
jobUrl
location
status
dateApplied
```

Example request body:

```json
{
  "company": "Google",
  "jobTitle": "Software Developer Intern",
  "jobUrl": "https://example.com/google-job",
  "location": "Toronto, ON",
  "status": "Saved",
  "dateApplied": "2026-04-29"
}
```

Example response:

```json
{
  "id": 3,
  "company": "Google",
  "jobTitle": "Software Developer Intern",
  "jobUrl": "https://example.com/google-job",
  "location": "Toronto, ON",
  "status": "Saved",
  "dateApplied": "2026-04-29"
}
```

## GET /api/applications/:id

This route returns one job application by its ID.

Example:

```txt
GET /api/applications/1
```

If the application exists, it returns that application.

If the ID does not exist, it returns an error message.

## PATCH /api/applications/:id

This route updates part of a job application.

Example:

```txt
PATCH /api/applications/1
```

For now, I can update fields like:

```txt
company
jobTitle
jobUrl
location
status
dateApplied
```

Example request body:

```json
{
  "status": "Technical Interview"
}
```

This only updates the status and keeps the other fields the same.

## DELETE /api/applications/:id

This route deletes one job application by its ID.

Example:

```txt
DELETE /api/applications/1
```

If the application exists, it removes it from the array.

If the ID does not exist, it returns an error message.

## Notes

The current API is only the first version.

The data is not saved permanently. If I stop and restart the server, any new applications created, updated, or deleted will reset because the data is only stored in memory.

At this stage, the goal is to understand how backend routes work before adding a real database.

Current flow:

```txt
Client sends request
Backend receives request
Express matches the route
Backend sends JSON response
```

Later improvements:

```txt
Connect routes to PostgreSQL
Add better validation
Add error handling
Add authentication
Refactor the backend into routes, controllers, and services
```