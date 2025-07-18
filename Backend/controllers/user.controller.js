import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

const registerUser = async (req, res) => {
  try {
    let { name, email, password } = req.body;
    let existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    let user = new User({
      name,
      email,
    });
    let hashPasswordData = await user.hashPassword(password);
    user.password = hashPasswordData;
    let userData = await user.save();
    let userPayload = {
      _id: userData._id,
      email: userData.email,
    };
    let token = user.generateToken(userPayload);
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "Lax",
      maxAge:24*60*60*1000
    });
    res.status(200).json({ message: "User Created", user: userData });
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    let { email, password } = req.body;
    let userExists = await User.findOne({ email });
    if (!userExists) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    let isMatch = await userExists.comparePassword(
      password,
      userExists.password
    );
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    let userPayload = {
      _id: userExists._id,
      email: userExists.email,
    };
    let token = userExists.generateToken(userPayload);
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "Lax",
      maxAge:24*60*60*1000
    });

    let username = userExists.name;

    res.status(200).json({ message: "User Logged In!!", user: userExists , username:username});
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: error.message });
  }
};

const verifyUser = (req, res) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.json({ success: true, user: decoded });
  } catch (err) {
    console.error("Token verification failed:", err.message);
    res.status(401).json({ message: "Invalid token" });
  }
};

const logoutUser = (req, res) => {
  try {
    res.clearCookie("token", {
      secure: false,
      httpOnly: true,
    });
    res.status(200).json({message:"Logout Successfully"});
  } catch (error) {
    console.log(error);
    res.status(400).json({message:"User not found"});
  }
};

export default {
  registerUser,
  loginUser,
  verifyUser,
  logoutUser,
};
