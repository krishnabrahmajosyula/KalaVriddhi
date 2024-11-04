//this module is used for defining the controller logic handling the contribution request for   quizzes

import question from "../dbSchema/contributeQuestions.mjs";

async function contributeAQuestion(req,res){
    const {artName,Question,option1,option2,option3,option4}=req.body;
    try{
        const existingQuestion=await question.findOne({Question});
        if(existingQuestion){
            return res.status(400).json({message:"There is already a question submitted by an user. Please contribute a new question if possible."});
        }
        const newQuestion=new question({artName,Question,option1,option2,option3,option4});
        await newQuestion.save();
        res.status(201).json({message:"Question submitted successfully. Thank You for your vauable contribution."});

    }catch(error){
        console.error("Error in submitting question:",error);
        res.status(500).json({message:"Failed to submit the question. Please try again."});
    }
}
export default contributeAQuestion