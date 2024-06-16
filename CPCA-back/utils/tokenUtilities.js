import jwt from "jsonwebtoken";
import { COOKIE_DOMAIN, NODE_ENV, TOKEN_EXPIRY, TOKEN_KEY } from "../config/constants.js";
import { UnautorizedError } from "../errors/index.js";
const GenerateJWT = async (res, tokenData) => {
  const token = jwt.sign(tokenData, TOKEN_KEY, {
    expiresIn: TOKEN_EXPIRY,
  });

  res.cookie("jwt", token, {
    httpOnly: true, // secure against XSS
    secure: process.env.NODE_ENV !== "development", // ensure HTTPS in production
    sameSite: process.env.NODE_ENV !== "development" ? "None" : "Lax", // Allow cross-origin in production, but restrict in development
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    // domain: process.env.NODE_ENV !== "development" ? 'cpca-front.vercel.app' : "localhost", // Set domain for production, localhost for development
    path: "/", // root path
  });

  // console.log(process.env.COOKIE_DOMAIN)
  console.log('node env', NODE_ENV); 
  console.log('cookie domain', COOKIE_DOMAIN);
  console.log('token expiry', TOKEN_EXPIRY);
  console.log('token key', TOKEN_KEY);
  console.log('token data', tokenData);
  console.log('token', token);
  
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