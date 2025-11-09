import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    paymentId: { type: String, required: true },
    studentId: { type: String, required: true },
    userId: { type: String, required: true },
    billId: { type: String, required: true },
    amount: { type: Number, required: true },
    status: {
      type: String,
      enum: ["SUCCESS", "FAILED", "PENDING", "ONPROGRESS"],
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Payment", paymentSchema);
