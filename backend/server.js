import app from "./app.js"
import connectDatabase from "./db/Database.js"
import cloudinary from "cloudinary"

// Handling uncaught Exception
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`)
  console.log(`Shutting down the server for handling uncaught exception`)
})

// connect db
connectDatabase()

// create server
const server = app.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`)
})

// cloudinary setup
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

// unhandled promise rejection
process.on("unhandledRejection", (err) => {
  console.log(`Shutting down the server for ${err.message}`)
  console.log(`Shutting down the server for unhandled promise rejection`)

  server.close(() => {
    process.exit(1)
  })
})
