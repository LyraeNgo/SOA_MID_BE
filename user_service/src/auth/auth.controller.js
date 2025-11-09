import { loginUser, verify } from "./auth.service.js";

export const login = async (req, res) => {
  console.log("🔥 AUTH CONTROLLER HIT");
  const { email, password } = req.body;
  const data = await loginUser(email, password);

  if (!data) return res.status(401).json({ message: "Invalid credentials" });
  res.json(data);
};

export const verifyToken = async (req, res) => {
  const { token } = req.params;
  const result = await verify(token);
  if (!result) return res.status(401).json({ message: "Invalid credentials" });
  res.json(result);
};
