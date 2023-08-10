const {
  appointmentNumberGenerate,
} = require("../utils/appointmentNumberGenerate");

const Appointment = require("../../models").appointment;
const Schedule = require("../../models").schedule;
const Doctor = require("../../models").doctor;
const Patient = require("../../models").patient;
const User = require("../../models").user;
const Department = require("../../models").departments;
const Image = require("../../models").images;
const { sequelize } = require("../../models");
const { paginate } = require("../utils/paginate");
const path = require("path");

exports.getAllAppointment = async () => {
  const appointment = await Appointment.findAll();

  const appointmentPaginate = await paginate(
    Appointment,
    {},
    { exclude: ["createdAt", "updatedAt"] },
    [
      {
        model: Doctor,
        as: "doctor",
        attributes: { exclude: ["createdAt", "updatedAt"] },
        include: [
          {
            model: User,
            as: "user",
            attributes: ["name", "date_of_birth", "gender", "phone"],
          },
          {
            model: Department,
            as: "department",
            attributes: ["name"],
          },
        ],
      },
      {
        model: Patient,
        as: "patient",
        attributes: { exclude: ["createdAt", "updatedAt"] },
        include: [
          {
            model: User,
            as: "user",
            attributes: ["name", "date_of_birth", "gender", "phone"],
          },
        ],
      },
      {
        model: Image,
        as: "images",
        attributes: ["image"],
      },
    ],
    1,
    10
  );

  return appointmentPaginate;

};

exports.getAppointmentById = async (id) => {
  const appointment = await Appointment.findByPk(id, {
    attributes: { exclude: ["createdAt", "updatedAt"] },
    include: [
      {
        model: Doctor,
        as: "doctor",
        attributes: { exclude: ["createdAt", "updatedAt"] },
        include: [
          {
            model: User,
            as: "user",
            attributes: ["name", "date_of_birth", "gender", "phone"],
          },
          {
            model: Department,
            as: "department",
            attributes: ["name"],
          },
        ],
      },
      {
        model: Patient,
        as: "patient",
        attributes: { exclude: ["createdAt", "updatedAt"] },
        include: [
          {
            model: User,
            as: "user",
            attributes: ["name", "date_of_birth", "gender", "phone"],
          },
        ],
      },
      {
        model: Image,
        as: "images",
        attributes: ["image"],
      },
    ],
  });

  return appointment;
};

exports.appointmentCreate = async (data, imageFiles) => {
  console.log("data", data);
  console.log("images", imageFiles);
  const appointment_number_generate = appointmentNumberGenerate();
  const t = await sequelize.transaction();

  try {
    const schedule = await Schedule.findOne({
      where: {
        day: data.day,
        doctor_id: data.doctor_id,
      },
    });

    const patient_count = schedule.patient_count;

    const appointmentCount = await Appointment.count({
      where: {
        date: data.date,
        doctor_id: data.doctor_id,
      },
    });

    if (appointmentCount >= patient_count) {
      throw { code: 403, message: "Today appointment limit reached" };
    }

    const appointment = await Appointment.create(
      {
        ...data,
        appointment_number: appointment_number_generate,
        status: "Pending",
      },
      { transaction: t }
    );

    // if (imageFiles && imageFiles.length > 0) {
    //   const imagePromises = imageFiles.map(async (file) => {
    //     const image = await Image.create(
    //       {
    //         image: file.path,
    //         appointment_id: appointment.id,
    //       },
    //       { transaction: t }
    //     );
    //   });

    //   // await Promise.all(imagePromises);
    // }
    if (imageFiles && imageFiles.length > 0) {
      for (const file of imageFiles) {
        await Image.create(
          {
            image: file.filename,
            appointment_id: appointment.id,
          },
          { transaction: t }
        );
      }
    }

    await t.commit();

    return appointment;
  } catch (err) {
    await t.rollback();
    throw { code: 422, message: "Appointment creation unsuccessful" };
  }
};

exports.updateAppointmentStatus = async (id, data) => {
  const appointment = await Appointment.findByPk(id);

  appointment.status = data.status;

  await appointment.save();

  return appointment;
};


