import mongoose from "mongoose";

const RemedialSchema = new mongoose.Schema({
  name: String,
  startTime: Date,
  endTime: Date,
  configurations: [
    {
      topic: String,
      numOfQuestion: Number,
    },
  ],
  remedialQuestionId: String,
  passKey: String,
});

export default mongoose.models.Remedial ||
  mongoose.model("Remedial", RemedialSchema);
