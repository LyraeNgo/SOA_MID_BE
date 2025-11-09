import { charge } from "./payment.service.js";

export const postCharge = async (req, res) => {
  try {
    const { userId, studentId, transactionId } = req.body;

    if (!userId || !studentId || !transactionId) {
      return res.status(400).json({
        error: "userId or studentId or transactionId is required",
      });
    }

    const result = await charge({ userId, studentId, transactionId });

    return res.json(result);
  } catch (err) {
    console.error("Payment error:", err);
    return res.status(500).json({ error: "Payment processing error" });
  }
};
