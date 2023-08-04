// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import connectDB from "../../Middleware/mongoose";
import Product from "@/Models/Product";

const handler = async(req,res) =>{
    let products = await Product.find({category : "Hoodies"})
    let tshirts = {};
    for (let item of products) {
        if (item.title in tshirts) {
            if (!tshirts[item.title].color.includes(item.color) && item.availableQty > 0) {
                tshirts[item.title].color.push(item.color)
            }
            if (!tshirts[item.title].size.includes(item.size) && item.availableQty > 0) {
                tshirts[item.title].size.push(item.size)
            }
        }        
        else{
            tshirts[item.title] = JSON.parse(JSON.stringify(item))
            if (item.availableQty > 0) {
                tshirts[item.title].size = [item.size]
                tshirts[item.title].color = [item.color]

            }
        }
    }
    res.status(200).json({products})
}

export default connectDB(handler)