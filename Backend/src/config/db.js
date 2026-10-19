const mongoose = require("mongoose")


const connectDb= async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI);
        
        console.log("Mongodb conneccted successfully")
    } catch(error){
        console.error("Mongodb connection failed:", error.massage);
        process.exit(1)
    }
}


module.exports = connectDb