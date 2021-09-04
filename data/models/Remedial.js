import mongoose from "mongoose";

const RemedialSchema = new mongoose.Schema({
  startTime: Date,
  endTime: Date,
  passKey: String,
});

export default mongoose.models.Remedial ||
  mongoose.model("Remedial", RemedialSchema);
