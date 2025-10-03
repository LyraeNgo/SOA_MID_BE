import { generateOTP, verifyOTP } from "../services/otp.service.js";

export const genOTP = async (req, res) => {
  const { email, transactionId } = req.body;
  if (!email) return res.status(400).json({ error: "Email required" });

  const otp = await generateOTP(email, transactionId);

  // ở đây bạn có thể gửi OTP qua email/SMS
  console.log(`OTP cho ${email}: ${otp}`);

  res.json({ message: "OTP đã được gửi" });
};

// API verify OTP
export const verOTP = async (req, res) => {
  const { email, otp } = req.body;
  if (!email || !otp) return res.status(400).json({ error: "Thiếu dữ liệu" });

  const result = await verifyOTP(email, otp);
  res.json(result);
};
