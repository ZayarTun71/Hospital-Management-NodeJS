"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class departments extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      departments.hasMany(models.doctor, {
        foreignKey: "department_id",
        as: "department",
        onDelete: "CASCADE",
      });
    }
  }
  departments.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "departments",
      timestamps: true,
      paranoid: true,
      deletedAt: "deletedAt",
    }
  );
  return departments;
};
