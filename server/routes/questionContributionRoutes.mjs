import express from "express";
import contributeAQuestion from "../featureControllerLogic/questioncontController.mjs";

const contributeRouter=express.Router();
contributeRouter.post("/contribute",contributeAQuestion);
export default contributeRouter