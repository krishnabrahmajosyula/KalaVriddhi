//used for initializing express server, mongDB connection and also sets routes properly

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import authentication from "./routes/signupRoutes.mjs";
import contributeQuestions from "./routes/questionContributionRoutes.mjs";

const application=express();

//this is the middleware that is used for setting up the express server
application.use(bodyParser.json());
application.use(express.json());
application.use(express.urlencoded({extended:true}));
application.use(express.static("public"));
application.use(cors());

//these are the routes that are handled in the corresponding files
application.use("/auth",authentication);
application.use("/questions",contributeQuestions);


//this statement is used for connecting mongoDB with the corresponding port
mongoose.connect("mongodb://localhost:27017/KalaVriddhi",{
    useNewUrlParser:true,
    useUnifiedTopology:true,  
}).then(()=>{
    application.listen(3000,()=>console.log("Server is running on port 3000"));
    console.log("MongoDB connected");
}).catch(error=>console.log("Failed to connect MongoDB:",error));