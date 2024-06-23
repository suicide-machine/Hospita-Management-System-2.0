import mongoose from "mongoose"
import validator from "validator"

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "First Name Is Required!"],
  },
  lastName: {
    type: String,
    required: [true, "Last Name Is Required!"],
  },
  email: {
    type: String,
    required: [true, "Email Is Required!"],
    validate: [validator.isEmail, "Provide A Valid Email!"],
  },
  phoneNumber: {
    type: String,
    required: [true, "Phone Is Required!"],
    minLength: [10, "Phone Number Must Contain Exact 10 Digits!"],
    maxLength: [11, "Phone Number Must Contain Exact 10 Digits!"],
  },
  // license: {
  //   type: String,
  //   required: [true, "license Is Required!"],
  //   minLength: [6, "license Must Contain Only 13 Digits!"],
  //   maxLength: [6, "license Must Contain Only 13 Digits!"],
  // },
  dob: {
    type: Date,
    required: [true, "DOB Is Required!"],
  },
  gender: {
    type: String,
    required: [true, "Gender Is Required!"],
    enum: ["Male", "Female"],
  },
  password: {
    type: String,
    required: [true, "Password Is Required!"],
    minLength: [4, "Password Must Contain At Least 4 Characters!"],
    select: false,
  },
  role: {
    type: String,
    required: [true, "User Role Required!"],
    enum: ["Patient", "Doctor", "Admin"],
  },
  doctorDepartment: {
    type: String,
  },
  docAvatar: {
    public_id: String,
    url: String,
  },
})

const User = mongoose.model("User", userSchema)

export default User
