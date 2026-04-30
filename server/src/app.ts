import express from "express";
import cors from "cors";
import { applicationsRouter } from "./routes/applications.routes.js";
import { healthRouter } from "./routes/health.routes.js";

export const app = express();

app.use(cors());
app.use(express.json());

app.use("/health", healthRouter);
app.use("/api/applications", applicationsRouter);