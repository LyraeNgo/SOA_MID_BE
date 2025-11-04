import express from "express";
import {
  getTransactionsByStudentId,
  getPendingTransactionById,
} from "./transaction.controller.js";
const router = express.Router();

router.get("/:studentID", getTransactionsByStudentId);

router.get("/pending/:studentID", getPendingTransactionById);

export default router;
