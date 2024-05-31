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
  // const payload = await ValidateJWT(req, res);
  const user = await User.findById(payload._id);
  if (!user || user.role !== "student") {
    throw new UnautorizedError(
      "Access denied: Only students can enroll in courses"
    );
  }
  next();
};

const isAdmin = async (req, res, next) => {
  console.log("checking admin role");
  const user = await User.findById(req.user._id);
  console.log(user);
  if (!user || !user.isAdmin) {
    throw new UnautorizedError("Access denied: Admin role required");
  }
  next();
};

const isInstructor = async (req, res, next) => {
  console.log("checking instructor role");
  console.log(req.user);
  const user = await User.findById(req.user._id);
  if (!user || !user.isInstructor) {
    throw new UnautorizedError("Access denied: Instructor role required");
  }
  next();
};

export { authenticate, isAdmin, isInstructor, studentCheck };
