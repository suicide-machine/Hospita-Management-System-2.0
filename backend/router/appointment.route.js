import express from "express"
import { isPatient } from "../middleware/auth.js"
import { newAppointment } from "../controller/appointment.controller.js"

const router = express.Router()

router.post("/post/:id", isPatient, newAppointment)

export default router
