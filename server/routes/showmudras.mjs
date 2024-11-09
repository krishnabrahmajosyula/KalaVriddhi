import express, { Router } from "express";
import { showMudras,deleteMudra } from "../featureControllerLogic/getListMudras.mjs";

const listRetrieveRouter=express.Router();

listRetrieveRouter.get("/getmudra",showMudras);
listRetrieveRouter.delete("/deletemudra/:id",deleteMudra);

export default listRetrieveRouter