const categoryModel = require("../models/categories");
const uuidv1 = require("uuid/v1");

module.exports = {
  //Get All Ctegories
  getCategory: (req, res) => {
    categoryModel
      .getCategory()
      .then(resultQuery => {
        res.json({
          status: 200,
          message: "Show data success",
          data: resultQuery
        });
      })
      .catch(err => {
        console.log(err);
        res.json({
          status: 400,
          message: "Show data fail"
        });
      });
  },

  //Add data categories

  addCategory: (req, res) => {
    var datenow = new Date();
    date_add = datenow;
    date_update = datenow;
    const str = "";
    const id_category = uuidv1(null, str, 15);

    const { name } = req.body;
    const data = { id_category, name, date_add, date_update };
    categoryModel
      .addCategory(data)
      .then(resultQuery => {
        res.json({
          status: 500,
          message: "Add category success",
          data: resultQuery
        });
      })
      .catch(err => {
        res.json({
          status: 500,
          message: "Add category fail"
        });
      });
  },

  updateCategory: (req, res) => {
    const id = req.params.id;
    const id_category = id;
    const date = new Date();
    const date_update = date;
    const { name } = req.body;
    const data = { id_category, name, date_update };

    categoryModel
      .updateCategory(data)
      .then(resultQuery => {
        res.json({
          status: 200,
          message: "Update category success",
          data: resultQuery
        });
      })
      .catch(err => {
        res.json({
          status: 500,
          message: "Update category fail"
        });
      });
  },

  deleteProduct: (req, res) => {
    const { id_category } = req.query;

    categoryModel
      .deleteCategory(id_category)
      .then(resultQuery => {
        res.json({
          status: 200,
          message: "Delete success",
          data: resultQuery
        });
      })
      .catch(err => {
        res.json({
          status: 500,
          message: "Delete data fail"
        });
      });
  }
};
