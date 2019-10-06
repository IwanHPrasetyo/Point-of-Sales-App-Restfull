const express = require("express");
const Route = express.Router();
const cors = require("cors");
const middleware = require("../auth/middleware");

var corsOptions = {
  origin: "http://localhost:5888",
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};

const categoryController = require("../controller/categories");
Route.get("/", cors(), categoryController.getCategory)
  .post(
    "/add",
    cors(corsOptions),
    middleware.checkToken,
    categoryController.addCategory
  )
  .patch(
    "/update/:id",
    cors(corsOptions),
    middleware.checkToken,
    categoryController.updateCategory
  )
  .delete(
    "/delete",
    cors(corsOptions),
    middleware.checkToken,
    categoryController.deleteProduct
  );

module.exports = Route;
