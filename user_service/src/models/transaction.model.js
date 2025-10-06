import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
    username: { type: String, required: true, trim: true },
    studentId: { type: String, required: true },
    amount: { type: Number, required: true },
    status: { type: String, enum: ["completed", "failed"], default: "completed" },
    createdAt: { type: Date, default: Date.now },
    balanceBefore: { type: Number, required: true },
    balanceAfter: { type: Number, required: true },
    description: { type: String },
}, { timestamps: true });

const Transaction = mongoose.model("Transaction", transactionSchema);


export default Transaction;
