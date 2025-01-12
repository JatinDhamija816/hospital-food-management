import { JWT_ACCESS_TOKEN_EXPIRATION_MS } from "../../config/constants.js";
import {
  generateAccessToken,
  verifyRefreshToken,
} from "../../utils/tokenUtils.js";

const refreshSession = (res, refreshTokenData, role) => {
  const newAccessToken = generateAccessToken(
    refreshTokenData.userId,
    refreshTokenData.email
  );
  const accessExpiresAt = new Date(
    Date.now() + Number(JWT_ACCESS_TOKEN_EXPIRATION_MS)
  );
  const isProduction = process.env.NODE_ENV === "production";
  const sameSite = isProduction ? "None" : "Lax";

  res.cookie(`${role}AccessToken`, newAccessToken, {
    httpOnly: true,
    secure: isProduction,
    path: "/",
    sameSite: sameSite,
    expires: accessExpiresAt,
  });

  return {
    isLoggedIn: true,
    message: "Session refreshed successfully. You are now logged in.",
    user: refreshTokenData,
  };
};

export const check_login = async (req, res) => {
  try {
    const { role } = req.body;

    if (!role) {
      return res.status(400).json({
        message: "Role is required to check login status.",
        isLoggedIn: false,
      });
    }

    const accessToken = req.cookies[`${role}AccessToken`];
    const refreshToken = req.cookies[`${role}RefreshToken`];

    if (!accessToken && !refreshToken) {
      return res.status(200).json({
        message: "Your session has expired. Please log in again to continue.",
        isLoggedIn: false,
      });
    }

    if (!accessToken && refreshToken) {
      try {
        const refreshTokenData = verifyRefreshToken(refreshToken);

        if (!refreshTokenData) {
          return res.status(200).json({
            message:
              "Your session could not be refreshed. Please log in again.",
            isLoggedIn: false,
          });
        }

        const response = refreshSession(res, refreshTokenData, role);
        return res.status(200).json(response);
      } catch (error) {
        return res.status(401).json({
          message: "We could not refresh your session. Please log in again.",
          isLoggedIn: false,
        });
      }
    }

    try {
      const userData = verifyAccessToken(accessToken);

      return res.status(200).json({
        isLoggedIn: true,
        message: "You are logged in successfully.",
        user: userData,
      });
    } catch (error) {
      if (!refreshToken) {
        return res.status(401).json({
          message: "Your session has expired. Please log in again to continue.",
          isLoggedIn: false,
        });
      }

      try {
        const refreshTokenData = verifyRefreshToken(refreshToken);

        if (!refreshTokenData) {
          return res.status(401).json({
            message:
              "Your session could not be refreshed. Please log in again.",
            isLoggedIn: false,
          });
        }

        const response = refreshSession(res, refreshTokenData, role);
        return res.status(200).json(response);
      } catch (refreshError) {
        return res.status(401).json({
          message: "We could not refresh your session. Please log in again.",
          isLoggedIn: false,
        });
      }
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong. Please try again later.",
    });
  }
};
