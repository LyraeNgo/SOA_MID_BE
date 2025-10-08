import { getAllTransactionsService } from "../services/transaction.service.js";

export const getAllTransactions = async (req, res) => {
  try {
    // Lấy params từ FE
    const {
      page = 1,
      limit = 10,
      searchTerm,
      status,
      startDate,
      endDate,
    } = req.query;

    // Gọi service, truyền params vào
    const result = await getAllTransactionsService({
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
    res.status(500).json({ message: "Lỗi hệ thống" });
  }
};
