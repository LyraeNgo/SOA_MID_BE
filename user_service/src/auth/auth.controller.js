import { loginUser } from "./auth.service.js"

export const login = async (req, res) => {
  const { email, password } = req.body;
  const data = await loginUser(email, password);

  if (!data) return res.status(401).json({ message: "Invalid credentials" });
  res.json(data);
};
