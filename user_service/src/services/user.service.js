import User from "../models/user.model.js";

export const ping = (req, res) => {
  const ping = {
    hello: "ping here",
  };
  return ping;
};

// =====start CRUD==========
export const CreateUser = async (data) => {
  const { username, email, passwordHash } = data;
  const newUser = await User.create({
    username,
    email,
    passwordHash,
  });
  return newUser;
};

// GET ALL
export const FindUsers = async () => {
  const users = await User.find();
  return users;
};

// GET USER
export const FindUserById = async (id) => {
  const user = await User.findById(id);
  return user;
};

export const FindUserByEmail = async (email) => {
  const user = await User.findOne({ email: email });
  if (!user) {
    return { auth: false, message: "email khong dung " };
  }
  return user;
};

export const FindUserByStudentId = async (studentId) => {
  const user = await User.findOne({ studentId: studentId });
  if (!user) {
    return { auth: false, message: "studentId khong dung " };
  }
  return user;
};
