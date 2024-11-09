import mongoose from "mongoose";

// Define the schema for the counter
const counterSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true }, // Identifier for the counter
    seq: { type: Number, default: 0 }                   // Last sequence number used
});

const Counter = mongoose.model("Counter", counterSchema);

export default Counter;
