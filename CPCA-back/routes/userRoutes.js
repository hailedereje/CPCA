import express from "express";

import multer from "multer";
import { authenticate, isAdmin } from "../middlewares/authenticate.js";

import {
  editUserProfile,
  getUserProfile,
  userLogin,
  userLogout,
  userRegister,
  getAllUsers,
  createInstructor
} from "../controllers/userController.js";
import { imageStorage } from "../config/multerConfig.js";
const router = express.Router();


const upload = multer({ storage: imageStorage });

router.route("/register").post(userRegister);
router.route("/login").post(userLogin);
router.use(authenticate);
router.route("/all").get(getAllUsers);
router
  .route("/profile")
  .get(getUserProfile)
  .patch( editUserProfile);
router.route("/logout").post(userLogout);
router.use(isAdmin)
router.route("/create-instructor").post(createInstructor);

export default router;
