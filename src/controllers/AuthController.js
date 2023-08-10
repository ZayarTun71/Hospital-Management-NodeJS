const { authSchema } = require("../jsonSchema/auth");
const { loginUser } = require("../services/auth");
const {
  successResponse,
  errorResponse,
  validationErrors,
} = require("../utils/response");
const { Validator } = require("jsonschema");
const validator = new Validator();
exports.loginUser = async (req, res, next) => {
  const startTime = Date.now();
  try {
    const userData = validator.validate(req.body, authSchema);
    if (!userData.valid) {
      const errors = validationErrors(userData);
      return req, res, 400, errors, startTime;
    }
    const user = await loginUser(userData.instance);

    return successResponse(
      req,
      res,
      200,
      user,
      "login successfully",
      startTime,
      1
    );
  } catch (err) {
    return errorResponse(req, res, err.code, err.message, startTime);
  }
};
