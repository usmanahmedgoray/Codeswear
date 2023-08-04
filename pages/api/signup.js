import User from "@/Models/User";
import connectDB from "@/Middleware/mongoose";
const bcrypt = require('bcrypt');

const handler = async(req,res) =>{
    if(req.method === 'POST'){
    try {
        //  Destructuring the request body
            const {name,email,password} = req.body;
            // Password Encrypt
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(password, salt);
            // Send data to Database
            let u = await new User({name,email,password:hash});
            // Save data in database
            await u.save();
        res.status(200).json({success: "true"})
        }
     catch (error) {
        res.status(400).json({success:"false", msg:"Please enter the correct unique credentials"})
    }
}
    else{
        res.status(400).json({error:"This is method is not valid. Please try 'POST' Method"})
    }
}

export default connectDB(handler)