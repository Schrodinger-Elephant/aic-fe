import mongoose from "mongoose";

const NewQuestionSchema = new mongoose.Schema({
  topic: String,
  content: String,
  question: String,
  answer: String,
});

export default mongoose.models.NewQuestion ||
  mongoose.model("NewQuestion", NewQuestionSchema);
