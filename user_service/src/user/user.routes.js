import express from "express";
import {
  GetUsers,
  GetUsersByEmail,
  GetUsersById,
  PostUser,
  GetMe,
  Validator,
  getBalanceById,
  UpdateBalanceById,
} from "./user.controller.js";
import { authMiddleware } from "./users.middleware.js";

const router = express.Router();

/**
 * @openapi
 * /me:
 *   get:
 *     summary: Lấy thông tin user hiện tại (dựa trên JWT)
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Thông tin user hiện tại
 *       '401':
 *         description: Token không hợp lệ hoặc thiếu
 */
router.get("/me", authMiddleware, GetMe);

/**
 * @openapi
 * /createUser:
 *   post:
 *     summary: Tạo mới một user
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               phoneNumber:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       '201':
 *         description: User được tạo thành công
 *       '400':
 *         description: Dữ liệu không hợp lệ
 */
router.post("/createUser", PostUser);

/**
 * @openapi
 * /find/{email}:
 *   get:
 *     summary: Tìm user theo email
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: email
 *         schema:
 *           type: string
 *         required: true
 *         description: Email của user
 *     responses:
 *       '200':
 *         description: Thông tin user
 *       '404':
 *         description: Không tìm thấy user
 */
router.get("/find/:email", GetUsersByEmail);

/**
 * @openapi
 * /findUser/{id}:
 *   get:
 *     summary: Lấy thông tin user theo ID
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID của user
 *     responses:
 *       '200':
 *         description: Thông tin user
 *       '404':
 *         description: Không tìm thấy user
 */
router.get("/findUser/:id", GetUsersById);

/**
 * @openapi
 * /:
 *   get:
 *     summary: Lấy danh sách tất cả user
 *     tags:
 *       - Users
 *     responses:
 *       '200':
 *         description: Danh sách user
 */
router.get("/", GetUsers);

/**
 * @openapi
 * /validate:
 *   post:
 *     summary: Xác thực thông tin user (email, password)
 *     tags:
 *       - Users
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
 *               password:
 *                 type: string
 *     responses:
 *       '200':
 *         description: User hợp lệ
 *       '400':
 *         description: Dữ liệu không hợp lệ
 */
router.post("/validate", Validator);

/**
 * @openapi
 * /get-balance/{id}:
 *   get:
 *     summary: Lấy số dư của user theo ID
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID của user
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Thành công, trả về số dư
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 balance:
 *                   type: number
 *       '404':
 *         description: User không tìm thấy
 *       '400':
 *         description: ID không hợp lệ
 */
router.get("/get-balance/:id", getBalanceById);

/**
 * @openapi
 * /update-balance:
 *   put:
 *     summary: Cập nhật số dư của user
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - amount
 *             properties:
 *               userId:
 *                 type: string
 *                 description: ID của user cần cập nhật
 *               amount:
 *                 type: number
 *                 description: Số tiền cần cập nhật (có thể âm hoặc dương)
 *     responses:
 *       '200':
 *         description: Cập nhật thành công, trả về số dư mới
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 balance:
 *                   type: number
 *       '400':
 *         description: Dữ liệu không hợp lệ
 */
router.put("/update-balance", UpdateBalanceById);
export default router;
