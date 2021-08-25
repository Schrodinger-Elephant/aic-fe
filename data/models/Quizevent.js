import mongoose from "mongoose";

const QuizeventSchema = new mongoose.Schema({
  quizId: String,
  quizName: String,
  startTime: Date,
  endTime: Date,
  passKey: String,
});

export default mongoose.models.Quizevent ||
  mongoose.model("Quizevent", QuizeventSchema);
