import User from "../models/user.model.js"
import { catchAsyncErrors } from "./catchAsyncErrors.js"
import ErrorHandler from "./error.js"
import jwt from "jsonwebtoken"

// Middleware to authenticate admin
export const isAdmin = catchAsyncErrors(async (req, res, next) => {
  const token = req.cookies.adminToken
  console.log(token)

  if (!token) {
    return next(new ErrorHandler("Please login to continue", 401))
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRETY_KEY)
  //   console.log(decoded)

  req.user = await User.findById(decoded.id)

  if (req.user.role !== "Admin") {
    return next(
      new ErrorHandler(
        `${req.user.role} not authorized for this resource!`,
        403
      )
    )
  }

  next()
})

// Middleware to authenticate  users
export const isPatient = catchAsyncErrors(async (req, res, next) => {
  const token = req.cookies.patientToken
  if (!token) {
    return next(new ErrorHandler("User is not authenticated!", 400))
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRETY_KEY)

  req.user = await User.findById(decoded.id)

  if (req.user.role !== "Patient") {
    return next(
      new ErrorHandler(
        `${req.user.role} not authorized for this resource!`,
        403
      )
    )
  }
  next()
})
