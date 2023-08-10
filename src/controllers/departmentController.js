const departmentService = require("../services/departmentService");

const { successResponse, errorResponse, validationErrors } = require("../utils/response");

const { Validator } = require("jsonschema");
const validator = new Validator();
const { departmentSchema } = require("../jsonSchema/department");

exports.getAllDepartment = async (req, res) => {
  const startTime = Date.now();
  try {
    const department = await departmentService.getAllDepartment();

    return successResponse(
      req,
      res,
      200,
      department,
      `${department.length} records found.`,
      startTime,
      department.length
    );
  } catch (error) {
    return errorResponse(req, res, error.code, error.message, startTime);
  }
};

exports.createDepartment = async (req, res) => {
  const startTime = Date.now();
  try {
    const validation = validator.validate(req.body, departmentSchema);
    if (!validation.valid) {
     const errors = validationErrors(validation);
     return errorResponse(req, res, 400, errors, startTime);
    }

    const { name } = req.body;
    const newDepartment = await departmentService.createDepartment(name);
    return successResponse(
      req,
      res,
      200,
      newDepartment,
      `Department created successfully`,
      startTime,
      newDepartment.length
    );
  } catch (error) {
    return errorResponse(req, res, error.code, error.message, startTime);
  }
};

exports.getDepartmentById = async (req, res) => {
  const startTime = Date.now();
  try {
    const id = parseInt(req.params.id);
    const department = await departmentService.getDepartmentById(id);
    return successResponse(
      req,
      res,
      200,
      department,
      `Department successfully found.`,
      startTime,
      department.length
    );
  } catch (error) {
    return errorResponse(req, res, error.code, error.message, startTime);
  }
};

exports.updateDepartment = async (req, res) => {
  const startTime = Date.now();
  try {
    const id = parseInt(req.params.id);
    const { name } = req.body;

    const department = await departmentService.updateDepartment({ id, name });

    return successResponse(
      req,
      res,
      200,
      department,
      `Department updated successfully`,
      startTime,
      department.length
    );
  } catch (error) {
    return errorResponse(req, res, error.code, error.message, startTime);
  }
};

exports.deleteDepartment = async (req, res) => {
  const startTime = Date.now();
  try {
    const id = parseInt(req.params.id);

    const department = await departmentService.deleteDepartment(id);

    return successResponse(
      req,
      res,
      200,
      department,
      `Department deleted successfully`,
      startTime,
      department.length
    );
  } catch (error) {
    return errorResponse(req, res, error.code, error.message, startTime);
  }
};
