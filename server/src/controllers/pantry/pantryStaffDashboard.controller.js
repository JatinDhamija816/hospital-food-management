import AssignMeal from "../../models/assignMeal.model.js";
import PantryStaff from "../../models/pantry.model.js";

export const pantryStaffDashboard = async (req, res) => {
  try {
    const userId = req.userId;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "Pantry Staff ID is required.",
      });
    }

    const pantryStaff = await PantryStaff.findById(userId);
    if (!pantryStaff) {
      return res.status(404).json({
        success: false,
        message: "Pantry staff not found.",
      });
    }

    const assignedMeal = await AssignMeal.findOne({
      pantryStaffId: userId,
    }).populate("patientId");

    if (!assignedMeal) {
      return res.status(404).json({
        success: false,
        message: "No assigned tasks found.",
      });
    }

    const patient = assignedMeal.patientId;

    const dashboardData = {
      patientDetails: {
        name: patient.name,
        age: patient.age,
        disease: patient.disease,
        room: patient.room,
        bed: patient.bed,
        floor: patient.floor,
        contact: patient.contact,
      },
      mealDetails: {
        mealType: assignedMeal.mealType,
        ingredients: pantryStaff.assignedTask?.mealDetails?.ingredients || [],
        instructions: pantryStaff.assignedTask?.mealDetails?.instructions || "",
      },
      status: assignedMeal.status,
    };

    return res.status(200).json({
      success: true,
      message: "Pantry Staff Dashboard Data Retrieved Successfully.",
      data: dashboardData,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server Error.",
      error: error.message,
    });
  }
};
