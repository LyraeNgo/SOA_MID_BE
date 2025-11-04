import Transaction from "./transaction.model.js";
import mongoose from "mongoose";

export const getAllTransactionsService = async ({
  userId,
  page = 1,
  limit = 10,
  searchTerm,
  status,
  startDate,
  endDate,
}) => {
  const query = {};

  if (userId) {
    query.userId = new mongoose.Types.ObjectId(userId);
  }

  // Search theo transactionCode hoặc studentId
  if (searchTerm) {
    query.$or = [
      { transactionCode: { $regex: searchTerm, $options: "i" } },
      { studentId: { $regex: searchTerm, $options: "i" } },
    ];
  }

  // Filter theo status
  if (status) {
    query.status = status;
  }

  // Filter theo ngày tạo
  if (startDate || endDate) {
    query.createdAt = {};
    if (startDate) {
      query.createdAt.$gte = new Date(startDate);
    }
    if (endDate) {
      const end = new Date(endDate);
      end.setHours(23, 59, 59, 999);
      query.createdAt.$lte = end;
    }
  }

  const skip = (page - 1) * limit;

  const [transactions, total] = await Promise.all([
    Transaction.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit),
    Transaction.countDocuments(query),
  ]);

  return {
    transactions,
    totalPages: Math.ceil(total / limit),
    currentPage: page,
  };
};
