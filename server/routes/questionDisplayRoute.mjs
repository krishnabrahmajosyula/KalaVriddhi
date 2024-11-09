import express from "express";
import { getQuestions } from "../featureControllerLogic/questionDisplayController.mjs";

const router = express.Router();

// Define the route to get questions
router.get("/display", getQuestions);

export default router;
