const express = require("express");
const router = express.Router();
const ScheduleController = require("./../controllers/ScheduleController");


router.get("/doctors/:id/schedules", ScheduleController.getSchedule);
router.post("/doctors/:id/schedules", ScheduleController.createSchedule);
router.put("/schedules/:id", ScheduleController.updateSchedule);
router.delete("/schedules/:id", ScheduleController.deleteSchedule);
module.exports = router;
