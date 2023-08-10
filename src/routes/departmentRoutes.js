const express =require("express");

const department_router=express.Router();

const departmentController = require("../controllers/departmentController")

department_router.get('/department',departmentController.getAllDepartment);

department_router.post('/department',departmentController.createDepartment);

department_router.get('/department/:id',departmentController.getDepartmentById);

department_router.put('/department/:id',departmentController.updateDepartment);

department_router.delete('/department/:id',departmentController.deleteDepartment);

module.exports =department_router;