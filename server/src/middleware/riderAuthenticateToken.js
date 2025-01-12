import { verifyAccessToken } from "../utils/tokenUtils.js";

export const riderAuthenticateToken = (req, res, next) => {
  try {
    const { riderAccessToken } = req.cookies;

    if (!riderAccessToken) {
      return res.status(401).json({
        success: false,
        message: "Access token missing.",
      });
    }

    const decoded = verifyAccessToken(riderAccessToken);

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
