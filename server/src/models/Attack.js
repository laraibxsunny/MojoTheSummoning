const { Model, DataTypes } = require("sequelize");
const { db } = require("../db/config.js");

class Attack extends Model {}

Attack.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: DataTypes.TEXT,
    mojoCost: DataTypes.INTEGER,
    staminaCost: DataTypes.INTEGER,
  },
  {
    sequelize: db,
  }
);

module.exports = {
  Attack,
};
