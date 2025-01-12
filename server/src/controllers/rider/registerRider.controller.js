import {
  BCRYPT_SALT_ROUNDS,
  EMAIL_REGEX,
  PASSWORD_REGEX,
} from "../../config/constants.js";
import Rider from "../../models/rider.model.js";
import bcrypt from "bcrypt";

export const registerRider = async (req, res) => {
  try {
    const { name, contactInfo, email, password } = req.body;

    const sanitizedName = name.trim();
    const sanitizedEmail = email.trim().toLowerCase();
    const sanitizedPassword = password.trim();
    const sanitizedContactInfo = contactInfo.trim();

    if (
      !sanitizedName ||
      !sanitizedContactInfo ||
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

    const existingRider = await Rider.findOne({ email: sanitizedEmail });
    if (existingRider) {
      return res.status(400).json({
        success: false,
        message: "Rider with this contact information already exists.",
      });
    }

    const salt = await bcrypt.genSalt(BCRYPT_SALT_ROUNDS);
    const hashedPassword = await bcrypt.hash(sanitizedPassword, salt);

    const newRider = new Rider({
      name: sanitizedName,
      contactInfo: sanitizedContactInfo,
      email: sanitizedEmail,
      password: hashedPassword,
    });

    await newRider.save();

    return res.status(201).json({
      success: true,
      message: "Rider registered successfully.",
      rider: newRider,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};
