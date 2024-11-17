//used for initializing express server, mongDB connection and also sets routes properly

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import authentication from "./routes/signupRoutes.mjs";
import contributeQuestions from "./routes/questionContributionRoutes.mjs";
import addModelRouter from "./routes/modeladdingroute.mjs";
import loginRoutes from "./routes/loginRoutes.mjs";
import listRetrieveRouter from "./routes/showmudras.mjs";
import quizQuestionsRoutes from "./routes/quizQuestionsRoutes.mjs";
import questionDisplayRoute from "./routes/questionDisplayRoute.mjs";
import verifyRoutes from "./routes/verifyRoute.mjs";
import quizRouter from "./routes/quizRoutes.mjs";
import dancelistRetrieveRouter from "./routes/showdancemodels.mjs";
import featureRequestRoute from "./routes/featureRequestRouter.mjs";

const application=express();

//this is the middleware that is used for setting up the express server
application.use(bodyParser.json());
application.use(express.json());
application.use(express.urlencoded({extended:true}));
application.use(express.static("public"));
application.use(cors({origin:'http://127.0.0.1:5501',methods:['GET','POST','DELETE'],allowedHeaders:['Content-Type'],}));

//these are the routes that are handled in the corresponding files
application.use("/auth",authentication);
application.use("/questions/contribute",contributeQuestions);
application.use("/addModel",addModelRouter);
application.use("/questions/quiz", quizQuestionsRoutes);
application.use("/auth", loginRoutes);
application.use("/getmudras",listRetrieveRouter);
application.use("/questions/display", questionDisplayRoute);
application.use("/questions/verify", verifyRoutes);
application.use("/quiz", quizRouter);
application.use("/getdancemodels",dancelistRetrieveRouter);
application.use("/feature-requests",featureRequestRoute);

//this statement is used for connecting mongoDB with the corresponding port
mongoose.connect("mongodb+srv://KalaVriddhi:kalavriddhi_ug6@kalavriddhi.fg8vb.mongodb.net/",{
    useNewUrlParser:true,
    useUnifiedTopology:true,  
}).then(()=>{
    application.listen(3000,()=>console.log("Server is running on port 3000"));
    console.log("MongoDB connected");
}).catch(error=>console.log("Failed to connect MongoDB:",error));