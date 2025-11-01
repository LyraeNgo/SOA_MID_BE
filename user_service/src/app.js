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
import { sendOTPEmail, resendOTPEmail } from './email_service/email.service.js';

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

//Test Email
// Test endpoint
app.post('/api/test-email', async (req, res) => {
  try {
    const { email, otp, action = 'send' } = req.body;
    
    let result;
    if (action === 'resend') {
      result = await resendOTPEmail(email, otp);
    } else {
      result = await sendOTPEmail(email, otp);
    }
    
    res.json({ 
      success: true, 
      message: 'Email sent successfully',
      data: result
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

export default app;
