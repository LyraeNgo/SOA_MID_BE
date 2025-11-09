import axios from "axios";

export const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Missing token" });
  }

  const token = authHeader.split(" ")[1];

  try {
    // Call Auth Service to verify token
    const response = await axios.post(`http://localhost:5001/api/auth/verify`, {
      token,
    });
    // Auth Service should return decoded payload like { userId }
    req.user = response.data;
    console.log("🚀 ~ authMiddleware ~ req.user:", req.user);

    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
