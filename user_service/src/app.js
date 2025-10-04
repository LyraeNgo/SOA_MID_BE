import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import userRoutes from "./routes/user.routes.js";
import authRoutes from "./routes/auth.routes.js";
import emailRoutes from "./routes/email.routes.js";
import otpRoutes from "./routes/otp.routes.js";
import swaggerUi from "swagger-ui-express";
import cors from "cors";
import { swaggerSpec } from "./swagger.js";

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
// email routes
app.use("/api/email", emailRoutes);

app.use("/api/otp", otpRoutes);

// Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export default app;
