import Counter from "../dbSchema/counterSchema.mjs";

// Utility function to get the next sequence number for questionId
export const getNextQuestionId = async () => {
    const counter = await Counter.findOneAndUpdate(
        { id: "questionId" },  // Shared identifier
        { $inc: { seq: 1 } },
        { new: true, upsert: true }
    );
    return counter.seq;
};
