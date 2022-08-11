import express from "express"
import { UserRouter } from "./Routes/auth.js"
import mongoose from "mongoose"
import dotenv from "dotenv"
// import bodyParser from "body-parser"
dotenv.config({
    path: "./config.env"
})

const PORT = process.env.PORT
const app = express()

mongoose.connect(process.env.DB)

app.use(express.json())
app.use("/api/user", UserRouter)
app.listen(PORT, () => {
    console.log(`The app is running on http://localhost:${PORT}`)
})