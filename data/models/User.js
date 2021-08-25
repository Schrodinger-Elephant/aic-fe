import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  fullname: String,
  absentNumber: Number,
  waNumber: Number,
  username: String,
  password: String,
  role: String, 
  class: String,
});

export default mongoose.models.User || mongoose.model("User", UserSchema);
