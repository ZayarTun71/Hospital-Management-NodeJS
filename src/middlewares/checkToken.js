const { errorResponse } = require("./../utils/response");
const { verifyAccessToken, parseToken } = require("./../utils/accessToken");
exports.checkToken = async (req, res, next) => {
  const startTime = Date.now();
  try {
    if (
      !(
        req.headers &&
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
      )
    ) {
      return errorResponse(req, res, 401, "Unauthorized", startTime);
    }
    await verifyAccessToken(parseToken(req.headers.authorization));

    return next();
  } catch (err) {
    return errorResponse(req, res, err.code, err.message, startTime);
  }
};
