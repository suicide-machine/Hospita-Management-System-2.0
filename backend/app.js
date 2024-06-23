import express from "express"
import { config } from "dotenv"
import cookieParser from "cookie-parser"
import cors from "cors"
import fileUpload from "express-fileupload"
import dotenv from "dotenv"
import { customError } from "./middleware/error.js"

const app = express()

dotenv.config()

app.use(
  cors({
    origin: [process.env.FRONTEND_URL_ONE, process.env.FRONTEND_URL_TWO],
    method: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
  })
)

app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
)

import userRouter from "./router/userRouter.js"
import doctorRouter from "./router/doctor.route.js"

app.use("/api/v1/user", userRouter)
app.use("/api/v1/doctor", doctorRouter)

app.use(customError)

export default app
