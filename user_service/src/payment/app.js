import router from "./payment.routes.js";
import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import connectDB from "./db_connect.js";
import swaggerSpec from "./swagger.js";
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

app.use("/api/payment", router);
// Swagger docs riêng cho service
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// JSON cho gateway gom
app.get("/api/payment/docs-json", (req, res) => res.json(swaggerSpec));
export default app;
