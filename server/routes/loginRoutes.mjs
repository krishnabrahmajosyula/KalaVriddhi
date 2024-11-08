import express from "express";
import userLogin from "../featureControllerLogic/loginController.mjs";

const loginRouter = express.Router();
loginRouter.post("/login", userLogin);

export default loginRouter;