import express from "express";
import { getRandomQuizQuestions } from "../featureControllerLogic/quizController.mjs";

const quizRouter = express.Router();
quizRouter.get("/random", getRandomQuizQuestions);

export default quizRouter;
