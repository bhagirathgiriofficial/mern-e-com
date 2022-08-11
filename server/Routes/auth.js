import express from "express"
import { AuthController } from "../Controllers/authController.js"
const UserRouter = express.Router()

// Registration
UserRouter.post(
    "/register",
    async(req, res) => {
        const result = await new AuthController().register(req.body)
        if (result.status === 1) {
            res.status(201).send(JSON.stringify(result)) //created
        } else {
            res.status(500).send(JSON.stringify(result)) // internal server error
        }
    }
)
UserRouter.post(
    "/login",
    async(req, res) => {
        const result = await new AuthController().login(req.body)
        res.send(JSON.stringify(result))
    }
)

export { UserRouter }