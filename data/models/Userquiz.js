import mongoose from "mongoose";

const UserquizSchema = new mongoose.Schema({
  studentId: String,
  quizId: String,
  answers: [String],
  grade: Number,
  persona: {
    falseAnswerIdx: [Number],
  },
});

export default mongoose.models.Userquiz ||
  mongoose.model("Userquiz", UserquizSchema);
