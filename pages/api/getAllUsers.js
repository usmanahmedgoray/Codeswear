import User from "@/Models/User";
import connectDB from "@/Middleware/mongoose";

const handler = async(req,res) =>{
    if(req.method === 'GET'){
    try {
            let allUsers = await User.find({});
        res.status(200).json({success: allUsers})
        }
     catch (error) {
        res.status(400).json("OOPs! We got an error")
    }
}
    else{
        res.status(400).json({error:"This is method is not valid. Please try 'POST' Method"})
    }
}

export default connectDB(handler)