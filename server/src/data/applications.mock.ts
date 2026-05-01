import type { JobApplication } from "../types/application.types.js";

export const initialJobApplications: JobApplication[] = [
  {
    id: 1,
    company: "Shopify",
    jobTitle: "Junior Software Developer",
    jobUrl: "https://example.com/shopify-job",
    location: "Toronto, ON",
    status: "Applied",
    dateApplied: "2026-04-29",
  },
  {
    id: 2,
    company: "RBC",
    jobTitle: "Software Developer Intern",
    jobUrl: "https://example.com/rbc-job",
    location: "Hybrid",
    status: "Saved",
    dateApplied: "2026-04-28",
  },
];

export const jobApplications: JobApplication[] = initialJobApplications.map(
  (application) => ({ ...application })
);

// restores jobApplications back to the original sample data before each test
export function resetJobApplications(): void {
  jobApplications.splice(
    0,
    jobApplications.length,
    ...initialJobApplications.map((application) => ({ ...application }))
  );
}