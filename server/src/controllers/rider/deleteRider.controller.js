import Rider from "../../models/rider.model.js";

export const deleteRider = async (req, res) => {
  try {
    const { riderId } = req.params;

    const deletedRider = await Rider.findByIdAndDelete(riderId);

    if (!deletedRider) {
      return res.status(404).json({
        success: false,
        message: "Rider not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Rider deleted successfully",
      deletedRider,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};
