exports.validationErrors = (data) => {
  const errorArray = data.errors.map((error) => {
    return { [error.argument]: error.message };
  });
  return errorArray;
};

exports.successResponse = (
  req,
  res,
  code = 200,
  data = [],
  message,
  startTime
) => {
  const meta = {
    method: req.method,
    endpoint: req.originalUrl,
  };

  const responseData = {
    success: 1,
    code,
    meta,
    data,
    message,
    duration: parseFloat((Date.now() - startTime) / 1000).toFixed(3),
  };

  return res.status(code).json(responseData);
};

exports.errorResponse = (req, res, code = 400, errors, startTime) => {
  const meta = {
    method: req.method,
    endpoint: req.originalUrl,
  };
  const responseData = {
    success: 0,
    code,
    meta,
    errors,
    duration: parseFloat((Date.now() - startTime) / 1000).toFixed(3),
  };
  return res.status(code).json(responseData);
};
