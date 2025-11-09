import axios from "axios";

export const charge = async ({userId, studentId, transactionId}) => {
  // 1. Get pending transaction
  const tRes = await axios.get(
    `http://localhost:5004/api/transaction/pending/${studentId}`
  );

  const transaction = tRes.data;

  if (!transaction) return { error: "Transaction not found" };

  if (transaction.status === "processing") {
    return { error: "This transaction is being processed by others" };
  }

  if (transaction.status !== "pending") {
    return { error: "Transaction already completed" };
  }

  // 2. Lock transaction: set to PROCESSING
  await axios.put(
    `http://localhost:5004/api/transaction/update-status/${transactionId}`,
    { status: "processing" }
  );

  // 3. Get user balance
  const bRes = await axios.get(
    `http://localhost:5005/api/users/get-balance/${userId}`
  );

  const balance = bRes.data.balance;

  if (balance < transaction.amount) {
    await axios.put(
      `http://localhost:5004/api/transaction/update-status/${transactionId}`,
      { status: "failed" }
    );

    return { error: "Insufficient balance" };
  }
  // TODO VERIFY OTP

  // 4. Deduct balance
  await axios.put(`http://localhost:5005/api/users/update-balance`, {
    userId,
    amount: -transaction.amount,
  });

  // 5. Mark success
  await axios.put(
    `http://localhost:5004/api/transaction/update-status/${transactionId}`,
    { status: "completed" }
  );

  return { success: true };
};
