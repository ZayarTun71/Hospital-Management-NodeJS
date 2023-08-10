"use strict";
const { Model } = require("sequelize");
const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
module.exports = (sequelize, DataTypes) => {
  class schedule extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      schedule.belongsTo(models.doctor, {
        foreignKey: "doctor_id",
        as: "schedules",
        onDelete: "CASCADE",
      });
    }
  }
  schedule.init(
    {
      doctor_id: DataTypes.INTEGER,
      day: {
        type: DataTypes.ENUM,
        values: DAYS,
        allowNull: false,
      },
      time_from: {
        type: DataTypes.TIME,
        allowNull: false,
        defaultValue: null,
      },
      time_to: {
        type: DataTypes.TIME,
        allowNull: false,
        defaultValue: null,
      },
      patient_count: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: null,
      },
      limit: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: null,
      },
      deletedAt: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: null,
      },
    },
    {
      sequelize,
      modelName: "schedule",
      tableName: "schedules",
      paranoid: true,
      timestamps: true,
    }
  );
  return schedule;
};
module.exports.DAYS = DAYS;
