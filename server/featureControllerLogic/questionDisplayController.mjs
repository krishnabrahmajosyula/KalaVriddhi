import Question from "../dbSchema/contributeQuestions.mjs"; 

// Controller function to get all questions from MongoDB
export const getQuestions = async (req, res) => {
  try {
    const questions = await Question.find(); // Retrieve all questions from the database
    res.status(200).json(questions); // Send the questions as a JSON response
  } catch (error) {
    console.error(error); 
    res.status(500).json({ message: "Error retrieving questions", error });
  }
};
