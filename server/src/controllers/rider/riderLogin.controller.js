import bcrypt from "bcrypt";
import { setAuthCookies } from "../../utils/cookieUtils.js";
import { generateAuthTokens } from "../../utils/tokenUtils.js";
import Rider from "../../models/rider.model.js";

export const riderLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required.",
      });
    }

    const sanitizedEmail = email.trim().toLowerCase();
    const sanitizedPassword = password.trim();

    const existingUser = await Rider.findOne({ email: sanitizedEmail });
    if (!existingUser) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    const isPasswordValid = await bcrypt.compare(
      sanitizedPassword,
      existingUser.password
    );
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    const { accessToken, refreshToken } = generateAuthTokens(
      existingUser._id,
      sanitizedEmail
    );

    setAuthCookies(res, accessToken, refreshToken, "rider");

    return res.status(200).json({
      success: true,
      message: "Rider Login successful",
      user: {
        name: existingUser.name,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "An unexpected error occurred. Please try again later.",
      error: error.message,
    });
  }
};
