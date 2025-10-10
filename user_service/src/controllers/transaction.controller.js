import { getAllTransactionsService } from "../services/transaction.service.js";

export const getAllTransactions = async (req, res) => {
  try {
    // Lấy userId từ middleware verifyToken
    const userId = req.userId;
    if (!userId) {
      return res
        .status(401)
        .json({ message: "Không xác định được người dùng" });
    }

    // Lấy params từ query
    const {
      page = 1,
      limit = 10,
      searchTerm,
      status,
      startDate,
      endDate,
    } = req.query;

    // Gọi service, truyền userId + các params
    const result = await getAllTransactionsService({
      userId,
      page: parseInt(page),
      limit: parseInt(limit),
      searchTerm,
      status,
      startDate,
      endDate,
    });

    // Trả kết quả về FE
    res.status(200).json(result);
  } catch (err) {
    console.error("❌ Lỗi getAllTransactions:", err);
    res.status(500).json({ message: "Lỗi hệ thống", error: err.message });
  }
};
