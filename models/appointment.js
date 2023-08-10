"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class appointment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      appointment.belongsTo(models.patient, {
        foreignKey: "patient_id",
        as: "patient",
      });

      appointment.belongsTo(models.doctor, {
        foreignKey: "doctor_id",
        as: "doctor",
      });

      appointment.hasMany(models.images, {
        foreignKey: "appointment_id",
        as: "images",
      });
      appointment.hasOne(models.appointment_history, {
        foreignKey: "appointment_id",
        as: "appointment",
      });
    }
  }
  appointment.init(
    {
      appointment_number: DataTypes.STRING,
      patient_id: DataTypes.INTEGER,
      doctor_id: DataTypes.INTEGER,
      date: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      symptom: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      allergy: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "appointment",
    }
  );
  return appointment;
};
