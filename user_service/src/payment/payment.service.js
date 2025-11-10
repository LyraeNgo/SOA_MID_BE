import axios from "axios";
import Payment from "./payment.model.js";
/**
 * STEP 1: REQUEST CHARGE (send OTP)
 * - Validate transaction & balance
 * - Generate OTP
 * - Send OTP email
 */
export const requestCharge = async ({
  userId,
  studentId,
  transactionId,
  email,
}) => {
  try {
    console.log("STEP 1: Fetch transaction...");
    const tRes = await axios.get(
      `http://localhost:5004/api/transaction/pending/${studentId}`
    );
    console.log("Transaction response:", tRes.data);

    const transaction = tRes.data;

    if (!transaction) {
      return { error: "Transaction not found" };
    }

    if (transaction.status !== "pending") {
      return { error: "Transaction is not pending" };
    }

    console.log("STEP 2: Fetch balance...");
    const bRes = await axios.get(
      `http://localhost:5005/api/users/get-balance/${userId}`
    );
    console.log("Balance:", bRes.data);

    if (bRes.data.balance < transaction.amount) {
      return { error: "Insufficient balance" };
    }

    console.log("STEP 3: Generate OTP...");
    const otpRes = await axios.post(`http://localhost:5003/api/otp/generate`, {
      email,
      transactionId,
    });
    console.log("OTP generated:", otpRes.data);

    console.log("STEP 4: Send email...");
    const emailRes = await axios.post(
      `http://localhost:5002/api/email/send-otp`,
      { email: email, otp: otpRes.data.otp }
    );
    console.log("Email status:", emailRes.data);

    return {
      success: true,
      message: "OTP sent to email",
      transactionId,
    };
  } catch (err) {
    console.error(
      "🔥 ERROR IN requestCharge:",
      err.response?.data || err.message
    );
    return { error: "Failed to initiate charge" };
  }
};

/**
 * STEP 2: VERIFY & CHARGE
 * - Verify OTP
 * - Lock transaction
 * - Check balance again
 * - Deduct money
 * - Mark transaction completed
 */
export const verifyAndCharge = async ({
  userId,
  studentId,
  transactionId,
  email,
  otp,
}) => {
  try {
    // 1. Verify OTP
    const verifyRes = await axios.post(`http://localhost:5003/api/otp/verify`, {
      email,
      transactionId,
      otp,
    });

    // if (!verifyRes.data.success) {
    //   return { error: verifyRes.data.message };
    // }

    //2. Lock transaction (processing)
    await axios.put(
      `http://localhost:5004/api/transaction/update-status/${transactionId}`,
      { status: "processing" }
    );

    // 3. Get updated transaction
    const tRes = await axios.get(
      `http://localhost:5004/api/transaction/pending/${studentId}`
    );
    const transaction = tRes.data;

    // 4. Check balance again
    const bRes = await axios.get(
      `http://localhost:5005/api/users/get-balance/${userId}`
    );
    const balance = bRes.data.balance;

    if (balance < transaction.amount) {
      await axios.put(
        `http://localhost:5004/api/transaction/update-status/${transactionId}`,
        { status: "pending" }
      );
      return { error: "Insufficient balance" };
    }

    // 5. Deduct balance
    await axios.put(`http://localhost:5005/api/users/update-balance`, {
      userId,
      amount: -transaction.amount,
    });

    // 6. Mark completed
    await axios.put(
      `http://localhost:5004/api/transaction/update-status/${transactionId}`,
      { status: "completed" }
    );

    // TODO SAVE TO PAYMENT DB

    const payment = new Payment({
      transactionId,
      userId,
      studentId,
      amount: transaction.amount,
      status: "completed",
      note: "Payment successful",
    });
    await payment.save();

    return { success: true, message: "Payment successful" };
  } catch (err) {
    console.error("verifyAndCharge error:", err.message);

    // Nếu lỗi thì unlock transaction
    await axios.put(
      `http://localhost:5004/api/transaction/update-status/${transactionId}`,
      { status: "pending" }
    );
    //TODO ghi record thất bại
    try {
      const payment = new Payment({
        transactionId,
        userId,
        studentId,
        amount: 0,
        status: "failed",
        note: err.message,
      });
      await payment.save();
    } catch (e) {
      console.error("Failed to record failed payment:", e.message);
    }
    return { error: "Payment failed" };
  }
};
