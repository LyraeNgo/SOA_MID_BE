import { generateToken, verifyJWT } from "./authJWT.middleware.js";
import { validateUserCredentials } from "./utils/userAPI.js";

export const loginUser = async (email, password) => {
  const { valid, userId } = await validateUserCredentials(email, password);
  if (!valid) return null;

  const token = generateToken({ userId });
  return { token };
};

export const verifyTokenService = async (token) => {
  const decoded = verifyJWT(token);
  return decoded; // null if invalid
};
