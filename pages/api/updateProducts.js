import Product from "@/Models/Product";
import connectDB from "../../Middleware/mongoose";

const handler = async(req,res) =>{
    if(req.method === 'POST'){
        // console.log(req.body);
        let arr = req.body;
        // for(let i=0; i<req.body.length; i++){
        await arr.forEach(i =>{
            let p =  Product.findByIdAndUpdate(i._id,i)
            p.then(e => console.log(e)).catch(err => console.log(err) )
    })
    res.status(200).json({success: "success"})
    }
    else{
        res.status(400).json({error:"This is method is not valid. Please try 'POST' Method"})
    }
}

export default connectDB(handler)