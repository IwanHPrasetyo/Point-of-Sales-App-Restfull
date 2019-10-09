const express = require("express");
const Route = express.Router();

const products = require("./routes/products");
const categories = require("./routes/categories");
const users = require("./routes/users");
const renvenues = require("./routes/revenue");

Route.use("/users", users)
  .use("/products", products)
  .use("/categories", categories)
  .use("/revenues", renvenues);

module.exports = Route;
