import { Router } from "express";
import { createPatientWithDietChart } from "../controllers/patient/createPatient.controller.js";
import { getAllPatientsWithDietChart } from "../controllers/patient/gellAllPatient.controller.js";
import { deletePatient } from "../controllers/patient/deletePatient.controller.js";
import { updatePatient } from "../controllers/patient/updatePatient.controller.js";
import { updateDietChart } from "../controllers/patient/updateDietChart.controller.js";
import { getIndividualPatient } from "../controllers/patient/getIndividualPatient.controller.js";

const router = Router();

router.post("/add-patient-dietChart", createPatientWithDietChart);
router.get("/get-all-patients", getAllPatientsWithDietChart);
router.get("/get-individual-patient/:patientId", getIndividualPatient);
router.patch("/update-patient/:patientId", updatePatient);
router.patch("/update-dietChart/:patientId", updateDietChart);
router.delete("/delete-patient/:patientId", deletePatient);

export default router;
