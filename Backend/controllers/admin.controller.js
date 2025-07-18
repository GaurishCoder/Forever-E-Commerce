import jwt from "jsonwebtoken";

const adminLogin = (req, res) => {
  try {
    let { email, password } = req.body;
    if (
      email !== process.env.ADMIN_EMAIL ||
      password !== process.env.ADMIN_PASSWORD
    ) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const token = jwt.sign(email, process.env.JWT_SECRET);
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "Lax",
      maxAge:24*60*60*1000
    });
    res.status(200).json({ message: "Admin Logged In", token: token });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error });
  }
};

const adminLogout = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: false,       // if you're using HTTPS
    sameSite: "Lax", // or "Lax" depending on your setup
  });
  res.status(200).json({ message: "Logout successful" });
};


const verifyAdminToken = (req, res) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.json({ success: true, user: decoded });
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};

export default {
  adminLogin,
  adminLogout,
  verifyAdminToken,
};
