import express from "express";
import { showDanceModels } from "../featureControllerLogic/getlistdancemodels.mjs";

const dancelistRetrieveRouter=express.Router();

dancelistRetrieveRouter.get("/showdancemodels",showDanceModels);

export default dancelistRetrieveRouter