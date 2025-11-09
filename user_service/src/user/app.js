// user_service/app.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./db.js";
import userRoutes from "./user.routes.js";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./swagger.js";

dotenv.config();

const app = express();

app.use(express.json());

// Allow all origins (for dev)
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Kết nối database riêng cho service
connectDB();

// Đăng ký routes
app.use("/api/users", userRoutes);

// Swagger docs riêng cho service
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// JSON cho gateway gom
app.get("/api/users/docs-json", (req, res) => res.json(swaggerSpec));

// Export ra để server.js dùng
export default app;
