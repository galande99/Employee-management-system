const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({

    name:{
        type:String,
        required:true,
        trim:true,
    },

    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
    },

    phone:{
        type:Number,
        required:true,
        trim:true,
    },

    designation:{
       type:String,
       required:true,
       trim:true,
    },
    employmentStatus:{
        type:String,
        enum:["Active","Inactive"],
        default:"Active"
    },

},{
    timestamps:true,
}

)

const Employee = mongoose.model("Employee",employeeSchema);

module.exports = Employee;