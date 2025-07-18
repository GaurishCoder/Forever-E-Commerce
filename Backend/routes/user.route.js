import express from "express";
import UserController from "../controllers/user.controller.js";
const router = express.Router();

router.post("/register", UserController.registerUser);
router.post("/login", UserController.loginUser);
router.get("/verify",UserController.verifyUser);
router.post("/logout",UserController.logoutUser);

export default router;