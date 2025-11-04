import express from "express";
import { getAllTransactions } from "./transaction.controller.js"
import { verifyToken } from "../auth/authJWT.middleware.js";

const router = express.Router();

// Chặn truy cập không có token
router.get("/", verifyToken, getAllTransactions);

export default router;
