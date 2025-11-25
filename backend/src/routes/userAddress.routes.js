import { Router } from "express";
import { addUserAddress, editUserAddress, getUserAddresses, removeUserAddress } from "../controllers/userAddress.controller.js";



const router = Router();

 
router.route("/get").get(getUserAddresses);
router.route("/add").post(addUserAddress);
router.route("/update").post(editUserAddress);
router.route("/remove").delete(removeUserAddress);



export default router;   
 