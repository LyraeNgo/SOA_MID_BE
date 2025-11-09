// payment/models/Payment.js
import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
  transactionId: { type: String, required: true },
  userId: { type: String, required: true },
  studentId: { type: String, required: true },
  amount: { type: Number, required: true },
  status: { type: String, enum: ["completed", "failed"], required: true },
  note: { type: String },
  createdAt: { type: Date, default: Date.now },
});

const Payment = mongoose.model("Payment", paymentSchema);

export default Payment;
