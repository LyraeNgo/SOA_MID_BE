import router from "./transaction.routes.js";
import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import connectDB from "./db_connect.js";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./swagger.js";
dotenv.config();
connectDB();

const app = express();
app.use(express.json());

// ===== Cấu hình CORS =====
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use("/api/transaction", router);

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "ok", service: "transaction-service" });
});

// Swagger docs
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// JSON cho gateway gom
app.get("/api/transactions/docs-json", (req, res) => res.json(swaggerSpec));

export default app;
