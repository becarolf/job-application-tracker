import type { Request, Response } from "express";
import {
  createApplication, 
  deleteApplication,
  getAllApplications,
  getApplicationById,
  updateApplication,
} from "../services/applications.service.js";

function getAllApplicationIdFromRequest(req: Request): number | null {
  // req.params.id comes from the URL as a string, so I convert it to a number.
  const applicationId = Number(req.params.id);

  if (Number.isNaN(applicationId)) {
    return null;
  }

  return applicationId;
}

export function getApplications(_req: Request, res: Response): void {
  res.json(getAllApplications());
}

export function getApplication(req: Request, res: Response): void {
  const applicationId = getAllApplicationIdFromRequest(req);

  if (applicationId === null) {
    res.status(400).json({
      error: "Application ID must be a number.",
    });
    return;
  }

  const application = getApplicationById(applicationId);

  if (!application) {
    res.status(404).json({
      error: "Job application not found.",
    });
    return;
  }

  res.json(application);
}

export function addApplication(req: Request, res: Response): void {
  const { company, jobTitle, jobUrl, location, status, dateApplied } = req.body;

  if (!company || !jobTitle) {
    res.status(400).json({
      error: "Company and job title are required.",
    });
    return;
  }

  const newApplication = createApplication({
    company,
    jobTitle,
    jobUrl,
    location,
    status,
    dateApplied,
  });

  res.status(201).json(newApplication);
}

export function editApplication(req: Request, res: Response): void {
  const applicationId = getAllApplicationIdFromRequest(req);

  if (applicationId === null) {
    res.status(400).json({
      error: "Application ID must be a number.",
    });
    return;
  }

  const updatedApplication = updateApplication(applicationId, req.body);

  if (!updateApplication) {
    res.status(404).json({
      error: "Job application not found.",
    });
    return;
  }

  res.json(updatedApplication)
}

export function removeApplication(req: Request, res: Response): void {
  const applicationId = getAllApplicationIdFromRequest(req);

  if (applicationId === null) {
    res.status(400).json({
      error: "Application ID must be a number.",
    });
    return;
  }

  const wasDeleted = deleteApplication(applicationId);

  if (!wasDeleted){
    res.status(404).json({
      error: "Job application not found.",
    });
    return;
  }

  res.status(204).send();
}