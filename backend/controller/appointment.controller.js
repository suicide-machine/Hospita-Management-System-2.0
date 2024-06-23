import { catchAsyncErrors } from "../middleware/catchAsyncErrors.js"
import ErrorHandler from "../middleware/error.js"
import { Appointment } from "../models/appointment.model.js"
import Doctor from "../models/doctor.model.js"

export const newAppointment = catchAsyncErrors(async (req, res, next) => {
  const doctor = await Doctor.findById(req.params.id)

  console.log(doctor)

  const {
    firstName,
    lastName,
    email,
    phoneNumber,
    dob,
    gender,
    appointment_date,
    address,
  } = req.body

  if (
    !firstName ||
    !lastName ||
    !email ||
    !phoneNumber ||
    !dob ||
    !gender ||
    !appointment_date ||
    !address
  ) {
    return next(new ErrorHandler("Please Fill All The Fields!", 400))
  }

  //   if (isConflict.length === 0) {
  //     return next(new ErrorHandler("Doctor not found", 404))
  //   }

  //   if (isConflict.length > 1) {
  //     return next(
  //       new ErrorHandler(
  //         "Doctors Conflict! Please Contact Through Email Or Phone!",
  //         400
  //       )
  //     )
  //   }

  //   const doctorId = isConflict[0]._id

  const patientId = req.user._id

  const appointment = await Appointment.create({
    firstName,
    lastName,
    email,
    phoneNumber,
    dob,
    gender,
    appointment_date,
    department: doctor.doctorDepartment,
    doctor: {
      firstName: doctor.firstName,
      lastName: doctor.lastName,
    },
    address,
    doctorId: req.params.id,
    patientId,
  })

  res.status(200).json({
    success: true,
    appointment,
    message: "Appointment Send!",
  })
})

export const getAllAppointments = catchAsyncErrors(async (req, res, next) => {
  const appointments = await Appointment.find()
  res.status(200).json({
    success: true,
    appointments,
  })
})

export const updateAppointmentStatus = catchAsyncErrors(
  async (req, res, next) => {
    const { id } = req.params

    let appointment = await Appointment.findById(id)

    if (!appointment) {
      return next(new ErrorHandler("Appointment not found!", 404))
    }

    appointment = await Appointment.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    })

    res.status(200).json({
      success: true,
      message: "Appointment Status Updated!",
    })
  }
)

export const deleteAppointment = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params
  const appointment = await Appointment.findById(id)
  if (!appointment) {
    return next(new ErrorHandler("Appointment Not Found!", 404))
  }
  await appointment.deleteOne()
  res.status(200).json({
    success: true,
    message: "Appointment Deleted!",
  })
})
