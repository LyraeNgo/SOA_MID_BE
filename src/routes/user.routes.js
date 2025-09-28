import express from "express";
import {
  GetUsers,
  GetUsersByEmail,
  GetUsersById,
  PostUser,
} from "../controllers/user.controller.js";

// =======START ROUTER =======
const router = express.Router();

// ====ROUTER=====
router.post("/createUser", PostUser);
router.get("/", GetUsers);
router.get("/:id", GetUsersById);
router.get("/find/:email", GetUsersByEmail);

export default router;
