import express from "express";
import { verifyQuestion } from "../featureControllerLogic/verifyController.mjs";

const router = express.Router();

// Route for verifying a question
router.post("/verify", verifyQuestion);

export default router;