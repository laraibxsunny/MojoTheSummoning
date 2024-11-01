const { Model, DataTypes } = require("sequelize");
const { db } = require("../db/config.js");

class User extends Model {}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: DataTypes.TEXT,
  },
  {
    sequelize: db,
  }
);

module.exports = {
  User,
};
