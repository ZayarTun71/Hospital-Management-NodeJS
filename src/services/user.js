const User = require("../../models").user;
const { sequelize } = require("../../models");
const Patient = require("../../models").patient;
const Admin = require("../../models").admin;
const Doctor = require("../../models").doctor;
const Department = require("../../models").departments;
const Degree = require("../../models").degree;
const bcrypt = require("bcrypt");

exports.createAdmin = async (userData) => {
  const hasedPassword = await bcrypt.hash(userData.password, 10);

  const t = await sequelize.transaction();
  try {
    const user = await User.create(
      {
        ...userData,
        password: hasedPassword,
      },
      { transaction: t }
    );

    await Admin.create(
      {
        user_id: user.id,
      },
      { transaction: t }
    );

    await t.commit();
    return user;
  } catch (error) {
    await t.rollback();
    throw { code: 422, message: "User created unsuccessfully" };
  }
};

exports.createPatient = async (userData) => {
  const hasedPassword = await bcrypt.hash(userData.password, 10);

  const t = await sequelize.transaction();
  try {
    const user = await User.create(
      {
        ...userData,
        password: hasedPassword,
      },
      { transaction: t }
    );

    await Patient.create(
      {
        user_id: user.id,
      },
      { transaction: t }
    );

    await t.commit();
    return user;
  } catch (error) {
    await t.rollback();
    throw { code: 422, message: "User created unsuccessfully" };
  }
};

exports.createDoctor = async (data) => {
  const hashedPassword = await bcrypt.hash(data.password, 10);
  const t = await sequelize.transaction();

  try {
    const user = await User.create(
      {
        ...data,
        password: hashedPassword,
      },
      {
        transaction: t,
      }
    );

    const doctor = await Doctor.create(
      {
        user_id: 1,
        experience: 1,
        department_id: 1,
      },
      { transaction: t }
    );

    if (data.degree_name && Array.isArray(data.degree_name)) {
      // for (const degreeName of data.degree_name) {
      //   console.log(degreeName);
      //   await Degree.create(
      //     {
      //       degree_name: degreeName.name,
      //       doctor_id: doctor.id,
      //     },
      //     { transaction: t }
      //   );
      // }

      const degrees = data.degree_name.map((degreeName) => ({
        degree_name: degreeName,
        doctor_id: 1,
      }));

      await Degree.bulkCreate(degrees, { transaction: t });
    }

    await t.commit();

    return user;
  } catch (error) {
    await t.rollback();
    throw { code: 422, message: "User created unsuccessfully" };
  }
};

exports.getAllUsers = async () => {
  const users = await User.findAll();
  return users;
};

exports.getUserById = async (id) => {
  const user = await User.findOne({
    attributes: ["id", "name", "email"],
    where: { id },
  });
  if (!user) {
    throw { code: 404, message: "User not found" };
  }

  return user;
};

exports.updateUser = async (id, data) => {
  const user = await User.findOne({
    where: { id },
  });

  if (!user) {
    throw { code: 404, message: "User not found" };
  }
  const newUser = await user.update(data);
  return newUser;
};

exports.deleteUser = async (id) => {
  const user = await User.findOne({
    where: { id },
    include: ["patients", "admins"],
  });

  if (!user) {
    throw { code: 404, message: "User not found" };
  }

  await user.destroy();

  if (user.patients) {
    await user.patients.destroy();
  }

  if (user.admins) {
    await user.admins.destroy();
  }

  return user;
};

exports.getDoctorById = async (id) => {
  const doctor = await Doctor.findOne({
    where: { id },
    include: [
      {
        model: User,
        as: "user",
      },
      {
        model: Degree,
        as: "degree",
      },
      {
        model: Department,
        as: "department",
      },
    ],
  });

  return doctor;
};

exports.getPatientById = async (id) => {
  const patient = await Patient.findOne({
    where: { id },
    attributes: { exclude: ["createdAt", "updatedAt", "deletedAt"] },
    include: [
      {
        model: User,
        as: "user",
        attributes: { exclude: ["createdAt", "updatedAt", "deletedAt"] },
      },
    ],
  });
  console.log("getPatientById", id);
  return patient;
};

exports.getAdminById = async (id) => {
  const admin = await Admin.findOne({
    where: { id },
    attributes: { exclude: ["createdAt", "updatedAt", "deletedAt"] },
    include: [
      {
        model: User,
        as: "user",
        attributes: { exclude: ["createdAt", "updatedAt", "deletedAt"] },
      },
    ],
  });

  return admin;
};
