import dotenv from "dotenv";

dotenv.config();

export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const PASSWORD_REGEX =
  /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

export const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET;
export const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;

export const JWT_ACCESS_TOKEN_EXPIRATION_MS = Number(
  process.env.ACCESS_TOKEN_EXPIRY
);
export const JWT_REFRESH_TOKEN_EXPIRATION_MS = Number(
  process.env.REFRESH_TOKEN_EXPIRY
);

export const JWT_ACCESS_TOKEN_EXPIRATION_STR =
  process.env.ACCESS_TOKEN_EXPIRY_STR;
export const JWT_REFRESH_TOKEN_EXPIRATION_STR =
  process.env.REFRESH_TOKEN_EXPIRY_STR;

export const BCRYPT_SALT_ROUNDS = 10;
