import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
  {
    transactionCode: { type: String, required: true, unique: true },
    username: { type: String, required: true, trim: true },
    studentId: { type: String, required: true, ref: "User" },
    amount: { type: Number, required: true },
    status: {
      type: String,
      enum: ["completed", "failed"],
      default: "completed",
    },
    createdAt: { type: Date, default: Date.now },
    description: { type: String },
  },
  { timestamps: true }
);

const Transaction = mongoose.model("Transaction", transactionSchema);

export default Transaction;
