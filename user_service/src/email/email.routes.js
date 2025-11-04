import express from "express";
import { sendOTP, resendOTP, sendGenericEmail } from "./email.controller.js"

const router = express.Router();

/**
 * @openapi
 * /email/send-otp:
 *   post:
 *     summary: Gửi email OTP
 *     tags:
 *       - Email
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
 *               otp:
 *                 type: string
 *                 example: "123456"
 *             required:
 *               - email
 *               - otp
 *     responses:
 *       '200':
 *         description: Email gửi thành công
 *       '400':
 *         description: Dữ liệu không hợp lệ
 *       '500':
 *         description: Lỗi server khi gửi email
 */
router.post("/send-otp", sendOTP);

/**
 * @openapi
 * /email/resend-otp:
 *   post:
 *     summary: Gửi lại email OTP
 *     tags:
 *       - Email
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
 *               otp:
 *                 type: string
 *                 example: "123456"
 *             required:
 *               - email
 *               - otp
 *     responses:
 *       '200':
 *         description: Email gửi lại thành công
 *       '400':
 *         description: Dữ liệu không hợp lệ
 *       '500':
 *         description: Lỗi server khi gửi email
 */
router.post("/resend-otp", resendOTP);

/**
 * @openapi
 * /email/send:
 *   post:
 *     summary: Gửi email generic (tùy chỉnh)
 *     tags:
 *       - Email
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               to:
 *                 type: string
 *                 format: email
 *                 example: user@example.com
 *               subject:
 *                 type: string
 *                 example: "Xác nhận tài khoản"
 *               html:
 *                 type: string
 *                 example: "<h1>Xác nhận</h1><p>Nội dung email...</p>"
 *               text:
 *                 type: string
 *                 example: "Xác nhận - Nội dung email..."
 *             required:
 *               - to
 *               - subject
 *     responses:
 *       '200':
 *         description: Email gửi thành công
 *       '400':
 *         description: Dữ liệu không hợp lệ
 *       '500':
 *         description: Lỗi server khi gửi email
 */
router.post("/send", sendGenericEmail);

export default router;

