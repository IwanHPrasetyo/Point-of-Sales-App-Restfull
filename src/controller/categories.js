const categoryModel = require("../models/categories");
const uuidv1 = require("uuid/v1");
const redis = require("redis");
const client = redis.createClient();
const categoriesRedKey = "user : category";

module.exports = {
  //Get All Ctegories
  getCategory: (req, res) => {
    return client.get(categoriesRedKey, (err, categories) => {
      if (categories) {
        const result = JSON.parse(categories);
        return res.json({
          from: "cache",
          status: 200,
          data: result,
          message: "Show data success"
        });
      } else {
        categoryModel
          .getCategory()
          .then(resultQuery => {
            client.setex(categoriesRedKey, 3600, JSON.stringify(resultQuery));
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
      }
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
        client.del(categoriesRedKey, function(err, replay) {
          console.log(replay);
        });
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
        client.del(categoriesRedKey, function(err, replay) {
          console.log(replay);
        });
        res.json({
          status: 200,
          message: "Update category success"
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
        client.del(categoriesRedKey, function(err, replay) {
          console.log(replay);
        });
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
