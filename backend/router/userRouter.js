import express from "express"
import {
  getUserDetails,
  login,
  logoutPatient,
  patientRegister,
} from "../controller/user.controller.js"
import { isAdmin, isPatient } from "../middleware/auth.js"

const router = express.Router()

router.post("/patient/register", patientRegister)
router.post("/login", login)
router.get("/patient/logout", isPatient, logoutPatient)
router.get("/patient/me", isPatient, getUserDetails)
router.get("/admin/me", isAdmin, getUserDetails)

export default router
