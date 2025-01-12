import PantryStaff from "../../models/pantry.model.js";

export const updatePantryStaff = async (req, res) => {
  try {
    const { pantryStaffId } = req.params;
    const { name, contactInfo, location, status, assignedTask, email } =
      req.body;

    const pantryStaff = await PantryStaff.findById(pantryStaffId);

    if (!pantryStaff) {
      return res.status(404).json({
        success: false,
        message: "Pantry staff member not found.",
      });
    }

    if (name) pantryStaff.name = name;
    if (contactInfo) pantryStaff.contactInfo = contactInfo;
    if (location) pantryStaff.location = location;
    if (status) pantryStaff.status = status;
    if (assignedTask) pantryStaff.assignedTask = assignedTask;
    if (email) pantryStaff.email = email;

    const updatedStaff = await pantryStaff.save();

    return res.status(200).json({
      success: true,
      message: "Pantry staff member updated successfully.",
      staff: updatedStaff,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error.",
      error: error.message,
    });
  }
};
