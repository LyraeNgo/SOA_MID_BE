import { sendOTPEmail, resendOTPEmail } from "../services/email.service.js";
import { generateOTP } from "../services/otp.service.js";
export const emailGenerate = async (req, res) => {
  try {
    const { email, action = "send" } = req.body;
    const otp = generateOTP({ email, transactionId: 1234 });
    let result;
    if (action === "resend") {
      result = await resendOTPEmail(email, otp);
    } else {
      result = await sendOTPEmail(email, otp);
    }

    res.json({
      success: true,
      message: "Email sent successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
