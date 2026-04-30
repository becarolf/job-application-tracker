import { appendFile } from "node:fs";
import { jobApplications } from "../data/applications.mock.js";
import type {
  CreateJobApplicationInput,
  JobApplication,
  UpdateJobApplicationInput,
} from "../types/application.types.js"
import { application } from "express";

export function getAllApplications(): JobApplication[] {
  return jobApplications;
}

export function getApplicationById(id: number): JobApplication | undefined {
  return jobApplications.find((application) => application.id === id);
}

export function createApplication(
  input: CreateJobApplicationInput
): JobApplication {
  const nextId = 
    jobApplications.length === 0 
      ? 1
      : Math.max(...jobApplications.map((application) => application.id)) + 1;
  
  const newApplication: JobApplication = {
    id: nextId,
    company: input.company,
    jobTitle: input.jobTitle,
    jobUrl: input.jobUrl || "",
    location: input.location || "",
    status: input.status || "Saved",
    dateApplied: input.dateApplied || new Date().toISOString().split("T")[0],
  };

  jobApplications.push(newApplication);

  return newApplication;
}

export function updateApplication(
  id: number,
  input: UpdateJobApplicationInput
): JobApplication | undefined {
  const application = getApplicationById(id);

  if (!application) {
    return undefined;
  }

  if (input.company !== undefined) application.company = input.company;
  if (input.jobTitle !== undefined) application.jobTitle = input.jobTitle;
  if (input.jobUrl !== undefined) application.jobUrl = input.jobUrl;
  if (input.location !== undefined) application.location = input.location;
  if (input.status !== undefined) application.status = input.status;
  if (input.dateApplied !== undefined) {
    application.dateApplied = input.dateApplied;
  }

  return application
}

export function deleteApplication(id: number): boolean {
  const applicationIndex = jobApplications.findIndex(
    (application) => application.id === id
  );

  if (applicationIndex === -1) {
    return false;
  }

  jobApplications.splice(applicationIndex, 1);

  return true;
}
