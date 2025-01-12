import { Router } from "express";
import { registerRider } from "../controllers/rider/registerRider.controller.js";
import { getAllRiders } from "../controllers/rider/getAllRider.controller.js";
import { getRiderById } from "../controllers/rider/getIndividualRider.controller.js";
import { deleteRider } from "../controllers/rider/deleteRider.controller.js";
import { updateRider } from "../controllers/rider/updateRiderController.js";
import { riderLogin } from "../controllers/rider/riderLogin.controller.js";
import { riderDashboard } from "../controllers/rider/riderDashboard.controller.js";
import { riderLogout } from "../controllers/rider/riderLogout.controller.js";
import { riderAuthenticateToken } from "../middleware/riderAuthenticateToken.js";
import { deliveryStatusUpdate } from "../controllers/rider/deliveryStatusUpdate.controller.js";

const router = Router();

router.post("/add-rider", registerRider);
router.get("/get-all-rider", getAllRiders);
router.get("/get-individual-rider/:riderId", getRiderById);
router.delete("/delete-rider/:riderId", deleteRider);
router.patch("/update-rider/:riderId", updateRider);
router.post("/rider-login", riderLogin);
router.post("/rider-dashboard", riderAuthenticateToken, riderDashboard);
router.delete("/rider-logout", riderLogout);
router.post(
  "/update-deliver-status",
  riderAuthenticateToken,
  deliveryStatusUpdate
);

export default router;
