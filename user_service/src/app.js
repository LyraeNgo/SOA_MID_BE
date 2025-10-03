import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import userRoutes from "./routes/user.routes.js";
import authRoutes from "./routes/auth.routes.js";
import cors from "cors";
dotenv.config();
connectDB();

const app = express();
app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173", // FE URL
    credentials: true, // Allow credentials
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

export default app;
//Test Email
import { sendOTPEmail, resendOTPEmail } from './email_service/email.service.js';

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