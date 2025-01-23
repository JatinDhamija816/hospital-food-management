import DietChart from "../../models/dietChart.model.js";
import Patient from "../../models/patient.model.js";

const editDietChart = async (req, res) => {
  try {
    const { patientId } = req.params;
    const dietChart = req.body;

    const patient = await Patient.findById(patientId);

    if (!patient) {
      return res.status(404).json({
        success: false,
        message: "Patient not found",
      });
    }

    const existingDietChart = await DietChart.findById(patient.dietChart);
    if (!existingDietChart) {
      return res.status(404).json({
        success: false,
        message: "Diet chart not found",
      });
    }

    for (const key in dietChart) {
      existingDietChart[key].ingredients = dietChart[key].ingredients;
      existingDietChart[key].instructions = dietChart[key].instructions;
    }

    const updatedDietChart = await existingDietChart.save();

    return res.status(200).json({
      success: true,
      message: "Diet chart updated successfully",
      dietChart: updatedDietChart,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

export default editDietChart;
