import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { registerVendor } from "../controllers/vendor.controller.js";


const router = Router();

 

router.route("/register-vendor").post(
    verifyJWT,
    registerVendor
);

export default router;   
