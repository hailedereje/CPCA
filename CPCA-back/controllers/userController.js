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

  if (newUser) {
    const tokenData = { _id: newUser._id };
    await GenerateJWT(res, tokenData);
    // console.log(newUser);
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
    const jwt = await GenerateJWT(res, { _id: user._id });
    console.log(user.role);
    return res.json({ userId:user._id, user, jwt });
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

// Get a all users
const getAllUsers = async (req, res) => {
  console.log(req.query);
  const { page = 1, search = '', role = '' } = req.query;
  const limit = 5;
  const skip = (page - 1) * limit;

  const query = {
    $or: [
      { username: { $regex: search, $options: 'i' } },
      { email: { $regex: search, $options: 'i' } }
    ],
    ...(role && { role }),
  };

  try {
    const users = await User.find(query).skip(skip).limit(limit)
    const totalUsers = await User.countDocuments(query);
    const totalPages = Math.ceil(totalUsers / limit);

    res.json({ users, totalPages });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching questions' });
  }
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
  const user = await User.findById(req.user._id);
  // console.log(req.body);
  const {username, email, profileImg} = req.body; 
  if (user) {
    const { username, email, password } = req.body;

    user.username = username || user.username;
    user.profileImg = profileImg || user.profileImg;
    // user.password = password || user.password; 
    if (password) {
      user.password = password;
    }
    // Save the updated user
    await user.save();
    console.log(user);
    return res.status(200).json(user);
  }

  return res.status(404).json({ message: "User not found" });
};

const createInstructor = async (req, res) => {
  const { username, email, password } = req.body;

  // check if all fields are field
  if (!username || !email || !password) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "Please provide all required fields" });
  }
  // Check if the email is already registered
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ msg: "Email already registered" });
  }
  // Create the instructor
  const newInstructor = await User.create({
    username,
    email,
    password,
    role: "instructor",
    isInstructor: true,
  });

  if (newInstructor) {
    const tokenData = { _id: newInstructor._id };
    await GenerateJWT(res, tokenData);
    console.log(newInstructor);
    return res
      .status(StatusCodes.CREATED)
      .json({ msg: "Instructor registered successfully" });
  }

  throw new BadRequestError("Invalid user data");
};
export {
  userRegister,
  userLogin,
  getUserProfile,
  editUserProfile,
  createInstructor,
  userLogout,
  getAllUsers
};
