import express from "express";
import { login, register } from "../controllers/auth.controller.js";

const router = express.Router();

/**
 * @openapi
 * /auth/login:
 *   post:
 *     summary: Đăng nhập vào hệ thống
 *     tags:
 *       - Auth
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
 *             required:
 *               - email
 *               - password
 *     responses:
 *       '200':
 *         description: Đăng nhập thành công, trả về JWT
 *       '400':
 *         description: Dữ liệu không hợp lệ
 *       '401':
 *         description: Sai email hoặc mật khẩu
 */
router.post("/login", login);

/**
 * @openapi
 * /auth/register:
 *   post:
 *     summary: Đăng ký tài khoản mới
 *     tags:
 *       - Auth
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
 *             required:
 *               - name
 *               - email
 *               - password
 *     responses:
 *       '201':
 *         description: Đăng ký thành công
 *       '400':
 *         description: Dữ liệu không hợp lệ hoặc email đã tồn tại
 */
router.post("/register", register);

export default router;
