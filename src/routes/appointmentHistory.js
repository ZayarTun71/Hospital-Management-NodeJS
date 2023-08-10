const express = require("express");
const router = express.Router();

const AppointmentHistoryController = require("./../controllers/AppointmentHistoryController");

router.post(
  "/appointment/:id/histories",
  AppointmentHistoryController.createAppointment_history
);
router.get(
  "/doctors/:id/histories",
  AppointmentHistoryController.getHistoryByDoctorId
);
router.get(
  "/patients/:id/histories",
  AppointmentHistoryController.getHistoryByPatientId
);

module.exports = router;
