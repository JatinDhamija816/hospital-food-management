import AssignMeal from "../../models/assignMeal.model.js";

export const getAllMeals = async (req, res) => {
  try {
    const assignedMeals = await AssignMeal.find({})
      .populate({
        path: "patientId",
        select: "name age disease room bed floor",
      })
      .populate({
        path: "pantryStaffId",
        select: "name contactInfo assignedTask.preparationStatus",
      })
      .populate({
        path: "riderId",
        select: "name contactInfo assignedTask.deliveryStatus",
      });

    const dashboardData = assignedMeals.map((meal) => ({
      patient: {
        name: meal.patientId.name,
        bed: meal.patientId.bed,
        room: meal.patientId.room,
        floor: meal.patientId.floor,
        age: meal.patientId.age,
        disease: meal.patientId.disease,
      },
      pantryStaff: {
        name: meal.pantryStaffId.name,
        contact: meal.pantryStaffId.contactInfo,
        mealType: meal.mealType,
        preparationStatus:
          meal.pantryStaffId.assignedTask.preparationStatus || "Pending",
      },
      rider: {
        name: meal.riderId.name,
        contact: meal.riderId.contactInfo,
        deliveryStatus: meal.riderId.assignedTask.deliveryStatus || "Pending",
      },
    }));

    return res.status(200).json({
      success: true,
      message: "Assigned meal data fetched successfully for dashboard.",
      dashboardData,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};
