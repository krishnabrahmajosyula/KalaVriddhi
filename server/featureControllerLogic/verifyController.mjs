import Question from "../dbSchema/contributeQuestions.mjs";
import QuizQuestion from "../dbSchema/QuestionSchema.mjs";
import { getNextQuestionId } from "../utils/questionIdUtils.mjs";
// Function to verify the question based on admin's approval
export const verifyQuestion = async (req, res) => {
    const { questionB, artName, question, option1, option2, option3, option4,answer, isApproved } = req.body;
    console.log("Received data:",req.body);
    try {
        
        if (isApproved) {

            //check if question exists
            const existingQuestion = await QuizQuestion.findOne({ question });
            if (existingQuestion) {
                console.log("Duplicate question, not adding to QuizQuestion schema.");
            }
            else{
            // Generate a unique questionId using Counter collection
            const questionId=await getNextQuestionId();
            const newQuizQuestion = new QuizQuestion({
                questionId: questionId,
                question,
                option1,
                option2,
                option3,
                option4,
                answer
            });

            await newQuizQuestion.save();
            console.log("Question added to QuizQuestion schema.");
            }
        }
        
        // Delete the question from Questions collection iun both cases
       
        const result=await Question.deleteOne({ Question: questionB });
        
        if (result.deletedCount === 0) {
            console.error("Question not found for deletion.");
            return res.status(404).json({ error: "Question not found for deletion." });
        } else {
            console.log("Question deleted from Questions schema.");
        }
        res.status(200).json({ message: "Question processed successfully." });
    } catch (error) {
        console.error("Error verifying question:", error);
        res.status(500).json({ error: "An error occurred while processing the question." });
    }
};