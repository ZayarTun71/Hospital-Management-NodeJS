"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class appointment_history extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      appointment_history.belongsTo(models.appointment, {
        foreignKey: "appointment_id",
        as: "appointment",
      });
    }
  }
  appointment_history.init(
    {
      appointment_id: DataTypes.INTEGER,
      description: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "appointment_history",
    }
  );
  return appointment_history;
};
