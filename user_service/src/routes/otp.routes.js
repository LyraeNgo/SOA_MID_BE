import { genOTP, verOTP } from "../controllers/otp.controller.js";
import express from "express";

const router = express.Router();

router.post("/generate", genOTP);
router.post("/verify", verOTP);

export default router;
