import { getAuth, postRegister } from "../services/auth.service.js";

export const login = async (req, res) => {
  //lây data từ body
  const data = req.body;

  if (data) {
    const result = await getAuth(data); //nhận về json chứa token
    return res.json(result);
  } else {
    res.status(400).json({ error: "Invalid request" });
  }
};

export const register = async (req, res) => {
  const result = await postRegister(req.body);
  return res.json(result);
};
