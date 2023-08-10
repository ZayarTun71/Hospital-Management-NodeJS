'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class images extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      images.belongsTo(models.appointment, {
        foreignKey: "appointment_id",
        as: "images",
      });
    }
  }
  images.init({
    image: DataTypes.STRING,
    appointment_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'images',
    timestamps: true,
    paranoid: true,
    deletedAt: "deletedAt",
  });
  return images;
};