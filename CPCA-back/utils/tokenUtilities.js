import jwt from "jsonwebtoken";
import { COOKIE_DOMAIN, NODE_ENV, TOKEN_EXPIRY, TOKEN_KEY } from "../config/constants.js";
import { UnautorizedError } from "../errors/index.js";
import path from "path";

const GenerateJWT = async (res, tokenData) => {
  const token = await jwt.sign(tokenData, TOKEN_KEY, {
    expiresIn: TOKEN_EXPIRY,
  });
  res.cookie("jwt", token, {
    //security  options
    httpOnly: true,
    secure: NODE_ENV !== "developement",
    sameSite: "strict",
    domain: COOKIE_DOMAIN,
    maxAge: 30 * 24 * 60 * 1000,
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
