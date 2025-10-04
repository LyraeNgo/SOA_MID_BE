import { genOTP, verOTP } from "../controllers/otp.controller.js";
import express from "express";

const router = express.Router();

/**
 * @openapi
 * /otp/generate:
 *   post:
 *     summary: Sinh OTP mới và gửi qua email/SMS
 *     tags:
 *       - OTP
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: user@example.com
 *             required:
 *               - email
 *     responses:
 *       '200':
 *         description: OTP đã được tạo và gửi đi
 *       '400':
 *         description: Email không hợp lệ
 */
router.post("/generate", genOTP);

/**
 * @openapi
 * /otp/verify:
 *   post:
 *     summary: Xác thực OTP
 *     tags:
 *       - OTP
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               otp:
 *                 type: string
 *                 example: "123456"
 *             required:
 *               - email
 *               - otp
 *     responses:
 *       '200':
 *         description: OTP hợp lệ
 *       '400':
 *         description: OTP sai hoặc hết hạn
 */
router.post("/verify", verOTP);

export default router;
