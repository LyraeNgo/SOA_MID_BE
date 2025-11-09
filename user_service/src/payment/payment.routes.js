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
 *             properties:
 *               userId:
 *                 type: string
 *               transactionId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Thanh toán thành công
 *       400:
 *         description: Lỗi request
 */
router.post("/charge", postCharge);

export default router;
