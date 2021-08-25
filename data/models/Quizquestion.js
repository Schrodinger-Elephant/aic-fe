import mongoose from "mongoose";

const QuizquestionSchema = new mongoose.Schema({
  questions: [
    {
      topic: String,
      content: String,
      question: String,
      answer: String,
    },
  ],
});

export default mongoose.models.Quizquestion ||
  mongoose.model("Quizquestion", QuizquestionSchema);
