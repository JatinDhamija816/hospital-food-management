import Patient from "../../models/patient.model.js";

const editPatient = async (req, res) => {
  try {
    const { patientId } = req.params;
    const updatedData = req.body;

    const patient = await Patient.findById(patientId);
    if (!patient) {
      return res.status(404).json({
        success: false,
        message: "Patient not found",
      });
    }

    for (const key in updatedData) {
      patient[key] = updatedData[key];
    }

    await patient.save();

    return res.status(200).json({
      success: true,
      message: "Patient data updated successfully",
      patient,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

export default editPatient;
