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

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});