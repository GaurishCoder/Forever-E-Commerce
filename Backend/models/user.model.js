import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    cartData: { type: Object, default: {} },
  },
  { minimize: false }
);

userSchema.methods.hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hashPasswordData = await bcrypt.hash(password, salt);
  return hashPasswordData;
};

userSchema.methods.comparePassword = async (password, hashPassword) => {
  let checkPassword = await bcrypt.compare(password, hashPassword);
  return checkPassword;
};

userSchema.methods.generateToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET);
};

userSchema.methods.verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

const User = mongoose.model("User", userSchema);

export default User;
