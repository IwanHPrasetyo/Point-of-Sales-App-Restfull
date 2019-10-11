const express = require("express");
const Route = express.Router();
const cors = require("cors");
const middleware = require("../auth/middleware");

const revenueController = require("../controller/revenue");

Route.get("/", cors(), revenueController.getRevenue)
  .get("/by/", cors(), revenueController.getRevenueby)
  .get("/order/", cors(), revenueController.getOrder)
  .get("/income/", cors(), revenueController.getIncome);

module.exports = Route;
