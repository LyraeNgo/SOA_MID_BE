import User from "./user.model.js";

// ===== CREATE USER =====
export const CreateUser = async (data) => {
  const { username, phoneNumber, email, password } = data;

  // Optional: check if email already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error("Email đã được sử dụng");
  }

  const newUser = await User.create({
    username,
    phoneNumber,
    email,
    password,
  });

  return newUser;
};

// ===== GET ALL USERS =====
export const FindUsers = async () => {
  const users = await User.find();
  return users;
};

// ===== GET USER BY ID =====
export const FindUserById = async (id) => {
  const user = await User.findById(id);
  if (!user) throw new Error("User không tồn tại");
  return user;
};

// ===== GET USER BY EMAIL =====
export const FindUserByEmail = async (email) => {
  const user = await User.findOne({ email });
  if (!user) return { auth: false, message: "Email không đúng" };
  return user;
};

// ===== GET BALANCE =====
export const GetBalance = async (id) => {
  const user = await User.findById(id);
  if (!user) return { auth: false, message: "User không tồn tại" };
  return user.balance;
};

// ===== UPDATE BALANCE =====
export const UpdateBalance = async (id, amount) => {
  const user = await User.findById(id);
  if (!user) throw new Error("User không tồn tại");

  const newBalance = user.balance + amount;
  if (newBalance < 0) throw new Error("Balance cannot go negative");

  user.balance = newBalance;
  await user.save();
  return user;
};

// ===== VALIDATE USER LOGIN =====
export const validateUser = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) return { valid: false };

  const isMatch = await user.matchPassword(password);
  if (!isMatch) return { valid: false };

  return { valid: true, userId: user._id };
};
