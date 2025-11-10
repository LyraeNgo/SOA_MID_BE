import {
  FindUserByEmail,
  FindUserById,
  FindUsers,
  CreateUser,
  validateUser,
  GetBalance,
  UpdateBalance,
} from "./user.service.js";
import mongoose from "mongoose";

export const PostUser = async (req, res) => {
  try {
    const newUser = await CreateUser(req.body);
    return res.status(201).json(newUser);
  } catch (err) {
    console.error(err);

    const status = err.statusCode || 500;

    return res.status(status).json({
      error: err.message,
    });
  }
};

export const GetUsers = async (req, res) => {
  const users = await FindUsers();
  res.status(200).json(users);
};

export const GetUsersById = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid user ID format" });
  }
  const user = await FindUserById(id);
  if (!user || user.length === 0) {
    return res.status(404).json({ error: "User not found " });
  }
  res.status(200).json(user);
};

export const GetUsersByEmail = async (req, res) => {
  const { email } = req.params;
  const user = await FindUserByEmail(email);
  console.log(user);

  if (!user) {
    return res.status(404).send({ error: "User not found" });
  }
  res.status(200).json(user);
};

export const GetMe = async (req, res) => {
  try {
    const result = await FindUserById(req.user.userId); // use req.user.userId
    if (!result) {
      return res.status(404).json({ message: "User not found" });
    }

    // remove password from response
    const { password, ...userData } = result.toObject();
    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const Validator = async (req, res) => {
  const { email, password } = req.body;
  const result = await validateUser(email, password);

  if (!result.valid) {
    return res
      .status(401)
      .json({ valid: false, message: "Invalid credentials" });
  }

  res.status(200).json(result);
};

export const getBalanceById = async (req, res) => {
  const { id } = req.params;

  try {
    const balance = await GetBalance(id);

    if (balance == -1) {
      return res.status(404).json({ message: "User not found" });
    }

    // Trả về balance đúng kiểu
    res.status(200).json({ balance: balance });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const UpdateBalanceById = async (req, res) => {
  try {
    const { userId, amount } = req.body;

    if (typeof amount !== "number") {
      return res.status(400).json({ error: "Amount must be a number" });
    }

    const updatedUser = await UpdateBalance(userId, amount);

    return res.json({
      success: true,
      balance: updatedUser.balance,
    });
  } catch (err) {
    return res.status(400).json({ error: "User Id is not correct"});
  }
};
