import { generateOTP, verifyOTP } from "../otp/otp.service.js";
import { sendOTPEmail } from "../email/email.api.client.js";

export const genOTP = async (req, res) => {
  try {
    const { email, transactionId } = req.body;
    if (!email) return res.status(400).json({ error: "Email required" });

    const otp = await generateOTP({ email, transactionId });

    // Gửi OTP qua email service
    try {
      await sendOTPEmail(email, otp);
      console.log(`✅ OTP đã được gửi đến ${email}`);
    } catch (emailError) {
      console.error(`⚠️  OTP generated but failed to send email: ${emailError.message}`);
      // Vẫn trả về OTP ngay cả khi gửi email thất bại (cho development)
      return res.json({ 
        message: "OTP đã được tạo", 
        otp: otp, // Chỉ trả về trong development, production nên xóa
        warning: "Email sending failed"
      });
    }

    res.json({ message: "OTP đã được gửi qua email" });
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
