const { Sequelize } = require("sequelize");
require('dotenv').config(); // Load environment variables

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    logging: false,
  }
);

sequelize
  .authenticate()
  .then(() => console.log("Connection established successfully."))
  .catch((err) => console.error("Unable to connect to the database:", err));

module.exports = sequelize;
