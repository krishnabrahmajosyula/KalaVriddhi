import express, { Router } from "express";
import { uploadModel,getModel,uploadSingleModel } from "../featureControllerLogic/modelAddController.mjs";

const modelAddRouter=express.Router();

modelAddRouter.post("/uploadmodel",uploadSingleModel,uploadModel);
modelAddRouter.get("/models",getModel);

export default modelAddRouter