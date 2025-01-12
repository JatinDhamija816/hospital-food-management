import PantryStaff from "../../models/pantry.model.js";

export const deletePantryStaff = async (req, res) => {
  try {
    const { pantryStaffId } = req.params;

    if (!pantryStaffId) {
      return res.status(400).json({
        success: false,
        message: "Pantry staff ID is required.",
      });
    }

    const staff = await PantryStaff.findById(pantryStaffId);
    if (!staff) {
      return res.status(404).json({
        success: false,
        message: "Pantry staff member not found.",
      });
    }

    await PantryStaff.findByIdAndDelete(pantryStaffId);

    return res.status(200).json({
      success: true,
      message: "Pantry staff member deleted successfully.",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error.",
      error: error.message,
    });
  }
};
