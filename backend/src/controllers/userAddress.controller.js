import User from "../models/user.model.js";
import UserAddress from "../models/userAddress.model.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";


const getUserAddresses = asyncHandler (async (req, res) => {
    const { userId } = req.query;
   
      const addresses = await UserAddress.findAll({ where: { userId } });
     return res.status(200).json(addresses);
    
  });
  
  
  
  const addUserAddress = asyncHandler(async (req, res) => {
    const { userId, contactPhone, address, city, state, zipCode, country } = req.body;

    if (!userId || !contactPhone || !address || !city || !state || !zipCode || !country) {
      return res.status(400).json({ message: 'All fields are required' });
    }
  
    try {
      const user = await User.findByPk(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      const newAddress = await UserAddress.create({ userId, contactPhone, address, city, state, zipCode, country });
      if (!newAddress) {
        throw new ApiError(400, "Something went wrong");
      }
  
      return res.status(200).json(new ApiResponse(200, newAddress, "New Address Added Successfully!"));
    } catch (error) {
      console.error("Error in adding user address:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });
  
  const editUserAddress = asyncHandler(async (req, res) => {
    const { id, userId, contactPhone, address, city, state, zipCode, country } =
      req.body;

    console.log(req.body);
    const userAddress = await UserAddress.findByPk(id);
    console.log(userAddress);

    if (!userAddress) {
      return res.status(404).json({ message: "Address not found" });
    }

    if (userAddress.userId !== userId) {
      return res
        .status(403)
        .json({ message: "Unauthorized to edit this address" });
    }

    userAddress.contactPhone = contactPhone || userAddress.contactPhone;
    userAddress.address = address || userAddress.address;
    userAddress.city = city || userAddress.city;
    userAddress.state = state || userAddress.state;
    userAddress.zipCode = zipCode || userAddress.zipCode;
    userAddress.country = country || userAddress.country;

    await userAddress.save();
    console.log(userAddress);
    return new ApiResponse(
      res.status(200).json({
        message: "Address updated successfully",
        userAddress,
      })
    );
  });

  const removeUserAddress = asyncHandler(async(req,res)=>{
    const {addressId} = req.query;
    if(!addressId){
        throw new ApiError(401,"Address Id not Found!");
    }
    const address = await UserAddress.findByPk(addressId);
    if(!address){
        throw new ApiError(401,"Address Id not Found!");
    }
    await address.destroy();

    return new ApiResponse(
      res.status(200).json({ message: "Address removed successfully" })
    );
  })
  export {addUserAddress,editUserAddress,getUserAddresses,removeUserAddress}