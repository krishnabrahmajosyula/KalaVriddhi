import express from "express";
import userSignIn from "../featureControllerLogic/signInController.mjs";

const signInRouter=express.Router();
signInRouter.post("/signin",userSignIn);
export default signInRouter