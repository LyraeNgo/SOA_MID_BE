import express from "express";
import {
  GetUsers,
  GetUsersByEmail,
  GetUsersById,
  PostUser,
  getMe,
} from "../controllers/user.controller.js";
import { verifyToken } from "../middlewares/authJWT.middleware.js";

const router = express.Router();

/**
 * @openapi
 * /users/me:
 *   get:
 *     summary: Lấy thông tin của user hiện tại (dựa trên JWT)
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
router.get("/me", verifyToken, getMe);

/**
 * @openapi
 * /users/createUser:
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
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
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
 * /users/find/{email}:
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
 * /users/{id}:
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
router.get("/:id", GetUsersById);

/**
 * @openapi
 * /users:
 *   get:
 *     summary: Lấy danh sách tất cả user
 *     tags:
 *       - Users
 *     responses:
 *       '200':
 *         description: Danh sách user
 */
router.get("/", GetUsers);

export default router;
