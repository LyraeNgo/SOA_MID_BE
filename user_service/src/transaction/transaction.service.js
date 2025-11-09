import Transaction from "./transaction.model.js";
import mongoose from "mongoose";
/**
 * Get all transactions for a student
 */
export const getTransactionsByStudentId = async (studentId) => {
  try {
    return await Transaction.find({ studentId: studentId.trim() });
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch transactions");
  }
};

/**
 * Get one pending transaction by transactionId
 * Used by Payment Service
 */
export const getPendingTransactionById = async (transactionId) => {
  if (!mongoose.Types.ObjectId.isValid(transactionId)) {
    throw new Error("transactionId không hợp lệ");
  }

  const transaction = await Transaction.findOne({
    _id: transactionId,
    status:"pending"
  });
  console.log(transaction);

  if (!transaction) {
    throw new Error("Transaction không tồn tại hoặc không pending");
  }

  return transaction;
};

/**
 * Update a transaction's status
 */
export const updateStatusById = async (transactionId, status) => {
  try {
    return await Transaction.findByIdAndUpdate(
      transactionId.trim(),
      { status },
      { new: true }
    );
  } catch (error) {
    console.error(error);
    throw new Error("Failed to update status");
  }
};

/**
 * Get a single transaction by its ID
 * Optional but useful for debugging
 */
export const getTransactionById = async (transactionId) => {
  try {
    return await Transaction.findById(transactionId.trim());
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch transaction");
  }
};
