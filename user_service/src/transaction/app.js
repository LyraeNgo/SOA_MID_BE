import router from "./transaction.routes.js";
import dotenv from "dotenv";
import express from "express";
import cors from "cors"
import connectDB from "./db_connect.js";
dotenv.config();
connectDB();

const app = express();
app.use(express.json());

// ===== Cấu hình CORS =====
app.use(
  cors({
    origin: "*", // cho phép mọi domain, hoặc thay bằng danh sách domain cụ thể
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // các phương thức được phép
    allowedHeaders: ["Content-Type", "Authorization"], // các header được phép
  })
);

app.use("/api/transaction", router);

export default app;
