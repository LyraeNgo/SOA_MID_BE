import express from "express";
import { login, register } from "../controllers/auth.controller.js";

// =======START ROUTER =======
const router = express.Router();

// ====ROUTER=====
router.post("/login", login);
router.post("/register", register);

export default router;
