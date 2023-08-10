const {deleteImage} = require("../services/image");
const { successResponse, errorResponse, validationErrors } = require("../utils/response");

exports.deleteImage = async (req, res) => {
    const startTime = Date.now();
    try {
      const id = parseInt(req.params.id);
  
      const image = await deleteImage(id);
  
      return successResponse(
        req,
        res,
        200,
        image,
        `Image deleted successfully`,
        startTime,
        1
      );
    } catch (error) {
      return errorResponse(req, res, error.code, error.message, startTime);
    }
  };
