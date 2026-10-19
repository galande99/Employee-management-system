

const Employee = require("../models/Employee")


// get all employees


const  getEmployee =async(req,res)=>{
    try{

        const {search, status} = req.query;

        const filter = {};

        if(search){
            filter.$or = [
                {
                    name:{
                        $regex:search,
                        $options:"i" ,              
                    },
                },
                {
                    email:{
                        $regex:search,
                        $options:"i",
                    }
                }
            ]
        }


        if(status) {
            filter.employmentStatus = status;
        }


        const employees = await Employee.find(filter);

        res.status(200).json({
            employees,
        });
    }catch(error){
        console.error("get employee error:",error);

        res.status(500).json({
            message:"server error",
        });
    }
}


// add employess


const createEmployee = async(req,res)=>{
    try{
        const{
            name,email,phone,designation,employmentStatus,
        } = req.body;


        if(!name || !email || !phone || !designation){
            return res.status(400).json({
                message:"Name ,email, phone , designation are required",
            });
        }

        const existingEmployee = await Employee.findOne({email})

        if(existingEmployee){
            return res.status(400).json({
                message:"Employee with this email already exists",
            });
        }

        const employee = await Employee.create({
            name,email,phone, designation,employmentStatus,
        });

        res.status(201).json({
            message:"employee created successfully",
            employee,
        });
    }catch(error){
        console.error("create employee error:", error);

        res.status(500).json({
            message:"server error",
        });
    }
}


// get single employee

const getEmployeeById = async(req,res)=>{
    try{
        const employee= await Employee.findById(req.params.id);

        if(!employee){
            return res.status(400).json({
                message:"Employee not found",
            });
        }

        res.status(200).json({
            employee,
        });
    }catch(error){
        console.error("Get emoloyee error:",error);

        res.status(500).json({
            message:"server error",
        });
    }
}


// update Employee 

const updateEmployee = async(req,res)=>{
    try{
       const { name,email,phone,designation,employmentStatus,} = req.body

       const employee = await Employee.findById(req.params.id);

       if(!employee){
        return res.status(404).json({
            message:"employee not found",
        });
       }

       employee.name = name;
       employee.email = email;
       employee.phone =  phone;
       employee.designation = designation;
       employee.employmentStatus = employmentStatus


       await employee.save();

       res.status(200).json({
        message:"employee updated successfully",
        employee,
       })
    } catch(error){
        console.error("update employee error",error);

        res.status(500).json({
            message:"server error"
        });
    };
}



//  delete Employee 

const deleteEmployee = async(req,res)=>{
    try{
        const employee = await Employee.findByIdAndDelete(req.params.id);

        if (!employee){
            return res.status(404).json({
                message:"employee not found",
            });
        }
      
        res.status(200).json({
            message:"Employee deleted succssfully",
        });
    }catch(error){
        console.error("delete eployee error:",error);

        res.status(500).json({
            message:"server error",
        })
    }
}



module.exports = {
    getEmployee,
    createEmployee,
    getEmployeeById,
    updateEmployee,
    deleteEmployee,
};

