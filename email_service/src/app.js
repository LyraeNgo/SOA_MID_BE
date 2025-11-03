import express from "express";
import dotenv from "dotenv";
import emailRoutes from "./routes/email.routes.js";
import swaggerUi from "swagger-ui-express";
import cors from "cors";
import { swaggerSpec } from "./swagger.js";

dotenv.config();

const app = express();
app.use(express.json());

app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5000"], // FE URL và User Service
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Routes
app.use("/api/email", emailRoutes);

// Test endpoint
app.post("/api/test-email", async (req, res) => {
  try {
    const { sendOTPEmail, resendOTPEmail } = await import("./services/email.service.js");
    const { email, otp, action = "send" } = req.body;
    
    let result;
    if (action === "resend") {
      result = await resendOTPEmail(email, otp);
    } else {
      result = await sendOTPEmail(email, otp);
    }
    
    res.json({ 
      success: true, 
      message: "Email sent successfully",
      data: result
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "ok", service: "email-service" });
});

// Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export default app;

