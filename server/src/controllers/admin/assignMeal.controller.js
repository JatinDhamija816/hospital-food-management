import AssignMeal from "../../models/assignMeal.model.js";
import PantryStaff from "../../models/pantry.model.js";
import Rider from "../../models/rider.model.js";
import Patient from "../../models/patient.model.js";
import DietChart from "../../models/dietChart.model.js";

export const assignMeal = async (req, res) => {
  try {
    const { pantryStaffId, riderId, patientId, mealType } = req.body;

    if (!pantryStaffId || !riderId || !patientId || !mealType) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const pantryStaff = await PantryStaff.findById(pantryStaffId);
    if (!pantryStaff || pantryStaff.status !== "Free") {
      return res.status(400).json({
        success: false,
        message: "Selected pantry staff is not available",
      });
    }

    const rider = await Rider.findById(riderId);
    if (!rider || rider.status !== "Free") {
      return res.status(400).json({
        success: false,
        message: "Selected rider is not available",
      });
    }

    const patient = await Patient.findById(patientId);
    const dietChart = await DietChart.findOne({ patientId });

    if (!patient || !dietChart) {
      return res.status(404).json({
        success: false,
        message: "Patient or diet chart not found",
      });
    }

    const meal = dietChart.meals.find((m) => m.type === mealType);
    if (!meal) {
      return res.status(400).json({
        success: false,
        message: `No diet chart found for ${mealType}`,
      });
    }

    const assignment = new AssignMeal({
      pantryStaffId,
      riderId,
      patientId,
      mealType,
    });
    await assignment.save();

    pantryStaff.assignedTask = {
      patientDetails: patientId,
      mealType,
      preparationStatus: "Pending",
      mealDetails: {
        ingredients: meal.ingredients,
        instructions: meal.instructions,
      },
    };
    pantryStaff.status = "Busy";
    await pantryStaff.save();

    rider.assignedTask = {
      patientDetails: patientId,
      deliveryStatus: "Pending",
    };
    rider.status = "Busy";
    await rider.save();

    return res.status(201).json({
      success: true,
      message: "Meal assigned successfully",
      assignment,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};
