const app = require("../routes");
const { paginate } = require("../utils/paginate");

const AppointmentHistory = require("../../models").appointment_history;
const Appointment = require("../../models").appointment;
const User = require("../../models").user;
const Doctor = require("../../models").doctor;
const Patient = require("../../models").patient;
const Department = require("../../models").departments;

exports.createAppointmentHistory = async (id, data) => {
  const appointmentHistory = await AppointmentHistory.create({
    appointment_id: id,
    description: data.description,
  });
  return appointmentHistory;
};

exports.getHistoryByDoctorId = async (doctor_id, page, limit) => {
  const appointments = await Appointment.findAll({
    where: { doctor_id },
    attributes: ["id"],
  });
  if (!appointments) {
    throw { code: 404, message: "no appointment data for that doctor" };
  }

  const appointmentIds = appointments.map((appointment) => appointment.id);

  const appointmentHistory = await paginate(
    AppointmentHistory,
    { appointment_id: appointmentIds },
    { exclude: ["createdAt", "updatedAt"] },
    [
      {
        model: Appointment,
        as: "appointment",
        attributes: { exclude: ["createdAt", "updatedAt", "status"] },
        include: [
          {
            model: Patient,
            as: "patient",
            attributes: ["id"],
            include: [
              {
                model: User,
                as: "user",
                attributes: ["name", "email"],
              },
            ],
          },

          {
            model: Doctor,
            as: "doctor",
            attributes: ["id", "department_id"],
            include: [
              {
                model: Department,
                as: "department",
                attributes: ["name"],
              },
              {
                model: User,
                as: "user",
                attributes: ["name", "email"],
              },
            ],
          },
        ],
      },
    ],
    page,
    limit
  );
  return appointmentHistory;
};

exports.getHistoryByPatientId = async (patient_id, page, limit) => {
  const appointments = await Appointment.findAll({
    where: { patient_id },
    attributes: ["id"],
  });

  if (!appointments) {
    throw { code: 404, message: "no appointment data for that patient" };
  }
  const appointmentIds = appointments.map((appointment) => appointment.id);
  const appointmentHistory = await paginate(
    AppointmentHistory,
    { appointment_id: appointmentIds },
    { exclude: ["createdAt", "updatedAt"] },
    [
      {
        model: Appointment,
        as: "appointment",

        attributes: { exclude: ["createdAt", "updatedAt", "status"] },
        include: [
          {
            model: Patient,
            as: "patient",
            attributes: ["id"],
            include: [
              {
                model: User,
                as: "user",
                attributes: ["name", "email"],
              },
            ],
          },

          {
            model: Doctor,
            as: "doctor",
            attributes: ["id", "department_id"],
            include: [
              {
                model: Department,
                as: "department",
                attributes: ["name"],
              },
              {
                model: User,
                as: "user",
                attributes: ["name", "email"],
              },
            ],
          },
        ],
      },
    ],
    page,
    limit
  );
  return appointmentHistory;
};
