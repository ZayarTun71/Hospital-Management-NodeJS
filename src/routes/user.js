const express = require("express");
const router = express.Router();
const UserController = require("./../controllers/UserController");

router.post("/admins", UserController.createAdmin);
router.get("/admins/:id", UserController.getAdminById);
router.post("/patients", UserController.createPatient);
router.get("/patients/:id", UserController.getPatientById);
router.post("/doctors", UserController.createDoctor);
router.get("/doctors/:id", UserController.getDoctorById);
router.get("/", UserController.getAllUsers);
router.get("/:id", UserController.getUserById);
router.put("/:id", UserController.updateUser);
router.delete("/:id", UserController.deleteUser);

module.exports = router;
