import {
  BCRYPT_SALT_ROUNDS,
  EMAIL_REGEX,
  PASSWORD_REGEX,
} from "../../config/constants.js";
import PantryStaff from "../../models/pantry.model.js";
import bcrypt from "bcrypt";

export const registerPantryStaff = async (req, res) => {
  try {
    const { name, contactInfo, location, email, password } = req.body;

    const sanitizedName = name.trim();
    const sanitizedEmail = email.trim().toLowerCase();
    const sanitizedPassword = password.trim();
    const sanitizedContactInfo = contactInfo.trim();
    const sanitizedLocation = location.trim();

    if (
      !sanitizedName ||
      !sanitizedContactInfo ||
      !sanitizedLocation ||
      !sanitizedEmail ||
      !sanitizedPassword
    ) {
      return res.status(400).json({
        success: false,
        message: "All are required fields.",
      });
    }

    if (!EMAIL_REGEX.test(sanitizedEmail)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email format.",
      });
    }

    if (!PASSWORD_REGEX.test(sanitizedPassword)) {
      return res.status(400).json({
        success: false,
        message:
          "Password must be at least 8 characters long, include one uppercase letter, one lowercase letter, one number, and one special character.",
      });
    }

    const existingStaff = await PantryStaff.findOne({ email: sanitizedEmail });
    if (existingStaff) {
      return res.status(400).json({
        success: false,
        message: "A staff member with this email already exists.",
      });
    }

    const salt = await bcrypt.genSalt(BCRYPT_SALT_ROUNDS);
    const hashedPassword = await bcrypt.hash(sanitizedPassword, salt);

    const newPantryStaff = new PantryStaff({
      name: sanitizedName,
      contactInfo: sanitizedContactInfo,
      location: sanitizedLocation,
      email: sanitizedEmail,
      password: hashedPassword,
    });

    const savedStaff = await newPantryStaff.save();

    return res.status(201).json({
      success: true,
      message: "Pantry staff member registered successfully.",
      staff: savedStaff,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error.",
      error: error.message,
    });
  }
};
