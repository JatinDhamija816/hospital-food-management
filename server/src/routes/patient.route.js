import { Router } from "express";
import addPatient from "../controllers/patient/addPatient.controller.js";
import getAllPatientsWithDietChart from "../controllers/patient/gellAllPatient.controller.js";
import getIndividualPatient from "../controllers/patient/getIndividualPatient.controller.js";
import editPatient from "../controllers/patient/editPatient.controller.js";
import editDietChart from "../controllers/patient/editDietChart.controller.js";
import { deletePatient } from "../controllers/patient/deletePatient.controller.js";

const router = Router();

router.post("/add-patient", addPatient);
router.get("/get-all-patients", getAllPatientsWithDietChart);
router.get("/get-individual-patient/:patientId", getIndividualPatient);
router.patch("/update-patient/:patientId", editPatient);
router.patch("/update-dietChart/:patientId", editDietChart);
router.delete("/delete-patient/:patientId", deletePatient);

export default router;
