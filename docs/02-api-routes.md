# API Routes

These are the current backend routes for the Job Application Tracker.

At first, the API used temporary data stored in an array. Now, the routes are connected to PostgreSQL using Prisma, so the job applications are saved in the database.


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
    "company": "Google",
    "jobTitle": "Software Developer Intern",
    "jobUrl": "https://example.com/google-job",
    "location": "Toronto, ON",
    "salaryMin": null,
    "salaryMax": null,
    "status": "Saved",
    "dateApplied": "2026-04-29T00:00:00.000Z",
    "notes": null,
    "createdAt": "2026-05-01T21:17:28.379Z",
    "updatedAt": "2026-05-01T21:17:28.379Z"
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
salaryMin
salaryMax
status
dateApplied
notes
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
  "id": 1,
  "company": "Google",
  "jobTitle": "Software Developer Intern",
  "jobUrl": "https://example.com/google-job",
  "location": "Toronto, ON",
  "salaryMin": null,
  "salaryMax": null,
  "status": "Saved",
  "dateApplied": "2026-04-29T00:00:00.000Z",
  "notes": null,
  "createdAt": "2026-05-01T21:17:28.379Z",
  "updatedAt": "2026-05-01T21:17:28.379Z"
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
salaryMin
salaryMax
status
dateApplied
notes
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

The API is now connected to PostgreSQL.

The backend uses Prisma to create, read, update, and delete job applications.

Current flow:

```txt
Client sends request
Backend receives request
Express matches the route
Controller handles the request and response
Service handles the application logic
Prisma talks to PostgreSQL
Backend sends JSON response
```

Later improvements:

```txt
Add better validation
Add error handling middleware
Add authentication
Add users
Add tags, reminders, contacts, and documents
```