const { Model, DataTypes } = require("sequelize");
const { db } = require("../db/config.js");

class Deck extends Model {}

Deck.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: DataTypes.TEXT,
    xp: DataTypes.INTEGER,
  },
  {
    sequelize: db,
  }
);

module.exports = {
  Deck,
};
