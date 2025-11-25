import { ApiError } from "../utils/apiError.js"; 
import Vendor from "../models/vendor.model.js";




// Register vendor
const registerVendor = async (req, res, next) => {
  try {
    const user = req.user;
    const {vendor_name,address,phone_number  } = req.body;

    

    if(!vendor_name || !address || !phone_number){
      throw new ApiError(400,"All field are required");
    }


    // Create new vendor
    const vendor = await Vendor.create({
      vendor_name,
      address,
      phone_number,
      userId : user.id
    });

    console.log(vendor,"vendor")
    console.log(user,"req.user")

    return res.status(201).json({
      message: "User registered successfully",
      vendor: {
        id: vendor.id,
        vendor_name: vendor.vendor_name,
        address : vendor.address,
        phone_number: vendor.phone_number,
      },
    });
  } catch (error) {
    next(error);
  }
};



export {registerVendor}