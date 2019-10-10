const express = require("express");
const Route = express.Router();
const cors = require("cors");
const middleware = require("../auth/middleware");

var whitelist = ["http://localhost:3000", "http://localhost:5000"];
var corsOptions = {
  origin: function(origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  }
};

const productController = require("../controller/products");

Route.get("/", cors(corsOptions), productController.getProduct)
  .post("/reduce", cors(), productController.reduceProduct)
  .post("/add", cors(corsOptions), productController.addProduct)
  .patch(
    "/update/:id",
    cors(),
    middleware.checkToken,
    productController.updateProduct
  )
  .delete("/delete", cors(corsOptions), productController.deleteProduct);

module.exports = Route;
