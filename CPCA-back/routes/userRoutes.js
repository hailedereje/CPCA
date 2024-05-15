import express from "express";

import multer from "multer";
import { authenticate, isAdmin } from "../middlewares/authenticate.js";

import {
  editUserProfile,
  getUserProfile,
  userLogin,
  userLogout,
  userRegister,
  getAllInstructors,
  getAllStudents
} from "../controllers/userController.js";
import { imageStorage } from "../config/multerConfig.js";
const router = express.Router();


const upload = multer({ storage: imageStorage });

router.route("/register").post(userRegister);
router.route("/login").post(userLogin);
router.use(authenticate);
router.route("/instructors").get(getAllInstructors);
router.route("/students").get(getAllStudents);
router
  .route("/profile")
  .get(getUserProfile)
  .patch(upload.single("profileImg"), editUserProfile);
router.route("/logout").post(userLogout);

export default router;
