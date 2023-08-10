"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      user.hasOne(models.patient, {
        foreignKey: "user_id",
        as: "user",
        onDelete: "CASCADE",
      });
      user.hasOne(models.admin, {
        foreignKey: "user_id",
        as: "admins",
        onDelete: "CASCADE",
      });
      user.hasOne(models.doctor, {
        foreignKey: "user_id",
        as: "doctors",
        onDelete: "CASCADE",
      });
    }
  }
  user.init(
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      address: DataTypes.STRING,
      date_of_birth: DataTypes.DATEONLY,
      gender: DataTypes.STRING,
      phone: DataTypes.STRING,
      deletedAt: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: null,
      },
    },
    {
      sequelize,
      modelName: "user",
      tableName: "users",
      paranoid: true,
      timestamps: true,
    }
  );
  return user;
};
