const express = require("express");
const Route = express.Router();
const cors = require("cors");
const userController = require("../controller/users");
const middleware = require("../auth/middleware");

var corsOptions = {
  origin: ["*"],
  AllowMethods: "'OPTIONS,POST,GET,DELETE'",
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};

Route.post("/login", cors(), userController.login)
  .post("/register", cors(), userController.addUser)
  .get("/", middleware.checkToken, userController.getUsers);

module.exports = Route;
