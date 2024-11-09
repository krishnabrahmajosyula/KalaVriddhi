import mongoose from 'mongoose';

// Define the schema for quiz questions
const quizQuestionSchema = new mongoose.Schema({
    questionId: { type: String, required: true, unique: true },
    question: { type: String, required: true },
    option1: { type: String, required: true },
    option2: { type: String, required: true },
    option3: { type: String, required: true },
    option4: { type: String, required: true },
    answer: { type: String, required: true }
});

const QuizQuestion = mongoose.model("QuizQuestion", quizQuestionSchema);

export default QuizQuestion;
