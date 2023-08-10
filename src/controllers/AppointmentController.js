const { appointmentSchema } = require("../jsonSchema/appointment");
const {
  getAllAppointment,
  appointmentCreate,
  getAppointmentById,
  updateAppointmentStatus,
} = require("../services/appointment");
const {
  successResponse,
  errorResponse,
  validationErrors,
} = require("../utils/response");

const upload = require("../utils/imageUpload");

const { Validator } = require("jsonschema");
const validator = new Validator();

exports.getAllAppointment = async (req, res) => {
  const date = Date.now();
  try {
    const appointment = await getAllAppointment();
    return successResponse(
      req,
      res,
      200,
      appointment,
      "Appointment created successfully",
      date,
      appointment.length
    );
  } catch (err) {
    return errorResponse(req, res, err.code, err.message, date);
  }
};

exports.getAppointmentById = async (req, res) => {
  const date = Date.now();

  try {
    const id = parseInt(req.params.id);
    const appointment = await getAppointmentById(id);
    return successResponse(
      req,
      res,
      200,
      appointment,
      "Appointment created successfully",
      date,
      1
    );
  } catch (err) {
    return errorResponse(req, res, err.code, err.message, date);
  }
};

exports.appointmentCreate = async (req, res, next) => {
  const date = Date.now();
  
  upload(req, res, async function (err) {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Failed to upload image" });
    }
    try {
      // const validation = validator.validate(req.body, appointmentSchema);
      // if (!validation.valid) {
      //   const errors = validationErrors(validation);
      //   return errorResponse(req, res, 400, errors, date);
      // }
      const appointment = await appointmentCreate(
        req.body,
        req.files
      );

      return successResponse(
        req,
        res,
        200,
        appointment,
        "Appointment created successfully",
        date,
        1
      );
    } catch (err) {
      return errorResponse(req, res, err.code, err.message, date);
    }
  });
};

exports.updateAppointmentStatus = async (req, res, next) => {
  const date = Date.now();
  try {
    const id = parseInt(req.params.id);
    const data = req.body;

    const appointment = await updateAppointmentStatus(id, data);
    return successResponse(
      req,
      res,
      200,
      appointment,
      "Appointment created successfully",
      date,
      1
    );
  } catch (err) {
    return errorResponse(req, res, err.code, err.message, date);
  }
};
