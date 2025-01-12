import { Router } from "express";
import { registerPantryStaff } from "../controllers/pantry/registerPantryStaff.controller.js";
import { getAllPantryStaff } from "../controllers/pantry/getAllPantryStaff.controller.js";
import { deletePantryStaff } from "../controllers/pantry/deletePantryStaff.controller.js";
import { getPantryStaffById } from "../controllers/pantry/getIndividualPantryStaff.controller.js";
import { updatePantryStaff } from "../controllers/pantry/updatePantrySatff.controller.js";
import { pantryStaffLogin } from "../controllers/pantry/pantryStaffLogin.controller.js";
import { pantryStaffDashboard } from "../controllers/pantry/pantryStaffDashboard.controller.js";
import { pantryLogout } from "../controllers/pantry/pantryLogout.controller.js";
import { mealStatusUpdate } from "../controllers/pantry/mealStatusUpdate.controller.js";
import { pantryAuthenticateToken } from "../middleware/pantryAuthenticateToken.js";

const router = Router();

router.post("/add-pantry-staff", registerPantryStaff);
router.delete("/delete-pantry-staff/:pantryStaffId", deletePantryStaff);
router.get("/get-all-pantry-staff", getAllPantryStaff);
router.get("/get-individual-pantry-staff/:pantryStaffId", getPantryStaffById);
router.patch("/update-pantry-staff/:pantryStaffId", updatePantryStaff);
router.post("/pantry-staff-login", pantryStaffLogin);
router.delete("/pantry-logout", pantryLogout);
router.post(
  "/pantry-staff-dashboard",
  pantryAuthenticateToken,
  pantryStaffDashboard
);
router.post("/update-meal-status", pantryAuthenticateToken, mealStatusUpdate);

export default router;
