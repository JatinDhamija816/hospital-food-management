import Patient from "../../models/patient.model.js";

const getAllPatientsWithDietChart = async (__, res) => {
  try {
    const patients = await Patient.find().populate("dietChart");

    if (!patients) {
      return res.status(404).json({
        success: false,
        message: "Patients not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "All Patients Details",
      patients,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

export default getAllPatientsWithDietChart;
