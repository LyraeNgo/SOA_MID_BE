import express from "express";
import {
  requestChargeController,
  verifyAndChargeController,
} from "./payment.controller.js";

const router = express.Router();

/**
 * @swagger
 * /request-charge:
 *   post:
 *     summary: Gửi yêu cầu thanh toán và gửi OTP qua email
 *     description: Kiểm tra giao dịch, kiểm tra số dư và gửi OTP xác nhận thanh toán.
 *     tags:
 *       - Payment
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - studentId
 *               - transactionId
 *               - email
 *             properties:
 *               userId:
 *                 type: string
 *                 example: "USER123"
 *               studentId:
 *                 type: string
 *                 example: "STU001"
 *               transactionId:
 *                 type: string
 *                 example: "TXN90001"
 *               email:
 *                 type: string
 *                 example: "user@example.com"
 *     responses:
 *       200:
 *         description: OTP đã được gửi thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "OTP sent to email"
 *                 transactionId:
 *                   type: string
 *                   example: "TXN90001"
 *       400:
 *         description: Lỗi input hoặc lỗi logic
 *       500:
 *         description: Lỗi server
 */
router.post("/request-charge", requestChargeController);

/**
 * @swagger
 * /verify-charge:
 *   post:
 *     summary: Xác thực OTP và hoàn tất giao dịch thanh toán
 *     description: Kiểm tra OTP, khóa giao dịch, trừ tiền và cập nhật trạng thái.
 *     tags:
 *       - Payment
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - studentId
 *               - transactionId
 *               - email
 *               - otp
 *             properties:
 *               userId:
 *                 type: string
 *                 example: "USER123"
 *               studentId:
 *                 type: string
 *                 example: "STU001"
 *               transactionId:
 *                 type: string
 *                 example: "TXN90001"
 *               email:
 *                 type: string
 *                 example: "user@example.com"
 *               otp:
 *                 type: string
 *                 example: "123456"
 *     responses:
 *       200:
 *         description: Thanh toán thành công hoặc thất bại do OTP
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Payment successful"
 *       400:
 *         description: Lỗi logic hoặc OTP không hợp lệ
 *       500:
 *         description: Lỗi server
 */
router.post("/verify-charge", verifyAndChargeController);

export default router;
