import express from "express"
import { isAdmin, isPatient } from "../middleware/auth.js"
import {
  deleteAppointment,
  getAllAppointments,
  newAppointment,
  updateAppointmentStatus,
} from "../controller/appointment.controller.js"

const router = express.Router()

router.post("/new/:id", isPatient, newAppointment)
router.get("/getAll", isAdmin, getAllAppointments)
router.put("/update/:id", isAdmin, updateAppointmentStatus)
router.delete("/delete/:id", isAdmin, deleteAppointment)

export default router
