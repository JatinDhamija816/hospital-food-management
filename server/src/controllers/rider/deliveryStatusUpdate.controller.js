import PantryStaff from "../../models/pantry.model.js";
import AssignMeal from "../../models/assignMeal.model.js";
import Rider from "../../models/rider.model.js";

export const deliveryStatusUpdate = async (req, res) => {
  const userId = req.userId;

  try {
    const rider = await Rider.findById(userId);
    if (!rider) {
      return res.status(404).json({
        success: false,
        message: "Rider not found.",
      });
    }

    if (rider.assignedTask.deliveryStatus === "Pending") {
      rider.assignedTask.deliveryStatus = "Picked";
    } else if (rider.assignedTask.deliveryStatus === "Picked") {
      rider.assignedTask.deliveryStatus = "Delivered";
      rider.status = "Free";
    }
    await rider.save();

    const assignMeal = await AssignMeal.findOne({ riderId: userId });
    if (!assignMeal) {
      return res.status(404).json({
        success: false,
        message: "Assigned meal not found.",
      });
    }

    if (assignMeal.status === "Cooked") {
      assignMeal.status = "Picked";
      await assignMeal.save();
    } else if (assignMeal.status === "Picked") {
      assignMeal.status = "Delivered";
      await assignMeal.save();

      await AssignMeal.findByIdAndDelete(assignMeal._id);
    }

    return res.status(200).json({
      success: true,
      message: "Task and meal statuses updated successfully.",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error.",
      error: error.message,
    });
  }
};
