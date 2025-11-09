import { loginUser, verifyTokenService } from "./auth.service.js";

export const login = async (req, res) => {
  console.log("🔥 AUTH CONTROLLER HIT");
  const { email, password } = req.body;
  const data = await loginUser(email, password);

  if (!data) return res.status(401).json({ message: "Invalid credentials" });
  res.json(data);
};

// Verify token route
export const verifyTokenController = async (req, res) => {
  console.log("🔥 AUTH VERIFY HIT");

  const { token } = req.body;
  console.log("Token received:", req.body.token);
  const result = await verifyTokenService(token);
  console.log("Decoded token:", result);

  if (!result) return res.status(401).json({ message: "Invalid credentials" });
  res.json(result);
};
