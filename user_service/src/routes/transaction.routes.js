import express from "express";
import { getAllTransactions } from "../controllers/transaction.controller.js";

const router = express.Router();

// Lấy tất cả giao dịch
router.get("/", getAllTransactions);

// Tạo giao dịch mới (đóng học phí)

export default router;
