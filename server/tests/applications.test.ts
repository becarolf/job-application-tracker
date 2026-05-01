import request from "supertest";
import { beforeEach, describe, expect, it } from "vitest";
import { app } from "../src/app.js";
import { resetJobApplications } from "../src/data/applications.mock.js";

beforeEach(() => {
  resetJobApplications();
});

describe("Health route", () => {
  it("returns backend health status", async () => {
    const response = await request(app).get("/health");

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      status: "ok",
      message: "Backend is running",
    });
  });
});

describe("Applications API", () => {
  it("returns all job applications", async () => {
    const response = await request(app).get("/api/applications");

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(2);
    expect(response.body[0].company).toBe("Shopify");
  });

  it("returns one job application by ID", async () => {
    const response = await request(app).get("/api/applications/1");

    expect(response.status).toBe(200);
    expect(response.body.id).toBe(1);
    expect(response.body.company).toBe("Shopify");
  });

  it("returns 404 when the job application does not exist", async () => {
    const response = await request(app).get("/api/applications/999");

    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      error: "Job application not found.",
    });
  });

  it("creates a new job application", async () => {
    const response = await request(app)
      .post("/api/applications")
      .send({
        company: "Google",
        jobTitle: "Software Developer Intern",
        jobUrl: "https://example.com/google-job",
        location: "Toronto, ON",
        status: "Saved",
        dateApplied: "2026-04-29",
      });

    expect(response.status).toBe(201);
    expect(response.body.id).toBe(3);
    expect(response.body.company).toBe("Google");
    expect(response.body.jobTitle).toBe("Software Developer Intern");
  });

  it("returns 400 when creating an application without required fields", async () => {
    const response = await request(app)
      .post("/api/applications")
      .send({
        location: "Toronto, ON",
      });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      error: "Company and job title are required.",
    });
  });

  it("updates part of a job application", async () => {
    const response = await request(app)
      .patch("/api/applications/1")
      .send({
        status: "Technical Interview",
      });

    expect(response.status).toBe(200);
    expect(response.body.id).toBe(1);
    expect(response.body.status).toBe("Technical Interview");
    expect(response.body.company).toBe("Shopify");
  });

  it("deletes a job application", async () => {
    const deleteResponse = await request(app).delete("/api/applications/1");

    expect(deleteResponse.status).toBe(204);

    const getResponse = await request(app).get("/api/applications/1");

    expect(getResponse.status).toBe(404);
  });
});