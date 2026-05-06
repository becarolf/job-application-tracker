import type { Request, Response } from "express";
import {
  createApplication,
  deleteApplication,
  getAllApplications,
  getApplicationById,
  updateApplication,
} from "../services/applications.service.js";
import { createApplicationSchema, updateApplicationSchema } from "../schemas/application.schema.js";  

function getAllApplicationIdFromRequest(req: Request): number | null {
  // req.params.id comes from the URL as a string, so I convert it to a number.
  const applicationId = Number(req.params.id);

  if (Number.isNaN(applicationId)) {
    return null;
  }

  return applicationId;
}

function formatValidationErrors(issues: { message: string }[]): string[] {
  return issues.map((issue) => issue.message);
}

export async function getApplications(
  _req: Request,
  res: Response
): Promise<void> {
  const applications = await getAllApplications();

  res.json(applications);
}

export async function getApplication(
  req: Request,
  res: Response
): Promise<void> {
  const applicationId = getAllApplicationIdFromRequest(req);

  if (applicationId === null) {
    res.status(400).json({
      error: "Application ID must be a number.",
    });
    return;
  }

  const application = await getApplicationById(applicationId);

  if (!application) {
    res.status(404).json({
      error: "Job application not found.",
    });
    return;
  }

  res.json(application);
}

export async function addApplication(
  req: Request,
  res: Response
): Promise<void> {
  const result = createApplicationSchema.safeParse(req.body);

  if (!result.success) {
    res.status(400).json({
      errors: formatValidationErrors(result.error.issues),
    });
    return;
  }

  const newApplication = await createApplication(result.data)

  res.status(201).json(newApplication);
}

export async function editApplication(
  req: Request,
  res: Response
): Promise<void> {
  const applicationId = getAllApplicationIdFromRequest(req);

  if (applicationId === null) {
    res.status(400).json({
      error: "Application ID must be a number.",
    });
    return;
  }

  const result = updateApplicationSchema.safeParse(req.body);

  if (!result.success) {
    res.status(400).json({
      errors: formatValidationErrors(result.error.issues),
    });
    return;
  }

  const updatedApplication = await updateApplication(applicationId, result.data);

  if (!updatedApplication) {
    res.status(404).json({
      error: "Job application not found.",
    });
    return;
  }

  res.json(updatedApplication);
}

export async function removeApplication(
  req: Request,
  res: Response
): Promise<void> {
  const applicationId = getAllApplicationIdFromRequest(req);

  if (applicationId === null) {
    res.status(400).json({
      error: "Application ID must be a number.",
    });
    return;
  }

  const wasDeleted = await deleteApplication(applicationId);

  if (!wasDeleted) {
    res.status(404).json({
      error: "Job application not found.",
    });
    return;
  }

  res.status(204).send();
}