import jwt from "jsonwebtoken"

export const jwtToken = (user, message, statusCode, res) => {
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRETY_KEY, {
    expiresIn: process.env.JWT_EXPIRES,
  })

  const token_name = user.role === "Admin" ? "adminToken" : "patientToken"

  res
    .status(statusCode)
    .cookie(token_name, token, {
      expires: new Date(
        Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
    })
    .json({
      success: true,
      message,
      user,
      token,
    })
}
