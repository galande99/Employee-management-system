const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const User = require("../models/User")


// login users

const loginUser = async(req,res)=>{
    try{
        const {email,password} = req.body;

        if(!email || !password){
            return res.status(400).json({
                message:"email and password are required"
            })
        }

        const user = await User.findOne({email})


        if(!user){
            return res.status(401).json({
                message:"Invalid email or password"
            })
        }

        const isPasswordCorrect = await bcrypt.compare(password,user.password)

        if(!isPasswordCorrect){
            return res.status(401).json({
                message:"invalid email or password"
            });
        }


        // create jwt

        const token = jwt.sign({
            userId:user._id},
            process.env.JWT_SECRET,
            {
                expiresIn:"1d"
            }
        )
        
    res.cookie("token",token,{
        httpOnly:true,
        secure:process.env.NODE_ENV === "production",
        sameSite:"lax",
        maxAge: 24 * 60 * 60 * 1000,
    });
    
        res.status(200).json({
            message:"login successful",
            user:{
                id:user._id,
                name:user.name,
                email:user.email,
            },

        })
    }
    catch(error){
        console.error("Login error",error);


        res.status(500).json({
            message:"server error",
        })
    }
}

module.exports = {

    loginUser,
}