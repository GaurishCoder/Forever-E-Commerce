import jwt from "jsonwebtoken";

const userAuth = (req, res, next) => {
    try {
    let token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "token not present" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded._id;
    next();
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error });
  }
};

export default userAuth;