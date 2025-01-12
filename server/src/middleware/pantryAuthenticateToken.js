import { verifyAccessToken } from "../utils/tokenUtils.js";

export const pantryAuthenticateToken = (req, res, next) => {
  try {
    const { pantryAccessToken } = req.cookies;

    if (!pantryAccessToken) {
      return res.status(401).json({
        success: false,
        message: "Access token missing.",
      });
    }

    const decoded = verifyAccessToken(pantryAccessToken);

    if (!decoded || !decoded.userId) {
      throw new Error("Invalid token payload.");
    }

    req.userId = decoded.userId;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token.",
    });
  }
};
