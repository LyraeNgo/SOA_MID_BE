import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { FindUserByEmail } from "./user.service.js";
import User from "../models/user.model.js";

export const getAuth = async (data) => {
  const { email, password } = data;
  const getInfo = await FindUserByEmail(email);

  if (!getInfo) {
    return { auth: false, message: "email hoặc password không đúng" };
  }

  const { passwordHash } = getInfo;
  const isPasswordValid = bcrypt.compareSync(password, passwordHash);
  if (!isPasswordValid) {
    return { auth: false, message: "email hoặc password không đúng" };
  }

  const token = jwt.sign({ id: getInfo._id }, process.env.JWT_SECRET, {
    expiresIn: 86400, // 24 hours
  });

  return { auth: true, token };
};

export const postRegister = async (data) => {
  try {
    const { email, password, username, phoneNumber, balance } = data;

    // Kiểm tra email đã tồn tại chưa
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return { success: false, message: "Email already exists" };
    }

    // Hash mật khẩu
    const salt = bcrypt.genSaltSync(10);
    const passwordHash = bcrypt.hashSync(password, salt);

    // Tạo user mới
    const newUser = new User({
      username,
      phoneNumber,
      email,
      passwordHash,
      balance,
    });

    await newUser.save();

    return {
      success: true,
      message: "Register successful",
      userId: newUser._id,
    };
  } catch (err) {
    return {
      success: false,
      message: "Error registering user",
      error: err.message,
    };
  }
};
