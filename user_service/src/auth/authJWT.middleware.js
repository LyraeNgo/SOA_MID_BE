import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const jwtSecret = process.env.JWT_SECRET;

export const generateToken = (payload, expiresIn = "1h") => {
  return jwt.sign(payload, jwtSecret, { expiresIn });
};

export const verifyJWT = (token) => {
  try {
    return jwt.verify(token,jwtSecret);
  } catch {
    return null;
  }
};
