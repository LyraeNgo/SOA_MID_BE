import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, trim: true },
    phoneNumber:{type: Number, required:true},
    email: { type: String, required: true, unique: true, lowercase: true },
    passwordHash: { type: String, required: true },
    balance:{type: Number, required:true}
    
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
