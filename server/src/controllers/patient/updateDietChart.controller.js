import DietChart from "../../models/dietChart.model.js";
import Patient from "../../models/patient.model.js";

export const updateDietChart = async (req, res) => {
  try {
    const { patientId } = req.params;
    const { meals } = req.body;

    if (!patientId || patientId.length !== 24) {
      return res.status(400).json({
        success: false,
        message: "Invalid patient ID",
      });
    }

    if (!Array.isArray(meals) || meals.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid or missing meals data",
      });
    }

    const patient = await Patient.findById(patientId);
    if (!patient) {
      return res.status(404).json({
        success: false,
        message: "Patient not found",
      });
    }

    const dietChart = await DietChart.findById(patient.dietChart);
    if (!dietChart) {
      return res.status(404).json({
        success: false,
        message: "Diet chart not found",
      });
    }

    meals.forEach((meal) => {
      const mealIndex = dietChart.meals.findIndex(
        (existingMeal) => existingMeal.type === meal.type
      );

      if (mealIndex !== -1) {
        dietChart.meals[mealIndex].ingredients = meal.ingredients;
        dietChart.meals[mealIndex].instructions = meal.instructions;
      } else {
        dietChart.meals.push(meal);
      }
    });

    const updatedDietChart = await dietChart.save();

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
