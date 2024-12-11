import express from "express";
import { addDoctor , allDoctors, loginAdmin } from "../controllers/adminController.js";
import upload from "../middleware/multer.js";
import authadmin from "../middleware/authAdmin.js";
import { changeAvailablity } from "../controllers/doctorController.js";

const adminRouter = express.Router()

adminRouter.post('/add-doctor',authadmin,upload.single('image') ,addDoctor)
adminRouter.post('/login', loginAdmin)
adminRouter.post('/all-doctors', authadmin ,allDoctors)
adminRouter.post('/change-availablity', authadmin ,changeAvailablity)
 
export default adminRouter  