"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class degree extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      degree.belongsTo(models.doctor, {
        foreignKey: "doctor_id",
        as: "degee",
        onDelete: "CASCADE",
      });
    }
  }
  degree.init(
    {
      degree_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      doctor_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "degree",
    }
  );
  return degree;
};
