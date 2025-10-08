import Transaction from "../models/transaction.model.js";

/**
 * Lấy tất cả giao dịch, sắp xếp theo createdAt giảm dần
 */
export const getAllTransactions = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    const skip = (page - 1) * limit;

    const total = await Transaction.countDocuments();
    const transactions = await Transaction.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
    res
      .status(200)
      .json({ transactions, totalPages: Math.ceil(total / limit) });
  } catch (err) {
    console.error("Lỗi khi gọi getAllTransactions:", err);
    res.status(500).json({ message: "Lỗi hệ thống" });
  }
};
