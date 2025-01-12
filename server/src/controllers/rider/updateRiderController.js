import Rider from "../../models/rider.model.js";

export const updateRider = async (req, res) => {
  try {
    const { riderId } = req.params;
    const { name, contactInfo, email, status, assignedTask } = req.body;

    const rider = await Rider.findById(riderId);
    if (!rider) {
      return res.status(404).json({
        success: false,
        message: "Rider not found.",
      });
    }

    if (name) rider.name = name;
    if (contactInfo) rider.contactInfo = contactInfo;
    if (assignedTask) rider.assignedTask = assignedTask;
    if (email) rider.email = email;

    const updatedRider = await rider.save();

    return res.status(200).json({
      success: true,
      message: "Rider updated successfully.",
      rider: updatedRider,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error.",
      error: error.message,
    });
  }
};
