import nodemailer from "nodemailer";

const createTransporter = () => {
  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
};

export const validateEmailAddress = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const sendOTPEmail = async (email, otp) => {
  try {
    // Validate email
    if (!validateEmailAddress(email)) {
      throw new Error("Invalid email address format");
    }

    const transporter = createTransporter();

    // Test connection
    await transporter.verify();
    console.log("✅ SMTP connection verified");

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Mã OTP xác thực giao dịch",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">Xác thực giao dịch</h2>
          <p>Mã OTP của bạn là:</p>
          <div style="background-color: #f0f0f0; padding: 20px; text-align: center; font-size: 24px; font-weight: bold; letter-spacing: 5px; color: #007bff;">
            ${otp}
          </div>
          <p style="color: #666;">Mã này có hiệu lực trong 5 phút.</p>
          <p style="color: #666;">Không chia sẻ mã này với bất kỳ ai.</p>
        </div>
      `,
    };

    const result = await transporter.sendMail(mailOptions);

    // Log success status
    const emailStatus = {
      messageId: result.messageId,
      email: email,
      status: "sent",
      timestamp: new Date(),
    };

    console.log("✅ OTP sent successfully:", emailStatus);
    return emailStatus;
  } catch (error) {
    // Handle email failure
    console.error(`❌ Failed to send OTP to ${email}:`, error.message);

    // Log failed status
    const emailStatus = {
      email: email,
      status: "failed",
      error: error.message,
      timestamp: new Date(),
    };

    console.log("Email Status:", emailStatus);

    // Phân loại lỗi
    if (error.code === "EAUTH") {
      throw new Error("Email authentication failed");
    } else if (error.code === "ENOTFOUND") {
      throw new Error("Email server not found");
    } else if (error.responseCode === 550) {
      throw new Error("Invalid email address");
    }

    throw new Error("Failed to send email");
  }
};

export const resendOTPEmail = async (email, newOtp) => {
  try {
    console.log(`Resending OTP to ${email}`);
    return await sendOTPEmail(email, newOtp);
  } catch (error) {
    console.error("Failed to resend OTP:", error);
    throw error;
  }
};
