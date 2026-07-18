import express from "express";

import protect from "../middleware/authMiddleware.js";

import {
    getWeeklyReport,
    chatWithAI
}
from "../controllers/intelligenceController.js";

const intelligenceRouter = express.Router();

intelligenceRouter.use(protect);

intelligenceRouter.get(
    "/report",
    getWeeklyReport
);

intelligenceRouter.post(
    "/chat",
    protect,
    chatWithAI
);

export default intelligenceRouter;