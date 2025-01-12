import PantryStaff from "../../models/pantry.model.js";

export const getAllPantryStaff = async (req, res) => {
  try {
    const staffMembers = await PantryStaff.find({}).populate(
      "assignedTask.patientDetails",
      "name age disease room bed floor contact"
    );

    return res.status(200).json({
      success: true,
      message: "All pantry staff members fetched successfully.",
      staff: staffMembers,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error.",
      error: error.message,
    });
  }
};
