import { randomUUID } from "crypto";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    userid: {
      type: String,
      default: () => randomUUID(), // UUID tự sinh khi tạo user mới
      unique: true,
    },
    username: {
      type: String,
      required: true,
      trim: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    passwordHash: {
      type: String,
      required: true,
    },
    balance: {
      type: Number,
      required: true,
      default: 50000000,
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
