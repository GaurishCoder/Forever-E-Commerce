import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import connectCloudinary from "./config/cloudinary.js";
import userRoute from "./routes/user.route.js";
import productRoute from "./routes/product.route.js";
import cookieParser from "cookie-parser";
import adminRoute from "./routes/admin.route.js";
import cartRoute from "./routes/cart.route.js";
import orderRoute from "./routes/order.route.js"
import cors from "cors";

// Configuration
dotenv.config();
const app = express();

// Express Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: ["https://forever-frontend-seven-phi.vercel.app", "http://localhost:5174"],
    credentials: true,
  })
);


// Database Connection
connectDB()
  .then(() => console.log("DB Connection Successfull"))
  .catch((err) => console.log(err));

connectCloudinary();

// Route Middleware
app.use("/api/user", userRoute);
app.use("/api/product", productRoute);
app.use("/api/admin", adminRoute);
app.use("/api/cart", cartRoute);
app.use("/api/order",orderRoute);

// Home Route
app.get("/", (req, res) => {
  res.status(200).send("welcome to home😀!!");
});

// Server Setup
app.listen(process.env.PORT, () => {
  console.log("Server is listing at", process.env.PORT);
});
