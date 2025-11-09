import express from "express";
import {
  getTransactionsByStudentIdController,
  getPendingTransactionByIdController,
  updateStatusByIdController,
} from "./transaction.controller.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Transactions
 *   description: API quản lý giao dịch học phí
 */

/**
 * @swagger
 * /student/{studentId}:
 *   get:
 *     summary: Lấy danh sách giao dịch theo studentId
 *     tags: [Transactions]
 *     parameters:
 *       - in: path
 *         name: studentId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID của sinh viên
 *     responses:
 *       200:
 *         description: Danh sách giao dịch của sinh viên
 *       404:
 *         description: Không tìm thấy sinh viên
 */
router.get("/student/:studentId", getTransactionsByStudentIdController);

/**
 * @swagger
 * /pending/{transactionId}:
 *   get:
 *     summary: Lấy giao dịch đang chờ xử lý
 *     tags: [Transactions]
 *     parameters:
 *       - in: path
 *         name: transactionId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID của transaction
 *     responses:
 *       200:
 *         description: Giao dịch pending
 *       404:
 *         description: Không tìm thấy giao dịch
 */
router.get("/pending/:transactionId", getPendingTransactionByIdController);

/**
 * @swagger
 * /update-status/{transactionId}:
 *   put:
 *     summary: Cập nhật trạng thái giao dịch
 *     tags: [Transactions]
 *     parameters:
 *       - in: path
 *         name: transactionId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 example: "success"
 *     responses:
 *       200:
 *         description: Cập nhật trạng thái thành công
 *       400:
 *         description: Dữ liệu không hợp lệ
 *       404:
 *         description: Không tìm thấy giao dịch
 */
router.put("/update-status/:transactionId", updateStatusByIdController);

export default router;
