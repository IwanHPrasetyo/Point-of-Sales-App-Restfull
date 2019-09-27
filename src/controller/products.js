const productModel = require("../models/products");
const uuidv1 = require("uuid/v1");
const mv = require("mv");
const conn = require("../configs/db");
const fs = require("fs");

module.exports = {
  getProduct: (req, res) => {
    var { name, limit, page, sortBy, sortType } = req.query;

    name = typeof name !== "undefined" ? name : "";
    page = typeof page !== "undefined" ? page : 0;
    limit = typeof limit !== "undefined" ? limit : 10;
    sortBy = typeof sortBy !== "undefined" ? sortBy : "qty";
    sortType = typeof sortType !== "undefined" ? sortType : "ASC";

    productModel
      .getProducts(name, limit, page, sortBy, sortType)
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

  getProductbyName: (req, res) => {
    productModel
      .getProductsbyName(req.params.name)
      .then(resultQuery => {
        res.json({
          status: 200,
          message: "Get data by name success",
          data: resultQuery
        });
      })
      .catch(err => {
        console.log(err);
        res.json({
          status: 500,
          message: "Get data by name Fail"
        });
      });
  },

  getProductSort: (req, res) => {
    productModel
      .getProductSort(req.params.data)
      .then(resultQuery => {
        res.json({
          status: 500,
          message: "Sort data success",
          data: resultQuery
        });
      })
      .catch(err => {
        res.json({
          status: 500,
          message: "Sort data fail"
        });
      });
  },

  addProduct: (req, res) => {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send("no file uploaded");
    }
    let img = req.files.image;
    let filetype = img.mimetype;
    var type = "";

    if (
      filetype !== "image/png" &&
      filetype !== "image/gif" &&
      filetype !== "image/jpeg"
    ) {
      return res.status(400).send("format image not support");
    }

    if (filetype == "image/png") {
      type = "png";
    }
    if (filetype == "image/gif") {
      type = "gif";
    }
    if (filetype == "image/jpeg") {
      type = "jpeg";
    }

    var id = Math.floor(Math.random() * 10) + 4;
    let picture = "img-" + Date.now() + "-" + id + "." + type;

    img.mv("public/images/" + picture, err => {
      if (err) {
        return res.status(500).send(err);
        res.send("Sukses upload");
      }
    });

    var str = "";
    var id_product = uuidv1(null, str, 15);

    var time = new Date();
    var day = String(time.getDate()).padStart(2, "0");
    var month = String(time.getMonth() + 1).padStart(2, "0");
    var year = time.getFullYear();
    var datenow = year + "-" + month + "-" + day;

    date_add = datenow;
    date_update = datenow;

    const { name, id_category, description, price, qty } = req.body;
    const data = {
      id_product,
      name,
      description,
      picture,
      id_category,
      price,
      date_add,
      date_update,
      qty
    };
    const qtyp = qty;

    productModel
      .addProduct(data, qtyp)
      .then(resultQuery => {
        res.json({
          status: 500,
          message: "Add data success",
          data: resultQuery
        });
      })
      .catch(err => {
        console.log(err);
        res.json({
          status: 500,
          message: "Add data fail"
        });
      });
  },

  reduceProduct: (req, res) => {
    const { name, qty } = req.body;
    const data = { name, qty };

    productModel
      .reduceProduct(data)
      .then(resultQuery => {
        res.json({
          status: 500,
          message: "Reduce data success",
          data: resultQuery
        });
      })
      .catch(err => {
        console.log(err);
        res.json({
          status: 500,
          message: "Reduce data fail"
        });
      });
  },

  updateProduct: (req, res) => {
    const { id } = req.params;
    var time = new Date();
    var day = String(time.getDate()).padStart(2, "0");
    var month = String(time.getMonth() + 1).padStart(2, "0");
    var year = time.getFullYear();
    var datenow = year + "-" + month + "-" + day;
    date_update = datenow;
    var data;
    const { name, id_category, price, description, qty } = req.body;

    if (!req.files || Object.keys(req.files).length === 0) {
      return res.send("no file uploaded");
      data = { name, id_category, price, date_update, description, qty };
    } else {

        conn.query(
            "SELECT * from product where id_product=?",
            [id],
            (errr, resu) => {
              const [pct] = resu;
    
              if (!errr) {
                fs.unlink("public/images/" + pct.picture, ero => {
                  if (ero) throw ero;
                  console.log("delete file success");
                });
              } else {
                console.log("delete file fail");
              }
            }
          );

      let img = req.files.image;
      let filetype = img.mimetype;
      var type = "";

      if (
        filetype !== "image/png" &&
        filetype !== "image/gif" &&
        filetype !== "image/jpeg"
      ) {
        return res.status(400).send("format image not support");
      }

      if (filetype == "image/png") {
        type = "png";
      }
      if (filetype == "image/gif") {
        type = "gif";
      }
      if (filetype == "image/jpeg") {
        type = "jpeg";
      }

      var id_picture = Math.floor(Math.random() * 10) + 4;
      let picture = "img-" + Date.now() + "-" + id_picture + "." + type;

      img.mv("public/images/" + picture, err => {
        if (err) {
          return res.status(500).send(err);
          res.send("Sukses upload");
        }
      });

      ///batas
      data = {
        name,
        id_category,
        price,
        picture,
        date_update,
        description,
        qty
      };
    }

    productModel
      .updateProduct([data, id])
      .then(resultQuery => {
        res.json({
          status: 200,
          message: "Update data success",
          data: resultQuery
        });
      })
      .catch(err => {
        res.json({
          status: 500,
          status: "Error"
        });
      });
  },

  deleteProduct: (req, res) => {
    productModel
      .deleteProduct(req.params.id)

      .then(resultQuery => {
        res.json({
          status: 200,
          message: "Delete data success",
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
