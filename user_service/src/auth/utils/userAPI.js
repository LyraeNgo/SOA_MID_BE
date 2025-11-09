import axios from "axios";

// call user api 
export const validateUserCredentials = async (email, password) => {
  try {
    const res = await axios.post(`http://localhost:5005/api/users/validate`, {
      email,
      password,
    });
    console.log("🚀 ~ validateUserCredentials ~ res:", res.data)
    return res.data; // { valid, userId }
  } catch (err) {
    console.error("user-service unavailable:", err.message);
    return { valid: false };
  }
};
