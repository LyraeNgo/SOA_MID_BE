import {
  FindUserByEmail,
  FindUserById,
  FindUsers,
} from "../services/user.service.js";
import { CreateUser } from "../services/user.service.js";

export const PostUser = async (req, res, next) => {
  try {
    const user = await CreateUser(req.body);
    res.status(201).json(user);
  } catch (err) {
    console.error(err);
    if (err.message.includes("bắt buộc")) {
      res.status(400).json({ error: err.message });
    } else if (err.code === 11000) {
      res.status(400).json({ error: "Email hoặc username đã tồn tại" });
    } else {
      res.status(500).json({ error: "Server error" });
    }
  }
};

export const GetUsers = async (req, res) => {
  const users = await FindUsers();
  res.status(200).json(users);
};

export const GetUsersById = async (req, res) => {
  const { id } = req.params;
  const user = await FindUserById(id);
  res.status(200).json(user);
};

export const GetUsersByEmail = async (req, res) => {
  const { email } = req.params;
  const user = await FindUserByEmail(email);
  if (!user) {
    res.status(404).send("error");
  }
  res.status(200).json(user);
};
