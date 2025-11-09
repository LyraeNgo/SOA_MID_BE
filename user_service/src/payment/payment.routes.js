import express from "express";
import { postCharge } from "./payment.controller.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Payments
 *   description: API cho thanh toán
 */

/**
 * @swagger
 * /charge:
 *   post:
 *     summary: Thanh toán học phí
 *     tags: [Payments]
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
 *             properties:
 *               userId:
 *                 type: string
 *                 example: "690b4b56264acf1e51350624"
 *               studentId:
 *                 type: string
 *                 example: "523h0001"
 *               transactionId:
 *                 type: string
 *                 example: "691029ea1f4bad2f37d64a86"
 *     responses:
 *       200:
 *         description: Thanh toán thành công
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
 *                   example: "Thanh toán thành công"
 *       400:
 *         description: Lỗi request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Transaction không tồn tại"
 */
router.post("/charge", postCharge);

export default router;
