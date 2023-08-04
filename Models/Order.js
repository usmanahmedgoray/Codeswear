const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    userId : {
        type : String,
        required : true,
    },
    Products : [{
        productId : {type : String,},
        quantity : {type : Number,default:1}
    }],
    address:{
        type : String,
        required:true
    },
    amount :{
        type:Number,
        required:true
    },
    status:{
        type : String,
        default: 'Pending',
        required: true
    }

},{timestamps:true});

export default mongoose.models.Orders || mongoose.model("Orders", orderSchema)