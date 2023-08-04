const mongoose = require('mongoose');

const connectDB = handler =>async(req,res)=>{
    if(mongoose.connections[0].readyState){
        console.log('Connection is already established');
        return handler(req,res)
    }
    
    console.log('Connection is newly established');
    await mongoose.connect(process.env.Mongo_URL);
    return handler(req,res)
}

export default connectDB;