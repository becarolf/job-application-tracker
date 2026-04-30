import { Router } from "express";
import {
  addApplication,
  editApplication,
  getApplication,
  getApplications,
  removeApplication,
} from "../controllers/applications.controller.js"

export const applicationsRouter = Router();

applicationsRouter.get("/", getApplications);
applicationsRouter.post("/", addApplication);
applicationsRouter.get("/:id", getApplication);
applicationsRouter.patch("/:id", editApplication);
applicationsRouter.delete("/:id", removeApplication);