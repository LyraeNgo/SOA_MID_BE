import express from "express";
import { getAllTransactions } from "../controllers/transaction.controller.js";
import { verifyToken } from "../middlewares/authJWT.middleware.js";

const router = express.Router();

// Chặn truy cập không có token
router.get("/", verifyToken, getAllTransactions);

export default router;
