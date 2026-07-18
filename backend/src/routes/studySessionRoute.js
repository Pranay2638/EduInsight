import express from "express";

import protect from "../middleware/authMiddleware.js";

import {
  createStudySession,
  getStudySessions,
  deleteStudySession,
  updateStudySession,
} from "../controllers/studySessionController.js";

const sessionRouter = express.Router();

sessionRouter.use(protect);

sessionRouter
  .route("/")
  .post(createStudySession)
  .get(getStudySessions);

sessionRouter.put("/:id",updateStudySession)
sessionRouter.delete("/:id", deleteStudySession);

export default sessionRouter;