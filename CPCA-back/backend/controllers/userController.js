import { StatusCodes } from "http-status-codes";
import { User } from "../models/index.js";
import { GenerateJWT } from "../utils/tokenUtilities.js";
import { BadRequestError, NotFoundError } from "../errors/index.js";

const userRegister = async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "Please provide all required fields" });
  }

  // Check if the email is already registered
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "Email already registered" });
  }

  const newUser = await User.create({
    username,
    email,
    password,
    role: "student", // Assuming all registrations are for students by default
  });

  const tokenData = { _id: newUser._id };
  if (newUser) {
    await GenerateJWT(res, tokenData);
    console.log(newUser);
    return res
      .status(StatusCodes.CREATED)
      .json({ msg: "User registered successfully" });
  }
  throw new BadRequestError("Invalid user data");
};
const userLogin = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await user.matchPasswords(password))) {
    await GenerateJWT(res, { _id: user._id });
    return res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
    });
  }
  throw new NotFoundError("Invalid email or password");
};

const userLogout = async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0), //expires right away
  });

  return res.json({ msg: "User LoggedOut" });
};

const getUserProfile = async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    return res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
    });
  }
  throw NotFoundError("User not found");
};

const editUserProfile = async (req, res) => {
  console.log(req.user);
  const user = await User.findById(req.user._id);
  console.log(user);

  if (user) {
    const { username, email, password } = req.body;

    user.username = username || user.username;
    user.email = email || user.email;
    if (password) {
      user.password = password;
    }
    await user.save();
    return res.status(StatusCodes.OK).json(user);
  }
  throw new NotFoundError("User not found");

  // const updatedUser = await User.findByIdAndUpdate(userId, req.body, {
  //   new: true,
  //   runValidators: true,
  // });

  throw new NotFoundError("User not found");
};

const createInstructor = (req, res) => {
  // Your logic to create an instructor
  res.send("Instructor created");
};

export {
  userRegister,
  userLogin,
  getUserProfile,
  editUserProfile,
  createInstructor,
  userLogout,
};
