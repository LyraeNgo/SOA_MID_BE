import { randomUUID } from "crypto";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

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

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Compare entered password with hashed password
userSchema.methods.matchPassword = async function (enteredPassword) {
  if (!enteredPassword || !this.password)
    throw new Error("Password or hash missing for comparison");
  return await bcrypt.compare(enteredPassword, this.password);
};

export default mongoose.model("User", userSchema);
