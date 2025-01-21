import { Router } from "express";
import { check_login } from "../controllers/admin/checkLogin.controller.js";

const router = Router();

router.post("/check-login", check_login);

export default router;
