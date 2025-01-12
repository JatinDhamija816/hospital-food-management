import PantryStaff from "../../models/pantry.model.js";
import AssignMeal from "../../models/assignMeal.model.js";

export const mealStatusUpdate = async (req, res) => {
  const userId = req.userId;

  try {
    const pantryStaff = await PantryStaff.findById(userId);
    if (!pantryStaff) {
      return res.status(404).json({
        success: false,
        message: "Pantry staff member not found.",
      });
    }

    if (pantryStaff.assignedTask.preparationStatus === "Pending") {
      pantryStaff.assignedTask.preparationStatus = "In-Progress";
    } else if (pantryStaff.assignedTask.preparationStatus === "In-Progress") {
      pantryStaff.assignedTask.preparationStatus = "Complete";
      pantryStaff.status = "Free";
    }
    await pantryStaff.save();

    const assignMeal = await AssignMeal.findOne({ pantryStaffId: userId });
    if (!assignMeal) {
      return res.status(404).json({
        success: false,
        message: "Assigned meal not found.",
      });
    }

    if (assignMeal.status === "Pending") {
      assignMeal.status = "In-Progress";
    } else if (assignMeal.status === "In-Progress") {
      assignMeal.status = "Cooked";
    }
    await assignMeal.save();

    return res.status(200).json({
      success: true,
      message: "Task and meal statuses updated successfully.",
      updatedData: {
        pantryStaff: {
          id: pantryStaff._id,
          preparationStatus: pantryStaff.assignedTask.preparationStatus,
        },
        assignMeal: {
          id: assignMeal._id,
          status: assignMeal.status,
        },
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error.",
      error: error.message,
    });
  }
};
