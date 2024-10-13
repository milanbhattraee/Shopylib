import User from "../models/user.model.js";
import { ApiError } from "../utils/apiError.js"; 
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/apiResponse.js";
import jwt from "jsonwebtoken"


const generateAccessAndRefereshTokens = async(userId) =>{
    
  try {
      const user = await User.findByPk(userId)
      const accessToken = await user.generateAccessToken()
      const refreshToken = await user.generateRefreshToken()
      
      user.refreshToken = refreshToken;
      await user.save({ validate: false })

      
      return {accessToken, refreshToken}


  } catch (error) {
      throw new ApiError(500, "Something went wrong while generating referesh and access token")
  }
}

const registerUser = async (req, res, next) => {
  try {
    const { displayName, email, password, confirmPassword, phoneNumber } =
      req.body;

    if (
      [email, password, confirmPassword].some((field) => field.trim() === "")
    ) {
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
      passwordHash: password, // The hook will hash the password
      phoneNumber,
    });

  ``
    // await user.save({ validate: false });

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

const loginUser = asyncHandler(async (req, res) =>{


  const {email, password} = req.body
  

  if ( !email) {
      throw new ApiError(400, "email is required")
  }
  


 
  const user = await User.findOne({ where: {email} });

  if (!user) {
      throw new ApiError(404, "User does not exist")
  }
  

 const isPasswordValid = await user.isPasswordCorrect(password)

 if (!isPasswordValid) {
  throw new ApiError(401, "Invalid user credentials")
  }

 const {accessToken, refreshToken} = await generateAccessAndRefereshTokens(user.id)

 const loggedInUser = await User.findByPk(user.id, {
  attributes: { exclude: ['password', 'refreshToken'] }
});
  const options = {
      httpOnly: true,
      secure: true
  }

  return res
  .status(200)
  .cookie("accessToken", accessToken, options)
  .cookie("refreshToken", refreshToken, options)
  .json(
      new ApiResponse(
          200, 
          {
              user: loggedInUser, accessToken, refreshToken
          },
          "User logged In Successfully"
      )
  )

})

const refreshAccessToken = asyncHandler(async (req, res) => {
  const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken
  
  
  if (!incomingRefreshToken) {
      throw new ApiError(401, "unauthorized request")
  }

  try {
      const decodedToken = jwt.verify(
          incomingRefreshToken,
          process.env.REFRESH_TOKEN_SECRET
      )
  
      const user = await User.findByPk(decodedToken?.id);
  
      if (!user) {
          throw new ApiError(401, "Invalid refresh token")
      }

      if (incomingRefreshToken !== user?.refreshToken) {
          throw new ApiError(401, "Refresh token is expired or used")
          
      }

      return res
      .status(200)
      .json(
          new ApiResponse(
              200, 
              user.id,
              "user is authorize"
          )
      )
  } catch (error) {
      throw new ApiError(401, error?.message || "Invalid refresh token")
  }

})

const logoutUser = asyncHandler(async (req, res) => {
   console.log(req.user)
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




export { registerUser , loginUser, refreshAccessToken,logoutUser };
