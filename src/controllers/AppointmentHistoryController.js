const {
  appointmentHistorySchema,
} = require("../jsonSchema/appointment_histroy");
const {
  createAppointmentHistory,
  getHistoryByDoctorId,
  getHistoryByPatientId,
} = require("../services/appointment_history");
const {
  successResponse,
  errorResponse,
  validationErrors,
} = require("../utils/response");
const { Validator } = require("jsonschema");
const validator = new Validator();

exports.createAppointment_history = async (req, res, next) => {
  const startTime = Date.now();
  try {
    const id = req.params.id;
    if (!id) {
      return errorResponse(
        req,
        res,
        400,
        "Appointment ID is required",
        startTime
      );
    }
    const data = validator.validate(req.body, appointmentHistorySchema);
    if (!data.valid) {
      const errors = validationErrors(data);
      return errorResponse(req, res, 400, errors, startTime);
    }

    const appointment_history = await createAppointmentHistory(
      id,
      data.instance
    );
    return successResponse(
      req,
      res,
      201,
      appointment_history,
      "Appointment History  created successfully",
      startTime,
      1
    );
  } catch (err) {
    return errorResponse(req, res, err.code, err.message, startTime);
  }
};

exports.getHistoryByDoctorId = async (req, res, next) => {
  const startTime = Date.now();
  try {
    const doctor_id = req.params.id;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    if (!doctor_id) {
      return errorResponse(req, res, 400, "Doctor ID is required", startTime);
    }
    const appointment_history = await getHistoryByDoctorId(
      doctor_id,
      page,
      limit
    );
    return successResponse(
      req,
      res,
      200,
      appointment_history,
      "Appointment History  retrieved successfully",
      startTime,
      appointment_history.length
    );
  } catch (err) {
    return errorResponse(req, res, err.code, err.message, startTime);
  }
};

exports.getHistoryByPatientId = async (req, res, next) => {
  const startTime = Date.now();
  try {
    const patient_id = req.params.id;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    if (!patient_id) {
      return errorResponse(req, res, 400, "Patient ID is required", startTime);
    }
    const appointment_history = await getHistoryByPatientId(
      patient_id,
      page,
      limit
    );
    return successResponse(
      req,
      res,
      200,
      appointment_history,
      "Appointment History  retrieved successfully",
      startTime,
      appointment_history.length
    );
  } catch (err) {
    return errorResponse(req, res, err.code, err.message, startTime);
  }
};
