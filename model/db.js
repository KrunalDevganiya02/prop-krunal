const { Sequelize } = require("sequelize");

// Replace with your MySQL Workbench credentials
const sequelize = new Sequelize("prop", "root", "2002", {
  host: "localhost",
  dialect: "mysql",
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection to MySQL has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

module.exports = sequelize;
