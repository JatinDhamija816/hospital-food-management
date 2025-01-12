import { Router } from "express";
import { adminLogin } from "../controllers/admin/adminLogin.controller.js";
import { check_login } from "../controllers/admin/checkLogin.controller.js";
import { assignMeal } from "../controllers/admin/assignMeal.controller.js";
import { getAllMeals } from "../controllers/admin/getAllMeal.controller.js";
import { adminLogout } from "../controllers/admin/adminLogout.controller.js";

const router = Router();

router.post("/admin-login", adminLogin);
router.post("/check-login", check_login);
router.delete("/admin-logout", adminLogout);
router.post("/assign-meal", assignMeal);
router.get("/get-all-assign-meal", getAllMeals);

export default router;
