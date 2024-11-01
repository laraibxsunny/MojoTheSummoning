const { Model, DataTypes } = require("sequelize");
const { db } = require("../db/config.js");

class Card extends Model {}

Card.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: DataTypes.TEXT,
    mojo: DataTypes.INTEGER,
    stamina: DataTypes.INTEGER,
    imgURL: DataTypes.TEXT,
  },
  {
    sequelize: db,
  }
);

module.exports = {
  Card,
};
