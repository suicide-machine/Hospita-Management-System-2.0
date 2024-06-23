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
