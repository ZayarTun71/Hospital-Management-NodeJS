const { scheduleSchema } = require("../jsonSchema/schedule");
const {
  getSchedule,
  createSchedule,
  updateSchedule,
  deleteSchedule,
} = require("../services/schedule");
const { Validator } = require("jsonschema");
const validator = new Validator();
const {
  validationErrors,
  successResponse,
  errorResponse,
} = require("../utils/response");
exports.getSchedule = async (req, res, next) => {
  const startTime = Date.now();

  try {
    const doctor_id = req.params.id;
    if (!doctor_id) {
      return errorResponse(req, res, 400, "doctor ID is required", startTime);
    }
    const schedule = await getSchedule(doctor_id);
    return successResponse(
      req,
      res,
      200,
      schedule,
      `${schedule.length} schedule times got successfully`,
      startTime,
      schedule.length
    );
  } catch (err) {
    return errorResponse(req, res, err.code, err.message, startTime);
  }
};

exports.createSchedule = async (req, res, next) => {
  const startTime = Date.now();
  try {
    const doctor_id = req.params.id;
    if (!doctor_id) {
      return errorResponse(req, res, 400, "doctor ID is required", startTime);
    }
    const data = validator.validate(req.body, scheduleSchema);
    if (!data.valid) {
      const errors = validationErrors(data);
      return errorResponse(req, res, 400, errors, startTime);
    }

    const schedule = await createSchedule(doctor_id, data.instance);
    return successResponse(
      req,
      res,
      201,
      schedule,
      "Schedule created successfully",
      startTime,
      schedule.length
    );
  } catch (err) {
    return errorResponse(req, res, err.code, err.message, startTime);
  }
};

exports.updateSchedule = async (req, res, next) => {
  const startTime = Date.now();
  try {
    const id = req.params.id;

    if (!id) {
      return errorResponse(req, res, 400, "Schedule ID is required", startTime);
    }

    const data = validator.validate(req.body, scheduleSchema);

    if (!data.valid) {
      const errors = validationErrors(data);
      return errorResponse(req, res, 400, errors, startTime);
    }

    const updatedSchedule = await updateSchedule(data.instance, id);

    return successResponse(
      req,
      res,
      200,
      updatedSchedule,
      "Schedule updated successfully",
      startTime
    );
  } catch (err) {
    return errorResponse(req, res, err.code, err.message, startTime);
  }
};

exports.deleteSchedule = async (req, res, next) => {
  const startTime = Date.now();

  try {
    const id = req.params.id;
    if (!id) {
      return errorResponse(req, res, 400, "Schedule ID is required", startTime);
    }
    const schedule = await deleteSchedule(id);

    return successResponse(
      req,
      res,
      200,
      schedule,
      "Schedule deleted successfully",
      startTime,
      schedule.length
    );
  } catch (err) {
    return errorResponse(req, res, err.code, err.message, startTime);
  }
};
