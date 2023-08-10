"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class doctor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      doctor.belongsTo(models.user, {
        foreignKey: "user_id",
        as: "user",
        onDelete: "CASCADE",
      });
      doctor.belongsTo(models.departments, {
        foreignKey: "department_id",
        as: "department",
        onDelete: "CASCADE",
      });
      doctor.hasMany(models.degree, {
        foreignKey: "doctor_id",
        as: "degree",
        onDelete: "CASCADE",
      });

      doctor.hasMany(models.appointment, {
        foreignKey: "doctor_id",
        as: "doctor",
        onDelete: "CASCADE",
      });

      doctor.hasMany(models.schedule, {
        foreignKey: "doctor_id",
        as: "schedules",
        onDelete: "CASCADE",
      });
    }
  }
  doctor.init(
    {
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      experience: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      department_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "departments",
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "doctor",
      timestamps: true,
      paranoid: true,
      deletedAt: "deletedAt",
    }
  );
  return doctor;
};
