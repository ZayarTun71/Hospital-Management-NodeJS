const express = require("express");

const image_router = express.Router();

const imageController = require("../controllers/ImageController");

image_router.delete("/appointment/image/:id", imageController.deleteImage);

module.exports = image_router;
