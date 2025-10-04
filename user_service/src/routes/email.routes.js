import express from "express";
import { emailGenerate } from "../controllers/email.controller.js";

const router = express.Router();

/**
 * @openapi
 * /email/generate:
 *   post:
 *     summary: Gửi email (ví dụ gửi link kích hoạt, xác nhận, thông báo)
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
 *               message:
 *                 type: string
 *                 example: "Cảm ơn bạn đã đăng ký. Đây là link kích hoạt..."
 *             required:
 *               - to
 *               - subject
 *               - message
 *     responses:
 *       '200':
 *         description: Email gửi thành công
 *       '400':
 *         description: Dữ liệu không hợp lệ
 *       '500':
 *         description: Lỗi server khi gửi email
 */
router.post("/generate", emailGenerate);

export default router;
