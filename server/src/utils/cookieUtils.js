import {
  JWT_ACCESS_TOKEN_EXPIRATION_MS,
  JWT_REFRESH_TOKEN_EXPIRATION_MS,
} from "../config/constants.js";

export const setAuthCookies = (res, accessToken, refreshToken, role) => {
  const accessExpiresAt = new Date(
    Date.now() + Number(JWT_ACCESS_TOKEN_EXPIRATION_MS)
  );

  const refreshExpiresAt = new Date(
    Date.now() + Number(JWT_REFRESH_TOKEN_EXPIRATION_MS)
  );

  const isProduction = process.env.NODE_ENV === "production";
  const sameSite = isProduction ? "None" : "Lax";

  const cookiePrefix =
    role === "admin" ? "admin" : role === "pantry" ? "pantry" : "rider";

  res.cookie(`${cookiePrefix}AccessToken`, accessToken, {
    httpOnly: true,
    secure: isProduction,
    path: "/",
    sameSite: sameSite,
    expires: accessExpiresAt,
  });

  res.cookie(`${cookiePrefix}RefreshToken`, refreshToken, {
    httpOnly: true,
    secure: isProduction,
    path: "/",
    sameSite: sameSite,
    expires: refreshExpiresAt,
  });
};
