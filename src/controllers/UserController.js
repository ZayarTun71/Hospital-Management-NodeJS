const { userSchema } = require("../jsonSchema/user");
const {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  getAdminById,
  getPatientById,
} = require("../services/user");

const {
  createAdmin,
  createPatient,
  createDoctor,
  getDoctorById,
} = require("../services/user");
const {
  successResponse,
  errorResponse,
  validationErrors,
} = require("../utils/response");

const { Validator } = require("jsonschema");
const validator = new Validator();
const { doctorSchema } = require("../jsonSchema/doctor");
exports.getAllUsers = async (req, res, next) => {
  const startTime = Date.now();
  try {
    const users = await getAllUsers();

    return successResponse(
      req,
      res,
      200,
      users,
      `${users.length} records.`,
      startTime,
      users.length
    );
  } catch (err) {
    return errorResponse(req, res, err.code, err.message, startTime);
  }
};

exports.getUserById = async (req, res, next) => {
  const id = req.params.id;
  const startTime = Date.now();
  try {
    const user = await getUserById(id);

    return successResponse(
      req,
      res,
      200,
      user,
      `${user.length} records.`,
      startTime,
      user.length
    );
  } catch (err) {
    return errorResponse(req, res, err.code, err.message, startTime);
  }
};

exports.updateUser = async (req, res, next) => {
  const id = req.params.id;
  const data = req.body;
  req, res, next;
  const startTime = Date.now();
  try {
    const user = await updateUser(id, data);
    return successResponse(
      req,
      res,
      200,
      user,
      `${user.length} records.`,
      startTime,
      user.length
    );
  } catch (err) {
    return errorResponse(req, res, err.code, err.message, startTime);
  }
};

exports.deleteUser = async (req, res, next) => {
  const id = req.params.id;
  const startTime = Date.now();
  try {
    const user = await deleteUser(id);

    return successResponse(
      req,
      res,
      200,
      user,
      `${user.length} records.`,
      startTime,
      user.length
    );
  } catch (err) {
    return errorResponse(req, res, err.code, err.message, startTime);
  }
};

exports.createAdmin = async (req, res, next) => {
  const startTime = Date.now();
  const data = validator.validate(req.body, userSchema);
  if (!data.valid) {
    const errors = validationErrors(data);
    return errorResponse(req, res, 400, errors, startTime);
  }
  try {
    const user = await createAdmin(data);
    return successResponse(
      req,
      res,
      200,
      user,
      "User created successfully",
      startTime,
      user.length
    );
  } catch (err) {
    return errorResponse(req, res, err.code, err.message, startTime);
  }
};

exports.createPatient = async (req, res, next) => {
  const startTime = Date.now();
  const data = validator.validate(req.body, userSchema);

  if (!data.valid) {
    const errors = validationErrors(data);
    return errorResponse(req, res, 400, errors, startTime);
  }

  try {
    const user = await createPatient(data.instance);
    return successResponse(
      req,
      res,
      200,
      user,
      "User created successfully",
      startTime,
      user.length
    );
  } catch (err) {
    return errorResponse(req, res, err.code, err.message, startTime);
  }
};

exports.createDoctor = async (req, res, next) => {
  const startTime = Date.now();

  try {
    const valitation = validator.validate(req.body, doctorSchema);
    if (!valitation.valid) {
      const errors = validationErrors(valitation);
      return errorResponse(req, res, 400, errors, startTime);
    }
    const data = req.body;

    const user = await createDoctor(valitation.instance);
    return successResponse(
      req,
      res,
      200,
      user,
      "User created successfully",
      startTime,
      1
    );
  } catch (err) {
    return errorResponse(req, res, err.code, err.message, startTime);
  }
};

exports.getDoctorById = async (req, res, next) => {
  const id = req.params.id;
  const startTime = Date.now();
  try {
    const user = await getDoctorById(id);

    return successResponse(req, res, 200, user, `1 records.`, startTime, 1);
  } catch (err) {
    return errorResponse(req, res, err.code, err.message, startTime);
  }
};

exports.getAdminById = async (req, res, next) => {
  const id = req.params.id;
  const startTime = Date.now();
  try {
    const user = await getAdminById(id);

    return successResponse(req, res, 200, user, `1 records.`, startTime, 1);
  } catch (err) {
    return errorResponse(req, res, err.code, err.message, startTime);
  }
};

exports.getPatientById = async (req, res, next) => {
  const id = req.params.id;
  const startTime = Date.now();

  try {
    const user = await getPatientById(id);

    return successResponse(req, res, 200, user, `1 records.`, startTime, 1);
  } catch (err) {
    return errorResponse(req, res, err.code, err.message, startTime);
  }
};
