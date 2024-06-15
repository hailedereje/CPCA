import jwt from "jsonwebtoken";
import { COOKIE_DOMAIN, NODE_ENV, TOKEN_EXPIRY, TOKEN_KEY } from "../config/constants.js";
import { UnautorizedError } from "../errors/index.js";
import path from "path";


const GenerateJWT = async (res, tokenData) => {
  const token = jwt.sign(tokenData, TOKEN_KEY, {
    expiresIn: TOKEN_EXPIRY,
  });

  res.cookie("jwt", token, {
    httpOnly: true,
    secure: NODE_ENV !== "development", // ensure HTTPS in production
    sameSite: NODE_ENV !== "development" ? "None" : "Lax", // Allow cross-origin in production
    domain: NODE_ENV !== "development" ? "cpca-front.vercel.app" : "localhost", // Set domain for production
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    path: "/", // root path
  });

  return token;
};
const ValidateJWT = async (res) => {
  let token = await res.cookies.jwt;
  if (token ) {
    try {
      const payload = jwt.verify(token, TOKEN_KEY);
      return payload;
    } catch (err) {
      throw new Error("Not Authorized");
    }
  }
  throw new UnautorizedError("No token");
};

export { GenerateJWT, ValidateJWT };
