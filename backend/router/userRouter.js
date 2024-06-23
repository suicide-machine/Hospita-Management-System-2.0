import express from "express"
import {
  login,
  logoutPatient,
  patientRegister,
} from "../controller/user.controller.js"
import { isPatient } from "../middleware/auth.js"

const router = express.Router()

router.post("/patient/register", patientRegister)
router.post("/login", login)
router.get("/patient/logout", isPatient, logoutPatient)

export default router
