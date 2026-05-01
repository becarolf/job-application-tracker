import { prisma } from "../lib/prisma.js";
import type {
  CreateJobApplicationInput,
  UpdateJobApplicationInput,
} from "../types/application.types.js";

export async function getAllApplications() {
  // get all applications from the database
  return prisma.jobApplication.findMany({
    orderBy: {
      id: "asc",
    },
  });
}

export async function getApplicationById(id: number) {
  return prisma.jobApplication.findUnique({
    where: {
      id,
    },
  });
}

export async function createApplication(input: CreateJobApplicationInput) {
  // insert a new row into the JobApplication table
  return prisma.jobApplication.create({
    data: {
      company: input.company,
      jobTitle: input.jobTitle,
      jobUrl: input.jobUrl || null,
      location: input.location || null,
      status: input.status || "Saved",
      dateApplied: input.dateApplied ? new Date(input.dateApplied) : null,
    },
  });
}

export async function updateApplication(
  id: number,
  input: UpdateJobApplicationInput
) {
  const existingApplication = await getApplicationById(id);

  if (!existingApplication) {
    return undefined;
  }

  return prisma.jobApplication.update({
    where: {
      id,
    },
    data: {
      ...(input.company !== undefined && { company: input.company }),
      ...(input.jobTitle !== undefined && { jobTitle: input.jobTitle }),
      ...(input.jobUrl !== undefined && { jobUrl: input.jobUrl }),
      ...(input.location !== undefined && { location: input.location }),
      ...(input.status !== undefined && { status: input.status }),
      ...(input.dateApplied !== undefined && {
        dateApplied: input.dateApplied ? new Date(input.dateApplied) : null,
      }),
    },
  });
}

export async function deleteApplication(id: number): Promise<boolean> {
  const existingApplication = await getApplicationById(id);

  if (!existingApplication) {
    return false;
  }

  await prisma.jobApplication.delete({
    where: {
      id,
    },
  });

  return true;
}