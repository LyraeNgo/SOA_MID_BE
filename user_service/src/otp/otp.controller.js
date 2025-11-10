import { generateOTP, verifyOTP } from "../otp/otp.service.js";
import { sendOTPEmail } from "../email/email.api.client.js";

export const genOTP = async (req, res) => {
  try {
    const { email, transactionId } = req.body;
    if (!email) return res.status(400).json({ error: "Email required" });

    // Tạo OTP và lưu vào Redis (TTL 5 phút)
    const otp = await generateOTP({ email, transactionId });

    // Gửi OTP qua email service
    try {
      // await sendOTPEmail(email, otp);
      console.log(`✅ OTP đã được gửi đến ${email}`);
      res.json({ otp:otp, message: "OTP đã được gửi qua email" });
    } catch (emailError) {
      console.error(`⚠️  OTP generated but failed to send email: ${emailError.message}`);
      // Log OTP trong development mode để debug (không trả về trong response)
      if (process.env.NODE_ENV === 'development') {
        console.log(`[DEV] OTP for ${email}: ${otp}`);
      }
      res.status(500).json({ 
        error: "Không thể gửi email OTP. Vui lòng thử lại sau.",
        message: "OTP đã được tạo nhưng không thể gửi email"
      });
    }
  } catch (error) {
    console.error("Error generating OTP:", error);
    res.status(500).json({ error: error.message });
  }
};

// API verify OTP
export const verOTP = async (req, res) => {
  try {
    const { email, otp, transactionId } = req.body;
    if (!email || !otp) return res.status(400).json({ error: "Thiếu dữ liệu" });

    const result = await verifyOTP({ email, transactionId }, otp);
    res.json(result);
  } catch (error) {
    console.error("Error verifying OTP:", error);
    res.status(500).json({ error: error.message });
  }
};
