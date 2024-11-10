import QuizQuestion from "../dbSchema/QuestionSchema.mjs";
import { getNextQuestionId } from "../utils/questionIdUtils.mjs";


export const addQuizQuestion = async (req, res) => {
    try {
        
        

        const { question, option1, option2, option3, option4 ,answer} = req.body;

        //check if question exists
        const existingQuestion = await QuizQuestion.findOne({ question });
        if (existingQuestion) {
            return res.status(400).json({ message: "This question already exists." });
        }

        // Get the next questionId from the counter
        const questionId = await getNextQuestionId();
        // Create a new quiz question document with an incremental questionId
        const newQuizQuestion = new QuizQuestion({
            questionId,
            question,
            option1,
            option2,
            option3,
            option4,
            answer
        });

        // Save the question to the database
        await newQuizQuestion.save();

        // Send a success response
        res.status(201).json({ message: "Quiz question added successfully!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error adding quiz question" });
    }
};
