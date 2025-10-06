import express from "express";
import {
    createTransaction,
    getAllTransactions,
    updateTransactionStatus,
} from "../controllers/transaction.controller.js";

const router = express.Router();

// Lấy tất cả giao dịch
router.get("/", getAllTransactions);

// Tạo giao dịch mới (đóng học phí)
router.post("/transactions/pay-tuition", createTransaction);

// Cập nhật trạng thái giao dịch
router.patch(
    "/transactions/:txnRef/status",
    updateTransactionStatus
);

export default router;
