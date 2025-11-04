import { sendOTPEmail, resendOTPEmail, sendEmail } from "./email.service.js";

export const sendOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;
    
    if (!email || !otp) {
      return res.status(400).json({
        success: false,
        error: "Email and OTP are required",
      });
    }

    const result = await sendOTPEmail(email, otp);
    
    res.json({
      success: true,
      message: "OTP email sent successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

export const resendOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;
    
    if (!email || !otp) {
      return res.status(400).json({
        success: false,
        error: "Email and OTP are required",
      });
    }

    const result = await resendOTPEmail(email, otp);
    
    res.json({
      success: true,
      message: "OTP email resent successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

export const sendGenericEmail = async (req, res) => {
  try {
    const { to, subject, html, text } = req.body;
    
    if (!to || !subject || (!html && !text)) {
      return res.status(400).json({
        success: false,
        error: "to, subject, and (html or text) are required",
      });
    }

    const result = await sendEmail(to, subject, html, text);
    
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

