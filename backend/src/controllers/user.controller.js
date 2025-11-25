import User from "../models/user.model.js";
import { ApiError } from "../utils/apiError.js"; 
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/apiResponse.js";
import jwt from "jsonwebtoken";
import { deleteCloudinaryImage, uploadCloudinary } from "../utils/cloudinary.js";
import { generateOtp } from "../utils/emailService.js";


const generateAccessAndRefereshTokens = async (userId) => {
  try {
    const user = await User.findByPk(userId);

    if (!user) {
      throw new ApiError(404, "User not found");
    }

    
    const accessToken = await user.generateAccessToken();
    const refreshToken = await user.generateRefreshToken();

    
    user.refreshToken = refreshToken;
    await user.save({ validate: false }); 

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(500, "Something went wrong while generating refresh and access token");
  }
};

// Register User
const registerUser = async (req, res, next) => {
  try {
    const { displayName, email, password, confirmPassword, phoneNumber } = req.body;

    if ([email, password, confirmPassword].some((field) => field.trim() === "")) {
      throw new ApiError(400, "All fields are required");
    }

    if (password !== confirmPassword) {
      throw new ApiError(400, "Password and confirm password must match");
    }

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      throw new ApiError(409, "User with this email already exists");
    }

    // Create new user
    const user = await User.create({
      displayName,
      email,
      passwordHash: password, 
      phoneNumber,
    });

    return res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user.id,
        displayName: user.displayName,
        email: user.email,
      },
    });
  } catch (error) {
    next(error);
  }
};



// Login User
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body)

  if (!email || !password) {
    throw new ApiError(400, "Email and password are required");
  }

  const user = await User.findOne({ where: { email } });
  if (!user) {
    throw new ApiError(404, "User does not exist");
  }

  const isPasswordValid = await user.isPasswordCorrect(password);
  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid Password!");
  }

  const { accessToken, refreshToken } = await generateAccessAndRefereshTokens(user.id);

  const loggedInUser = await User.findByPk(user.id, {
    attributes: { exclude: ['passwordHash', 'refreshToken'] }
  });

  const options = {
    httpOnly: true,
    secure: true, 
    sameSite: "strict",
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(200, { user: loggedInUser}, "User logged in successfully")
    );
});

// Refresh Access Token
const refreshAccessToken = asyncHandler(async (req, res) => {
  
  const incomingRefreshToken =  req.cookies.refreshToken || req.body.refreshToken;

  if (!incomingRefreshToken) {
    throw new ApiError(401, "Unauthorized request");
  }
  
  try {
    const decodedToken =   jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET);
    const user = await User.findByPk(decodedToken?.id);
    
    if (!user || incomingRefreshToken !== user.refreshToken) {
      throw new ApiError(401, "Invalid refresh token");
    }
    const userWithoutSensitiveData = user.toJSON();
    delete userWithoutSensitiveData.passwordHash;
    delete userWithoutSensitiveData.refreshToken;

    const { accessToken, refreshToken } = await generateAccessAndRefereshTokens(user.id);
    const options = {
      httpOnly: true,
      secure: true
  }
    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
      .json(
        new ApiResponse(200, {user:userWithoutSensitiveData}, "Token refreshed successfully")
      );
  } catch (error) {
    throw new ApiError(401, error.message || "Invalid refresh token");
  }
});

// Logout User
const logoutUser = asyncHandler(async (req, res) => {
  await User.update(
    { refreshToken: null },  
    { where: { id: req.user.id } } 
  );

  const options = {
    httpOnly: true,
    secure: true, 
    sameSite: "strict", 
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logged out"));
});




const updateUser = asyncHandler(async (req, res) => {
  const userId = req.user;
  const { displayName, email, phoneNumber } = req.body;

  // Find the user in the database
  const user = await User.findOne({ where: { id: userId.id } });
  
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const profileImageLocalPath = req.file?.path;

  let profileImage, newPublicId;

  // Check if there is a new profile image
  if (profileImageLocalPath) {
    // Upload the new image to Cloudinary
    profileImage = await uploadCloudinary(profileImageLocalPath);

    if (!profileImage) {
      throw new ApiError(400, "Error while uploading to Cloudinary");
    }

    // Store the new public_id from Cloudinary
    newPublicId = profileImage.public_id;

    // Only delete the old image if the new one has been successfully uploaded
    if (user.imagePublicId) {
      const deleteResponse = await deleteCloudinaryImage(user.imagePublicId);
      if (deleteResponse.result !== 'ok') {
        console.error("Error deleting old image from Cloudinary:", deleteResponse);
        // Optionally handle this error further, like sending an alert or logging it
      }
    }
  }

  // Update the user fields
  user.displayName = displayName || user.displayName;
  user.email = email || user.email;
  user.phoneNumber = phoneNumber || user.phoneNumber;

  // Update the image URL and publicId if a new image was uploaded
  if (profileImage) {
    user.image = profileImage.url;
    user.imagePublicId = newPublicId;
  }

  // Save the updated user in the database
  await user.save();

  // Send the updated user data in the response
  return res.status(200).json({
    message: "User updated successfully",
    user: {
      id: user.id,
      displayName: user.displayName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      image: user.image,
      imagePublicId: user.imagePublicId,
    },
  });
});

// Generate OTP
 const generateOtpController = asyncHandler(async (req, res) => {
  console.log(req.body)
  const { userId } = req.body;
  
  if (!userId) {
    throw new ApiError(400, "User ID is required");
  }

  await generateOtp(userId); 

  res.status(200).json(new ApiResponse(200, {}, "OTP generated and sent to email"));
});

// Verify OTP
 const verifyOtpController = asyncHandler(async (req, res) => {
 
  const { otp, userId } = req.body;
  if (!userId || !otp) {
    throw new ApiError(400, "User ID and OTP are required");
  }

  const user = await User.findByPk(userId, {
    attributes: { exclude: ['passwordHash', 'refreshToken'] }
  });

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  if (user.otp !== otp || user.otpExpiry < new Date()) {
    throw new ApiError(400, "Invalid or expired OTP");
  }

  
  user.otp = null;
  user.otpExpiry = null;
  user.isVerified = true;
  await user.save();
  

  res.status(200).json(new ApiResponse(200, {user}, "OTP verified successfully"));
});




export { registerUser, loginUser, refreshAccessToken, logoutUser ,updateUser,generateOtpController,verifyOtpController};
