import request from "supertest";
import { beforeEach, describe, expect, it } from "vitest";
import { app } from "../src/app.js";
import { prisma } from "../src/lib/prisma.js";

let shopifyId: number;
let rbcId: number;

beforeEach(async () => {
  // it will clear the database table
  await prisma.jobApplication.deleteMany();

  // create fresh sample data
  const shopify = await prisma.jobApplication.create({
    data: {
      company: "Shopify",
      jobTitle: "Junior Software Developer",
      jobUrl: "https://example.com/shopify-job",
      location: "Toronto, ON",
      status: "Applied",
      dateApplied: new Date("2026-04-29"),
    },
  });

  const rbc = await prisma.jobApplication.create({
    data: {
      company: "RBC",
      jobTitle: "Software Developer Intern",
      jobUrl: "https://example.com/rbc-job",
      location: "Hybrid",
      status: "Saved",
      dateApplied: new Date("2026-04-28"),
    },
  });

  shopifyId = shopify.id;
  rbcId = rbc.id;
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
    expect(response.body[1].company).toBe("RBC");
  });

  it("returns one job application by ID", async () => {
    const response = await request(app).get(`/api/applications/${shopifyId}`);

    expect(response.status).toBe(200);
    expect(response.body.id).toBe(shopifyId);
    expect(response.body.company).toBe("Shopify");
  });

  it("returns 404 when the job application does not exist", async () => {
    const response = await request(app).get("/api/applications/999999");

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
    expect(response.body.id).toEqual(expect.any(Number));
    expect(response.body.company).toBe("Google");
    expect(response.body.jobTitle).toBe("Software Developer Intern");

    const listResponse = await request(app).get("/api/applications");

    expect(listResponse.body).toHaveLength(3);
  });

  it("saves salary and notes when creating a job application", async () => {
    const response = await request(app)
      .post("/api/applications")
      .send({
        company: "Amazon",
        jobTitle: "Junior Backend Developer",
        salaryMin: 70000,
        salaryMax: 90000,
        notes: "Found on company careers page.",
      });

    expect(response.status).toBe(201);
    expect(response.body.salaryMin).toBe(70000);
    expect(response.body.salaryMax).toBe(90000);
    expect(response.body.notes).toBe("Found on company careers page.");
  });

  it("returns 400 when creating an application without required fields", async () => {
    const response = await request(app)
      .post("/api/applications")
      .send({
        location: "Toronto, ON",
      });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      errors: ["Company is required.", "Job title is required."],
    });
  });

  it("returns 400 when creating an application with an invalid salary range", async () => {
    const response = await request(app)
      .post("/api/applications")
      .send({
        company: "Google",
        jobTitle: "Software Developer Intern",
        salaryMin: 90000,
        salaryMax: 60000,
      });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      errors: ["Salary max must be greater than or equal to salary min."],
    });
  });

  it("returns 400 when creating an application with an invalid status", async () => {
    const response = await request(app)
      .post("/api/applications")
      .send({
        company: "Google",
        jobTitle: "Software Developer Intern",
        status: "Random Status",
      });

    expect(response.status).toBe(400);
  });

  it("updates part of a job application", async () => {
    const response = await request(app)
      .patch(`/api/applications/${shopifyId}`)
      .send({
        status: "Technical Interview",
      });

    expect(response.status).toBe(200);
    expect(response.body.id).toBe(shopifyId);
    expect(response.body.status).toBe("Technical Interview");
    expect(response.body.company).toBe("Shopify");
  });

  it("returns 400 when updating with an empty body", async () => {
    const response = await request(app)
      .patch(`/api/applications/${shopifyId}`)
      .send({});

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      errors: ["At least one field is required for update."],
    });
  });

  it("deletes a job application", async () => {
    const deleteResponse = await request(app).delete(
      `/api/applications/${shopifyId}`
    );

    expect(deleteResponse.status).toBe(204);

    const getResponse = await request(app).get(`/api/applications/${shopifyId}`);

    expect(getResponse.status).toBe(404);
  });
});