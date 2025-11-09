import { requestCharge, verifyAndCharge } from "./payment.service.js";

export const requestChargeController = async (req, res) => {
  try {
    const { userId, studentId, transactionId, email } = req.body;

    if (!userId || !studentId || !transactionId || !email) {
      return res.status(400).json({
        error: "Missing required fields",
      });
    }

    const result = await requestCharge({
      userId,
      studentId,
      transactionId,
      email,
    });

    if (result.error) {
      return res.status(400).json(result);
    }

    return res.json(result);
  } catch (error) {
    console.error("requestChargeController error:", error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const verifyAndChargeController = async (req, res) => {
  try {
    const { userId, studentId, transactionId, email, otp } = req.body;

    if (!userId || !studentId || !transactionId || !email || !otp) {
      return res.status(400).json({
        error: "Missing required fields",
      });
    }

    const result = await verifyAndCharge({
      userId,
      studentId,
      transactionId,
      email,
      otp,
    });

    if (result.error) {
      return res.status(400).json(result);
    }

    return res.json(result);
  } catch (error) {
    console.error("verifyAndChargeController error:", error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
};
