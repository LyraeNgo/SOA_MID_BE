import express from "express";
import {
  GetUsers,
  GetUsersByEmail,
  GetUsersById,
  PostUser,
  getMe,
} from "../controllers/user.controller.js";
import { verifyToken } from "../middlewares/authJWT.middleware.js";
// =======START ROUTER =======
const router = express.Router();

// ====ROUTER=====
router.get("/me", verifyToken, getMe);
router.post("/createUser", PostUser);
router.get("/find/:email", GetUsersByEmail);
router.get("/:id", GetUsersById);
router.get("/", GetUsers);

export default router;
