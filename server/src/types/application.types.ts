export type JobApplication = {
  id: number;
  company: string;
  jobTitle: string;
  jobUrl: string;
  location: string;
  status: string;
  dateApplied: string;
};

export type CreateJobApplicationInput = {
  company: string;
  jobTitle: string;
  jobUrl?: string;
  location?: string;
  salaryMin?: number;
  salaryMax?: number;
  status?: string;
  dateApplied?: string;
  notes?: string;
};

export type UpdateJobApplicationInput = Partial<CreateJobApplicationInput>;