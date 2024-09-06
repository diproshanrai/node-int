const { Sequelize, DataTypes } = require("sequelize");
const express = require('express');
const app = express();
const port = 3000;

const sequelize = new Sequelize("dummyDB", "root", "namastenode", {
  host: "localhost",
  dialect: "mysql",
});

sequelize
  .authenticate()
  .then(() => console.log("connection established"))
  .catch((err) => console.error("connection failed", err));

sequelize
  .sync()
  .then(() => {
    console.log("tables created and synced");
    // app.listen(port, ()=>{
    //   console.log(" the server is up and good")
    // })
  })
  .catch((err) => console.error("Failed to create table"));

const User = sequelize.define("User", {
  userName: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = User;
