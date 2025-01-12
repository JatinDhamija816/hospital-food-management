import { setAuthCookies } from "../../utils/cookieUtils.js";
import { generateAuthTokens } from "../../utils/tokenUtils.js";

export const adminLogin = async (req, res) => {
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

    if (sanitizedEmail !== "admin@gmail.com" || sanitizedPassword !== "admin") {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    const { accessToken, refreshToken } = generateAuthTokens(sanitizedEmail);

    setAuthCookies(res, accessToken, refreshToken, "admin");

    return res.status(200).json({
      success: true,
      message: "Admin Login successful",
      user: {
        name: "admin",
        email: sanitizedEmail,
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
