"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class patient extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      patient.belongsTo(models.user, {
        foreignKey: "user_id",
        as: "user",
        onDelete: "CASCADE",
      });

      patient.hasMany(models.appointment, {
        foreignKey: "patient_id",
        as: "patient",
        onDelete: "CASCADE",
      });
    }
  }
  patient.init(
    {
      user_id: DataTypes.INTEGER,
      deletedAt: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: null,
      },
    },
    {
      sequelize,
      modelName: "patient",
      tableName: "patients",
      paranoid: true,
      timestamps: true,
    }
  );
  return patient;
};
