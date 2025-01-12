import PantryStaff from "../../models/pantry.model.js";

export const getPantryStaffById = async (req, res) => {
  try {
    const { pantryStaffId } = req.params;

    const pantryStaff = await PantryStaff.findById(pantryStaffId);

    if (!pantryStaff) {
      return res.status(404).json({
        success: false,
        message: "Pantry staff member not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Pantry staff member fetched successfully.",
      staff: pantryStaff,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error.",
      error: error.message,
    });
  }
};
