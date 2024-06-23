import express from "express"

import { isAdmin } from "../middleware/auth.js"
import { addNewDoctor, getAllDoctors } from "../controller/doctor.controller.js"

const router = express.Router()

router.post("/addnew", isAdmin, addNewDoctor)
router.get("/doctors", getAllDoctors)

export default router
