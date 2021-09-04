import mongoose from "mongoose";

const RemedialquestionSchema = new mongoose.Schema({
  remedialId: String,
  userId: String,
  questions: [
    {
      topic: String,
      content: String,
      question: String,
      answer: String,
    },
  ],
});

export default mongoose.models.Remedialquestion ||
  mongoose.model("Remedialquestion", RemedialquestionSchema);
