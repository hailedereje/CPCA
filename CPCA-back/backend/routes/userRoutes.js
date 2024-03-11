import express from "express";

import { authenticate, isAdmin } from "../middlewares/authenticate.js";
import { createInstructor, editUserProfile, getUserProfile, userLogin, userLogout, userRegister } from "../controllers/userController.js";
const router = express.Router();

router.route("/register").post(userRegister);
router.route("/login").post(userLogin);
router.route("/profile").get(authenticate, getUserProfile).put(authenticate, editUserProfile);
router.route('/logout').post(userLogout)

router.route("/createInstructor").post(isAdmin, createInstructor);

export default router;
