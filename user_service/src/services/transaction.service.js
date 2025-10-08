import Transaction from "../models/transaction.model.js";
import mongoose from "mongoose";

export const getAllTransactionsService = async ({
  page = 1,
  limit = 10,
  searchTerm,
  status,
  startDate,
  endDate,
}) => {
  const query = {};

  // Search theo _id hoặc username
  if (searchTerm) {
    // Nếu searchTerm có thể là ObjectId hợp lệ thì tìm trực tiếp
    if (mongoose.Types.ObjectId.isValid(searchTerm)) {
      query._id = searchTerm;
    } else {
      // Nếu không thì chỉ tìm theo username
      query.username = { $regex: searchTerm, $options: "i" };
    }
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
