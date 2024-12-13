import express from "express";
import { addDoctor , allDoctors, loginAdmin , appointmentsAdmin } from "../controllers/adminController.js";
import upload from "../middleware/multer.js";
import authadmin from "../middleware/authAdmin.js";
import { changeAvailablity } from "../controllers/doctorController.js";
import { appointmentCancel , adminDashboard } from "../controllers/adminController.js";

const adminRouter = express.Router()

adminRouter.post('/add-doctor',authadmin,upload.single('image') ,addDoctor)
adminRouter.post('/login', loginAdmin)
adminRouter.post('/all-doctors', authadmin ,allDoctors)
adminRouter.post('/change-availablity', authadmin ,changeAvailablity)
adminRouter.get('/appointments', authadmin ,appointmentsAdmin)
adminRouter.post('/cancel-appointment', authadmin ,appointmentCancel)
adminRouter.get('/dashboard',authadmin , adminDashboard)

export default adminRouter  