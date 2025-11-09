import { charge } from "./payment.service.js";

export const postCharge = async (req, res) => {
  try {
    const { userId, transactionId } = req.body;

    if (!userId || !transactionId) {
      return res.status(400).json({
        error: "userId and transactionId are required",
      });
    }

    const result = await charge({ userId, transactionId });

    return res.json(result);
  } catch (err) {
    console.error("Payment error:", err);
    return res.status(500).json({ error: "Payment processing error" });
  }
};
