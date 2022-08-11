import userSchema from "../Models/user.js";
import CryptoJS from "crypto-js";
class AuthController {
    encyPass(password) {
        const encryptedPass = CryptoJS.AES.encrypt(password, process.env.PASS_SECRET).toString()
        return encryptedPass;
    }
    decyPass(password) {
        const pass = CryptoJS.AES.decrypt(password, process.env.PASS_SECRET).toString(CryptoJS.enc.Utf8)
        return pass;
    }

    register(data) {
        let jsonResponse;
        return new Promise(
            (resolve, reject) => {
                const user = new userSchema({...data, password: this.encyPass(data.password) })
                user.save()
                    .then(
                        () => {
                            jsonResponse = {
                                msg: "Registration success",
                                status: 1
                            }
                            resolve(jsonResponse)
                        }
                    )
                    .catch(
                        (error) => {
                            console.log(error)
                            jsonResponse = {
                                msg: "Unable to register the user",
                                status: 0
                            }
                            resolve(jsonResponse)
                        }
                    )

            }
        )
    }
    async login(data) {
        const user = await userSchema.findOne({ email: data.email })

        if (user !== null) {
            const password = this.decyPass(user.password); // db password
            if (password == data.password) {
                return {
                    msg: "Login success",
                    user: {...user._doc, password: data.password },
                    status: 1
                }
            } else {
                return {
                    msg: "Invalid credentails",
                    status: 0
                };
            }
        }
        return {
            msg: "Invalid credentails",
            status: 0
        };


    }
}

export { AuthController }