const { DataTypes } = require("sequelize");
const sequelize = require("./db");

const Balance = sequelize.define(
  "Balance",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    balance: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0.0,
    },
  },
  { timestamps: true }
);

module.exports = Balance;
