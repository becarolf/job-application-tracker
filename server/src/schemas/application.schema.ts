import { z } from "zod";

const applicationStatusSchema = z.enum([
  "Saved",
  "Applied",
  "Recruiter Screen",
  "Technical Interview",
  "Final Interview",
  "Offer",
  "Rejected",
  "Withdrawn",
]);

const dateStringSchema = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, "Date must use YYYY-MM-DD format.");

const applicationBaseSchema = z.object({
  company: z.string({ error: "Company is required." }).trim().min(1, "Company is required."),
  jobTitle: z.string({ error: "Job title is required." }).trim().min(1, "Job title is required."),
  jobUrl: z.preprocess(
    (value) => (typeof value === "string" ? value.trim() : value),
    z.url("Job URL must be valid.").optional()
  ),
  location: z.string().trim().optional(),
  salaryMin: z.number().int().positive().optional(),
  salaryMax: z.number().int().positive().optional(),
  status: applicationStatusSchema.optional(),
  dateApplied: dateStringSchema.optional(),
  notes: z.string().trim().optional(),
});

function isValidSalaryRange(data: {
  salaryMin?: number;
  salaryMax?: number;
}): boolean {
  return (
    data.salaryMin === undefined ||
    data.salaryMax === undefined ||
    data.salaryMax >= data.salaryMin
  );
}

export const createApplicationSchema = applicationBaseSchema.refine(
  isValidSalaryRange,
  {
    message: "Salary max must be greater than or equal to salary min.",
    // Here I tell Zod to attach the error to the salaryMax field.
    path: ["salaryMax"],
  }
);

// PATCH: all fields are optional, but the user cannot send an empty body.
// An empty body would mean there is nothing to update.
export const updateApplicationSchema = applicationBaseSchema
  .partial()
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field is required for update.",
  })
  .refine(isValidSalaryRange, {
    message: "Salary max must be greater than or equal to salary min.",
    path: ["salaryMax"],
  });