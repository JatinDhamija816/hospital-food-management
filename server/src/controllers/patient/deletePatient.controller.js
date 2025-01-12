import Patient from "../../models/patient.model.js";
import DietChart from "../../models/dietChart.model.js";

export const deletePatient = async (req, res) => {
  try {
    const { patientId } = req.params;

    const patient = await Patient.findById(patientId);
    if (!patient) {
      return res.status(404).json({
        success: false,
        message: "Patient not found",
      });
    }

    if (patient.dietChart) {
      const dietChart = await DietChart.findByIdAndDelete(patient.dietChart);
      if (!dietChart) {
        return res.status(500).json({
          success: false,
          message: "Failed to delete diet chart",
        });
      }
    }

    await Patient.findByIdAndDelete(patientId);

    return res.status(200).json({
      success: true,
      message: "Patient and associated diet chart deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};
