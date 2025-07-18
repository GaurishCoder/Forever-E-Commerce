import express from "express"
import AdminController from "../controllers/admin.controller.js";
const router = express.Router();

router.post("/login",AdminController.adminLogin);
router.post("/logout",AdminController.adminLogout);
router.get("/verify",AdminController.verifyAdminToken);

export default router;