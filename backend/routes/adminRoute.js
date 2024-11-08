import express from "express";
import { addDoctor , loginAdmin } from "../controllers/adminController.js";
import upload from "../middleware/multer.js";
import authadmin from "../middleware/authAdmin.js";

const adminRouter = express.Router()

adminRouter.post('/add-doctor',authadmin,upload.single('image') ,addDoctor)
adminRouter.post('/loginAdmin', loginAdmin)
 
export default adminRouter