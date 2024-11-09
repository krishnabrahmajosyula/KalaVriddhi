import QuizQuestion from "../dbSchema/QuestionSchema.mjs";
import Counter from "../dbSchema/counterSchema.mjs";

export async function getRandomQuizQuestions(req, res) {
    try {
        // Fetch the total number of questions from the counter schema
        const counter = await Counter.findOne({ id: "questionId" });
        const totalQuestions = counter ? counter.seq : 0;
        console.log(totalQuestions);
        if (totalQuestions < 5) {
            return res.status(400).json({ message: "Not enough questions available." });
        }

        // Generate 5 unique random indices
        const randomIndices = new Set();
        while (randomIndices.size < 5) {
            const randomIndex = Math.floor(Math.random() * totalQuestions);
            randomIndices.add(randomIndex);
        }

        // Fetch all questions from the database
        const allQuestions = await QuizQuestion.find({});

        // Select questions based on the random indices
        const randomQuestions = Array.from(randomIndices).map(index => allQuestions[index]);

        res.status(200).json(randomQuestions);
    } catch (error) {
        console.error("Error fetching quiz questions", error);
        res.status(500).json({ message: "Error fetching quiz questions" });
    }
}
