import mongoose from "mongoose";

const QuestionSchema = new mongoose.Schema({
  type: String,
  topic: String, 
  content: String,
  question: String,
  answer: String,
  options: [String],
  answerId: Number,
});

export default mongoose.models.Question ||
  mongoose.model("Question", QuestionSchema);
