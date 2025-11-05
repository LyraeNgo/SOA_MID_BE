import { generateToken } from "./authJWT.middleware.js";
import { validateUserCredentials } from "../utils/userAPI.js";

export const loginUser = async (email, password) => {
  const { valid, userId, role } = await validateUserCredentials(
    email,
    password
  );
  if (!valid) return null;

  const token = generateToken({ userId, role });
  return { token };
};
