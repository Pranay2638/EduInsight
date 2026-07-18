import express from "express";

import protect from "../middleware/authMiddleware.js";

import {
  getOverviewAnalytics,
  getSubjectAnalysis,
  getStudyTrend,
  getLearningCoach,
  getProductivityAnalytics
} from "../controllers/analyticsController.js";

const analyticsRouter = express.Router();

analyticsRouter.use(protect);

analyticsRouter.get("/overview",getOverviewAnalytics);
analyticsRouter.get("/subject-analysis",getSubjectAnalysis);
analyticsRouter.get("/study-trend",getStudyTrend)
analyticsRouter.get('/learning-coach',getLearningCoach)
analyticsRouter.get("/productivity",getProductivityAnalytics)

export default analyticsRouter;