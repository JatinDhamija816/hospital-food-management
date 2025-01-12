import jwt from "jsonwebtoken";
import {
  JWT_ACCESS_SECRET,
  JWT_ACCESS_TOKEN_EXPIRATION_STR,
  JWT_REFRESH_SECRET,
  JWT_REFRESH_TOKEN_EXPIRATION_STR,
} from "../config/constants.js";

export const generateAuthTokens = (userId = "admin", email) => {
  try {
    const accessToken = generateAccessToken(userId, email);
    const refreshToken = generateRefreshToken(userId, email);

    return { accessToken, refreshToken };
  } catch (error) {
    throw new Error("Error generating auth tokens");
  }
};

export const generateAccessToken = (userId, email) => {
  try {
    return jwt.sign({ userId, email }, JWT_ACCESS_SECRET, {
      expiresIn: JWT_ACCESS_TOKEN_EXPIRATION_STR,
    });
  } catch (error) {
    throw new Error("Error generating access token");
  }
};

export const generateRefreshToken = (userId, email) => {
  try {
    return jwt.sign({ userId, email }, JWT_REFRESH_SECRET, {
      expiresIn: JWT_REFRESH_TOKEN_EXPIRATION_STR,
    });
  } catch (error) {
    throw new Error("Error generating refresh token");
  }
};

export const verifyAccessToken = (token) => {
  return jwt.verify(token, process.env.JWT_ACCESS_SECRET);
};

export const verifyRefreshToken = (token) => {
  return jwt.verify(token, process.env.JWT_REFRESH_SECRET);
};
