import express from "express"
import OrderController from "../controllers/order.controller.js";
import adminAuth from "../middlewares/adminAuth.js";
import userAuth from "../middlewares/userAuth.js";
const router = express.Router();

// Admin Features
router.get("/list",adminAuth,OrderController.allOrders);
router.post("/status",adminAuth,OrderController.updateStatus);

// Payment Features
router.post("/place",userAuth,OrderController.placeOrder);
router.post("/stripe",userAuth,OrderController.placeOrderStripe);
router.post("/razorpay",userAuth,OrderController.placeOrderRazorpay);

// User Features
router.get("/userorders",userAuth,OrderController.userOrders);
router.post("/verifyStripe",userAuth,OrderController.verifyStripe);
router.post("/verifyRazorpay",userAuth,OrderController.verifyRazorpay);



export default router;