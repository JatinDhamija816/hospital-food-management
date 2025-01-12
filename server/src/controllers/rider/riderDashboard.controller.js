import AssignMeal from "../../models/assignMeal.model.js";
import Rider from "../../models/rider.model.js";

export const riderDashboard = async (req, res) => {
  try {
    const userId = req.userId;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "Pantry Staff ID is required.",
      });
    }

    const rider = await Rider.findById(userId);
    if (!rider) {
      return res.status(404).json({
        success: false,
        message: "Pantry staff not found.",
      });
    }

    const assignedMeal = await AssignMeal.findOne({
      riderId: userId,
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
        room: patient.room,
        bed: patient.bed,
        floor: patient.floor,
        contact: patient.contact,
      },
      mealDetails: {
        mealType: assignedMeal.mealType,
      },
      status: assignedMeal.status,
      rider: {
        status: rider.status,
        deliverStatus: rider.assignedTask.deliveryStatus,
      },
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
