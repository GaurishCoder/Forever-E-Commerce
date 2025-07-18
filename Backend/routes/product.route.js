import express from "express";
import ProductController from "../controllers/product.controller.js";
import upload from "../middlewares/multer.js";
import adminAuth from "../middlewares/adminAuth.js";
const router = express.Router();

router.post("/add",adminAuth,upload.fields([{name:"image1",maxCount:1},{name:"image2",maxCount:1},{name:"image3",maxCount:1},{name:"image4",maxCount:1}]),ProductController.createProduct);

router.get("/show", ProductController.showAllProduct);

router.get("/edit/:id",adminAuth, ProductController.renderUpdatePage);

router.get("/single/:id",adminAuth,ProductController.singleProduct);

router.put("/edit/:id",adminAuth,upload.fields([{name:"image1",maxCount:1},{name:"image2",maxCount:1},{name:"image3",maxCount:1},{name:"image4",maxCount:1}]), ProductController.updateProduct);

router.delete("/delete/:id",adminAuth, ProductController.deleteProduct);

export default router;
