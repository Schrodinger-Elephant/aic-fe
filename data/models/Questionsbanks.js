import mongoose from "mongoose";

const QuestionsbanksSchema = new mongoose.Schema({
  name: String,
  subject: String,
  chapter: String,
  topic: String,
  questions: [String],
});

export default mongoose.models.Questionsbanks ||
  mongoose.model("Questionsbanks", QuestionsbanksSchema);
