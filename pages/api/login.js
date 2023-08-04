import User from "@/Models/User";
import connectDB from "@/Middleware/mongoose";
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const handler = async (req, res) => {
    if (req.method === 'POST') {
        try {
            let user = await User.findOne({ "email": req.body.email })
            if (user) {
                if (req.body.email === user.email && bcrypt.compare(req.body.password, user.password)) {
                    let token = jwt.sign({ name: user.name, email: user.email }, 'jwtsecret',{ expiresIn: '2d' });
                    res.status(200).json({ success: "true", token })
                }
                else {
                    res.status(200).json({ success: "false", error: "Invalid Credentaials" })
                }
            }
            else {
                res.status(404).json({ success: "false", error: "User not found" })
            }
        }
        catch (error) {
            res.status(400).json({ success: "false", error: error })
        }
    }
    else {
        res.status(400).json({ error: "This is method is not valid. Please try 'POST' Method" })
    }
}

export default connectDB(handler)