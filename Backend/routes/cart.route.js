import express from  "express"
import CartController from "../controllers/cart.controller.js";
import userAuth from "../middlewares/userAuth.js";
const router = express.Router();

router.get("/get",userAuth,CartController.getUserCart);
router.get("/count",userAuth,CartController.getCartCount);
router.post("/add",userAuth,CartController.addToCart);
router.put("/update/:id/:size/:quantity",userAuth,CartController.updateQuantity);
router.delete("/delete/:id/:size",userAuth,CartController.removeCart);

export default router;