import { catchAsyncErrors } from "../middleware/catchAsyncErrors.js"
import ErrorHandler from "../middleware/error.js"
import Doctor from "../models/doctor.model.js"
import cloudinary from "cloudinary"

export const addNewDoctor = catchAsyncErrors(async (req, res, next) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return next(new ErrorHandler("Doctor Avatar Required!", 400))
  }

  const { docAvatar } = req.files

  const allowedFormats = ["image/png", "image/jpeg", "image/webp"]

  if (!allowedFormats.includes(docAvatar.mimetype)) {
    return next(new ErrorHandler("File Format Not Supported!", 400))
  }

  const {
    firstName,
    lastName,
    phoneNumber,
    license,
    gender,
    doctorDepartment,
  } = req.body

  if (
    !firstName ||
    !lastName ||
    !phoneNumber ||
    !license ||
    !gender ||
    !doctorDepartment ||
    !docAvatar
  ) {
    return next(new ErrorHandler("Please Fill All The Fields", 400))
  }

  const isRegistered = await Doctor.findOne({ license })

  if (isRegistered) {
    return next(
      new ErrorHandler("Doctor With This License Already Exists!", 400)
    )
  }

  const cloudinaryResponse = await cloudinary.uploader.upload(
    docAvatar.tempFilePath
  )

  if (!cloudinaryResponse || cloudinaryResponse.error) {
    console.error(
      "Cloudinary Error:",
      cloudinaryResponse.error || "Unknown Cloudinary error"
    )
    return next(
      new ErrorHandler("Failed To Upload Doctor Avatar To Cloudinary", 500)
    )
  }

  const doctor = await Doctor.create({
    firstName,
    lastName,
    phoneNumber,
    license,
    gender,
    role: "Doctor",
    doctorDepartment,
    docAvatar: {
      public_id: cloudinaryResponse.public_id,
      url: cloudinaryResponse.secure_url,
    },
  })

  res.status(200).json({
    success: true,
    message: "New Doctor Registered",
    doctor,
  })
})

export const getAllDoctors = catchAsyncErrors(async (req, res, next) => {
  const doctors = await Doctor.find()

  res.status(200).json({
    success: true,
    doctors,
  })
})
