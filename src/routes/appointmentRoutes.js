const express =require("express");

const appointment_router=express.Router();

const appointmentController = require("../controllers/AppointmentController")

appointment_router.get('/appointment',appointmentController.getAllAppointment);

appointment_router.post('/appointment',appointmentController.appointmentCreate);

appointment_router.get('/appointment/:id',appointmentController.getAppointmentById);

appointment_router.put('/appointment/:id',appointmentController.updateAppointmentStatus);

module.exports =appointment_router;