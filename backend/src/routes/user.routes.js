import { Router } from "express";
import {  generateOtpController, loginUser, logoutUser, refreshAccessToken, registerUser, updateUser, verifyOtpController } from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

 
router.route("/signUp").post(registerUser);
router.route("/login").post(loginUser);
router.route("/refreshToken").get(refreshAccessToken);
router.route("/logout").get(verifyJWT,logoutUser);
router.post("/generate-otp", generateOtpController);
router.post("/verify-otp", verifyOtpController);
router.route("/updateUser").post(
    upload.single("profileImage"),
    verifyJWT,
    updateUser
);

export default router;   
