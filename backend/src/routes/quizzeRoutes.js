import express from "express";

import protect from "../middleware/authMiddleware.js";

import {
  createQuiz,
  getQuizzes,
  deleteQuiz,
  updateQuiz
} from "../controllers/quizzeController.js";

const quizzeRouter = express.Router();

quizzeRouter.use(protect);

quizzeRouter.route("/")
  .post(createQuiz)
  .get(getQuizzes);

quizzeRouter.delete("/:id", deleteQuiz);
quizzeRouter.put("/:id", updateQuiz);

export default quizzeRouter;