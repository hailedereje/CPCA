import { ValidateJWT } from "../utils/tokenUtilities.js";

const authenticate = async (req, res, next) => {
  const payload = await ValidateJWT(req, res);
  console.log("authenticated");
  req.user = payload;
  next();
};

const isAdmin = (req, res, next) => {
  console.log("checking admin role");
  next();
};

const isInstructor = (req, res, next) => {
  console.log("checking instructor role");
  next();
};

export { authenticate, isAdmin, isInstructor };
