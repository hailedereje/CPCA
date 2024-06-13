import { UnautorizedError } from "../errors/index.js";
import User from "../models/user.js";
import { ValidateJWT } from "../utils/tokenUtilities.js";

const authenticate = async (req, res, next) => {
  const payload = await ValidateJWT(req, res);
  console.log("authenticated");
  req.user = payload;
  next();
};

const studentCheck = async (req, res, next) => {
  const user = await User.findById(req.user._id);
  if (!user || user.role !== "student") {
    throw new UnautorizedError(
      "Access denied: Only students access"
    );
  }
  next();
};

const isAdmin = async (req, res, next) => {
  const user = await User.findById(req.user._id);
  if (!user || !user.isAdmin) {
    throw new UnautorizedError("Access denied: Admin role required");
  }
  next();
};

const isInstructor = async (req, res, next) => {
  const user = await User.findById(req.user._id);
  if (!user || !user.isInstructor) {
    throw new UnautorizedError("Access denied: Instructor role required");
  }
  next();
};

export { authenticate, isAdmin, isInstructor, studentCheck };
