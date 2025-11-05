import axios from "axios";

const userServiceUrl = process.env.USER_URL;

export const validateUserCredentials = async (email, password) => {
  try {
    const res = await axios.post(`${userServiceUrl}/api/validate`, {
      email,
      password,
    });
    return res.data; // { valid, userId, role }
  } catch (err) {
    console.error("user-service unavailable:", err.message);
    return { valid: false };
  }
};
