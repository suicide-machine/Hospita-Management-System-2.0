import mongoose from "mongoose"

const doctorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "First Name Is Required!"],
  },
  doctorDepartment: {
    type: String,
  },
  docAvatar: {
    public_id: String,
    url: String,
  },
  phoneNumber: {
    type: Number,
    required: [true, "Phone Is Required!"],
    minLength: [10, "Phone Number Must Contain Exact 11 Digits!"],
    maxLength: [10, "Phone Number Must Contain Exact 11 Digits!"],
  },
  license: {
    type: String,
    required: [true, "license Is Required!"],
    minLength: [6, "license Must Contain Only 13 Digits!"],
    maxLength: [6, "license Must Contain Only 13 Digits!"],
  },

  gender: {
    type: String,
    required: [true, "Gender Is Required!"],
    enum: ["Male", "Female"],
  },

  createdAt: {
    type: Date,
    default: Date.now(),
  },
})

const Doctor = mongoose.model("Doctor", doctorSchema)

export default Doctor
