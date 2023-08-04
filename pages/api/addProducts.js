// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import connectDB from "../../Middleware/mongoose";
import Product from "@/Models/Product";

const handler = async(req,res) =>{
    if(req.method === 'POST'){
        // console.log(req.body);
        let arr = req.body;
        // for(let i=0; i<req.body.length; i++){
        await arr.forEach(i =>{
            let p = new Product({
            title : i.title,
            slug : i.slug,
            desc : i.desc,
            img : i.img,
            category : i.category,
            size : i.size,
            color : i.color,
            price : i.price,
            availableQty : i.availableQty 
        })
        p.save().then(e => console.log("product lists is created")).catch(err=> console.log(err))
    })
    res.status(200).json({success: "success"})
    }
    else{
        res.status(400).json({error:"This is method is not valid. Please try 'POST' Method"})
    }
}

export default connectDB(handler)