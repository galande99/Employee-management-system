
const express = require("express");

const protect = require("../middlewares/authMiddlewares");
const {getEmployee, createEmployee, getEmployeeById, updateEmployee, deleteEmployee} = require("../controllers/employeeController")

const router = express.Router();


router.get("/", protect, getEmployee);

router.post("/", protect, createEmployee);

router.get("/:id",protect,getEmployeeById);

router.put("/:id",protect,updateEmployee);

router.delete("/:id",protect,deleteEmployee);

module.exports = router;