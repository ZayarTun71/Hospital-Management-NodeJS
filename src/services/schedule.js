const Schedule = require("./../../models").schedule;

const dayNumber = {
  Sun: 0,
  Mon: 1,
  Tue: 2,
  Wed: 3,
  Thu: 4,
  Fri: 5,
  Sat: 6,
};

const dateFormat = (time) => {
  const date = new Date(time);
  const year = date.getFullYear().toString();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  return `${year}-${month}-${day}`;
};

exports.getSchedule = async (doctor_id) => {
  const schedules = await Schedule.findAll({ where: { doctor_id } });
  if (schedules.length === 0) {
    throw { code: 404, message: "Doctor not found" };
  }
  const today = new Date();
  const startDay = new Date(today);

  const scheduleData = schedules.map((schedule) => {
    const requiredDay = dayNumber[schedule.dataValues.day];

    const endDay = new Date(startDay);
    endDay.setDate(startDay.getDate() + schedule.dataValues.limit * 7);

    let currentDay = new Date(startDay);
    const dates = [];

    while (currentDay <= endDay) {
      if (currentDay.getDay() === requiredDay) {
        dates.push({
          date: dateFormat(currentDay),
          availabe_count: 5,
          booking_count: 5,
          time_from: schedule.dataValues.time_from,
          time_to: schedule.dataValues.time_to,
          patient_count: schedule.dataValues.patient_count,
        });
      }

      currentDay.setDate(currentDay.getDate() + 1);
    }

    return {
      id: schedule.dataValues.id,
      doctor_id: schedule.dataValues.doctor_id,
      day: schedule.dataValues.day,
      dates,
      limit: schedule.dataValues.limit,
    };
  });
  return scheduleData;
};

exports.createSchedule = async (doctor_id, data) => {
  const createdSchedule = await Schedule.create({
    doctor_id: doctor_id,
    day: data.day,
    time_from: data.time_from,
    time_to: data.time_to,
    patient_count: data.patient_count,
    limit: data.limit,
  });

  return createdSchedule;
};

exports.updateSchedule = async (data, id) => {
  const schedule = await Schedule.findOne({
    where: { id },
  });
  if (!schedule) {
    throw { code: 404, message: "schedule id is invalid" };
  }
  const updatedSchedule = await schedule.update(data);

  return updatedSchedule;
};

exports.deleteSchedule = async (id) => {
  const schedule = await Schedule.findOne({
    where: { id },
  });
  if (!schedule) {
    throw { code: 404, message: "schedule id is invalid" };
  }
  const deletedSchedule = await schedule.destroy();

  return deletedSchedule;
};
