import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());


type JobApplication = {
  id: number;
  company: string;
  jobTitle: string;
  jobUrl: string;
  location: string;
  status: string;
  dateApplied: string;
};

const jobApplications: JobApplication[] = [
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

// health check route: testing if the backend server is running
app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    message: "Backend is running",
  });
});

// application route: checking if the route returns job applications data for the app
app.get("/api/applications", (req, res) => {
  res.json(jobApplications);
});


// returns one job application by ID.
// example: GET /api/applications/1
app.get("/api/applications/:id", (req, res) => {
  // req.params.id comes from the URL as a string, so I convert it to a number.
  const applicationId = Number(req.params.id);

  if (Number.isNaN(applicationId)) {
    res.status(400).json({
      error: "Application ID must be a number.",
    });
    return;
  }

  const application = jobApplications.find((app) => app.id === applicationId);

  if (!application) {
    res.status(404).json({
      error: "Job application not found.",
    });
    return;
  }

  res.json(application);
});


// updates part of a job application by ID.
// example: PATCH /api/applications/1
app.patch("/api/applications/:id", (req, res) => {
  const applicationId = Number(req.params.id);

  if (Number.isNaN(applicationId)) {
    res.status(400).json({
      error: "Application ID must be a number.",
    });
    return;
  }

  const application = jobApplications.find((app) => app.id === applicationId);

  if (!application) {
    res.status(404).json({
      error: "Job application not found.",
    });
    return;
  }

  const { company, jobTitle, jobUrl, location, status, dateApplied } = req.body;

  if (company !== undefined) application.company = company;
  if (jobTitle !== undefined) application.jobTitle = jobTitle;
  if (jobUrl !== undefined) application.jobUrl = jobUrl;
  if (location !== undefined) application.location = location;
  if (status !== undefined) application.status = status;
  if (dateApplied !== undefined) application.dateApplied = dateApplied;

  res.json(application);
});


// Deletes one job application by ID.
// Example: DELETE /api/applications/1
app.delete("/api/applications/:id", (req, res) => {
  const applicationId = Number(req.params.id);

  if (Number.isNaN(applicationId)) {
    res.status(400).json({
      error: "Application ID must be a number.",
    });
    return;
  }

  const applicationIndex = jobApplications.findIndex(
    (app) => app.id === applicationId
  );

  if (applicationIndex === -1) {
    res.status(404).json({
      error: "Job application not found.",
    });
    return;
  }

  jobApplications.splice(applicationIndex, 1);

  res.status(204).send();
});


app.post("/api/applications", (req, res) => {
  const { company, jobTitle, jobUrl, location, status, dateApplied } = req.body;

  if (!company || !jobTitle) {
    return res.status(400).json({
      error: "Company and job title are required.",
    });
  }

  const newApplication: JobApplication = {
    id: jobApplications.length + 1,
    company,
    jobTitle,
    jobUrl: jobUrl || "",
    location: location || "",
    status: status || "Saved",
    dateApplied: dateApplied || new Date().toISOString().split("T")[0],
  };

  jobApplications.push(newApplication);

  res.status(201).json(newApplication); // 201 means "created"
});

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});