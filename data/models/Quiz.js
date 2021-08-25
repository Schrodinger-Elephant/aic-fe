import mongoose from "mongoose";

const QuizSchema = new mongoose.Schema({
  name: String,
  startTime: Date,
  endTime: Date,
  configurations: [
    {
      topic: String,
      numOfQuestion: Number,
    },
  ],
  quizquestionId: String,
  passKey: String,
});

export default mongoose.models.Quiz || mongoose.model("Quiz", QuizSchema);
