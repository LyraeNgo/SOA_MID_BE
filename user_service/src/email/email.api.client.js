/**
 * Email Service API Client
 * Client để gọi email_service từ các service khác
 */

const EMAIL_SERVICE_URL = process.env.EMAIL_SERVICE_URL || "http://localhost:5003";

export const sendOTPEmail = async (email, otp) => {
  try {
    const response = await fetch(`${EMAIL_SERVICE_URL}/api/email/send-otp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, otp }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Failed to send OTP email");
    }

    return data.data;
  } catch (error) {
    console.error("Error calling email service:", error.message);
    throw error;
  }
};

export const resendOTPEmail = async (email, otp) => {
  try {
    const response = await fetch(`${EMAIL_SERVICE_URL}/api/email/resend-otp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, otp }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Failed to resend OTP email");
    }

    return data.data;
  } catch (error) {
    console.error("Error calling email service:", error.message);
    throw error;
  }
};

export const sendEmail = async (to, subject, html, text) => {
  try {
    const response = await fetch(`${EMAIL_SERVICE_URL}/api/email/send`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ to, subject, html, text }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Failed to send email");
    }

    return data.data;
  } catch (error) {
    console.error("Error calling email service:", error.message);
    throw error;
  }
};
