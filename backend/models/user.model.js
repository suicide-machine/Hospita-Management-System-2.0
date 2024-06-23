import mongoose from "mongoose"
import validator from "validator"

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "First Name Is Required!"],
  },
  email: {
    type: String,
    required: [true, "Email Is Required!"],
    validate: [validator.isEmail, "Provide A Valid Email!"],
  },
  password: {
    type: String,
    required: [true, "Password Is Required!"],
    minLength: [4, "Password Must Contain At Least 8 Characters!"],
    select: false,
  },
  phoneNumber: {
    type: Number,
    required: [true, "Phone Is Required!"],
    minLength: [10, "Phone Number Must Contain Exact 11 Digits!"],
    maxLength: [10, "Phone Number Must Contain Exact 11 Digits!"],
  },
  role: {
    type: String,
    required: [true, "User Role Required!"],
    enum: ["Patient", "Admin"],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
})

const User = mongoose.model("User", userSchema)

export default User
