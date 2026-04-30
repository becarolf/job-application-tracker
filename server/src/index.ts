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