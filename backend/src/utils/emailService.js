import User from "../models/user.model.js";
import { ApiError } from "./apiError.js";
import nodemailer from "nodemailer";


export const generateOtp = async (userId) => {
  const otp = Math.floor(100000 + Math.random() * 900000); 
  const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); 

  const user = await User.findByPk(userId);
  if (!user) {
    throw new ApiError(404, "User not found");
  }

  user.otp = otp;
  user.otpExpiry = otpExpiry;
  await user.save();

  await sendOtpEmail(user.email, otp);

  return otp;
};


const sendOtpEmail = async (email, otp) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER, 
      pass: process.env.EMAIL_PASS, 
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Your OTP Code",
    text: `Your OTP code is ${otp}. It is valid for 10 minutes.`,
  };

  await transporter.sendMail(mailOptions);
};
