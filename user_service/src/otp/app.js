import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./swagger.js";
import otpRoutes from "./otp.routes.js";

dotenv.config();

const app = express();

// Middlewares
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));
app.use(express.json());

// Routes
app.use("/api/otp", otpRoutes);

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "ok", service: "otp-service" });
});

// Swagger docs
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// JSON cho gateway gom
app.get("/api/otp/docs-json", (req, res) => res.json(swaggerSpec));

export default app;
