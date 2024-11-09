import express from "express";
import QuizQuestion from "../dbSchema/QuestionSchema.mjs";
import { addQuizQuestion } from "../featureControllerLogic/quizQuestionController.mjs";

const router = express.Router();

// Route to handle adding quiz questions
router.post("/add", addQuizQuestion);

export default router;
