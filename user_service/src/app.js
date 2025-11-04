
import connectDB from "./user/db.js";
import userRoutes from "./user/user.routes.js";
import authRoutes from "./auth/auth.routes.js"
import otpRoutes from "./otp/otp.routes.js";
import transactionRoutes from "./transaction/transaction.routes.js";
// --- swagger ---
import swaggerUi from "swagger-ui-express";
import cors from "cors";
import { swaggerSpec } from "./swagger.js";
import express from "express";
import dotenv from "dotenv";
dotenv.config();
connectDB();

const app = express();
app.use(express.json());

app.use(
  cors({
    origin: ["http://localhost:5173"], // FE URL
    credentials: true, // Allow credentials
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Routes
// user routes
app.use("/api/users", userRoutes);
// auth routes
app.use("/api/auth", authRoutes);
// otp routes
app.use("/api/otp", otpRoutes);
// transaction routes
app.use("/api/transactions", transactionRoutes);

// Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "ok", service: "user-service" });
});

export default app;
