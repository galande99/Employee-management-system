
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
const mongoose= require("mongoose");


const User = require("../models/User");


dotenv.config();

const createAdmin = async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI);


        console.log("mongoDB connected");

        const email = "admin@gmail.com";
        const password = "admin123";


        const existingUser = await User.findOne({email});

        if(existingUser){
            console.log("Admin already exist");

            process.exist(0);
        }

        const hashedPassword = await bcrypt.hash(password,10);

        await User.create({
            name:"Admin",
            email,
            password:hashedPassword,
        });

        console.log("Admin created succssfully");
        console.log("Email:",email);
        console.log("password",password)

        process.exit(0);
    }

    catch(error){
        console.error("Error creating admin",error);
        process.exit(1)
    }
}

createAdmin();