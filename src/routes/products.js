const express = require("express");
const Route = express.Router();
const cors = require("cors");
const middleware = require("../auth/middleware");

var corsOptions = {
  origin: ["*"],
  AllowMethods: "'OPTIONS,POST,GET,DELETE'",
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};

const productController = require("../controller/products");

Route
  .get("/", cors(), productController.getProduct)
  .post(
    "/reduce",
    cors(),
    middleware.checkToken,
    productController.reduceProduct
  )
  .post("/add", cors(), productController.addProduct)
  .patch(
    "/update/:id",
    cors(),
    middleware.checkToken,
    productController.updateProduct
  )
  .delete("/delete", productController.deleteProduct);

module.exports = Route;
