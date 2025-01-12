import Rider from "../../models/rider.model.js";

export const getRiderById = async (req, res) => {
  try {
    const { riderId } = req.params;

    const rider = await Rider.findById(riderId).populate(
      "assignedTasks.patientId"
    );

    if (!rider) {
      return res.status(404).json({
        success: false,
        message: "Rider not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Rider fetched successfully",
      rider,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};
