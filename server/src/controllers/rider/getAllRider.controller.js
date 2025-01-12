import Rider from "../../models/rider.model.js";
import Patient from "../../models/patient.model.js";

export const getAllRiders = async (req, res) => {
  try {
    const riders = await Rider.find({}).populate(
      "assignedTask.patientDetails",
      "name age disease room bed floor contact"
    );

    return res.status(200).json({
      success: true,
      message: "Riders fetched successfully.",
      riders,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};
