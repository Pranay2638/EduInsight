import express from 'express'
import protect from '../middleware/authMiddleware.js';
import {getSubjects,createSubject,deleteSubject,updateSubject}  from "../controllers/subjectController.js";

const subjectRouter = express.Router();

subjectRouter.use(protect);

subjectRouter.route("/")
  .post(createSubject)
  .get(getSubjects);

subjectRouter.delete("/:id", deleteSubject);
subjectRouter.put("/:id",updateSubject)



export  {subjectRouter};