import { catchAsyncErrors } from "../middleware/catchAsyncErrors.js"
import ErrorHandler from "../middleware/error.js"
import User from "../models/user.model.js"
import bcrypt from "bcrypt"
import { jwtToken } from "../utils/jwtToken.js"

// Patient Register Api Route
export const patientRegister = catchAsyncErrors(async (req, res, next) => {
  const { firstName, lastName, email, phoneNumber, dob, gender, password } =
    req.body

  if (
    !firstName ||
    !lastName ||
    !email ||
    !phoneNumber ||
    !dob ||
    !gender ||
    !password
  ) {
    return next(new ErrorHandler("Please Fill All The Fields", 400))
  }

  const isRegistered = await User.findOne({ email })

  if (isRegistered) {
    return next(new ErrorHandler("User already Registered!", 400))
  }

  const hashedPassword = bcrypt.hashSync(password, 10)

  const newUser = await User({
    firstName,
    lastName,
    email,
    phoneNumber,
    dob,
    gender,
    password: hashedPassword,
    role: "Patient",
  })

  try {
    await newUser.save()
    jwtToken(newUser, "User Registered!", 201, res)
  } catch (error) {
    next(error)
  }
})

// Patient & Admin Register Api Route
export const login = catchAsyncErrors(async (req, res, next) => {
  const { email, password, role } = req.body

  if (!email || !password || !role) {
    return next(new ErrorHandler("Please Fill All the  Fields!", 400))
  }

  const validUser = await User.findOne({ email }).select("+password")

  if (!validUser) {
    return next(new ErrorHandler("User Not Found!", 404))
  }

  const validPassword = bcrypt.compareSync(password, validUser.password)

  if (!validPassword) {
    return next(new ErrorHandler("Wrong Credentials", 401))
  }

  if (role !== validUser.role) {
    return next(new ErrorHandler(`User Not Found With This Role!`, 404))
  }

  jwtToken(validUser, "Login Successfull!", 200, res)
})

// Logout function for admin
export const adminLogout = catchAsyncErrors(async (req, res, next) => {
  res
    .status(200)
    .cookie("adminToken", null, {
      httpOnly: true,
      expires: new Date(Date.now()),
    })
    .json({
      success: true,
      message: "Admin Logged Out Successfully.",
    })
})

// Logout function for patient
export const logoutPatient = catchAsyncErrors(async (req, res, next) => {
  res
    .status(200)
    .cookie("patientToken", null, {
      httpOnly: true,
      expires: new Date(Date.now()),
    })
    .json({
      success: true,
      message: "Patient Logged Out Successfully.",
    })
})
