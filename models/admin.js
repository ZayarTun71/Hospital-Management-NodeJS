"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class admin extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      admin.belongsTo(models.user, {
        foreignKey: "user_id",
        as: "admins",
        onDelete: "CASCADE",
      });
    }
  }
  admin.init(
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
      modelName: "admin",
      tableName: "admins",
      paranoid: true,
      timestamps: true,
    }
  );
  return admin;
};
