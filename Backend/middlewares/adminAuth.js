import jwt from "jsonwebtoken";

const adminAuth = (req, res, next) => {
    try {
    let token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "token not present" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error });
  }
};

export default adminAuth