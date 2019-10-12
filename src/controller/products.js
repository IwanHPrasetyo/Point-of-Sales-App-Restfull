const productModel = require("../models/products");
const uuidv1 = require("uuid/v1");
const mv = require("mv");
const conn = require("../configs/db");
const fs = require("fs");
// var redis = require("redis");
// var client = redis.createClient();

module.exports = {
  //Get All Data Product

  getProduct: (req, res) => {
    var { name, limit, page, sortBy, sortType } = req.query;

    name = typeof name !== "undefined" ? name : "";
    page = typeof page !== "undefined" ? page : 0;
    limit = typeof limit !== "undefined" ? limit : 4;
    sortBy = typeof sortBy !== "undefined" ? sortBy : "name";
    sortType = typeof sortType !== "undefined" ? sortType : "ASC";

    conn.query("Select * from product", (err, result) => {
      if (!err) {
        let pages = result.length;
        if (limit >= pages) {
          pages = 1;
        } else if (pages % limit == 0) {
          pages = pages / limit;
        } else {
          pages = (pages % limit) + 1;
        }

        productModel
          .getProducts(name, limit, page, sortBy, sortType)
          .then(resultQuery => {
            res.json({
              status: 200,
              message: "Show data success",
              total_data: result.length,
              page: pages,
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
      } else {
        console.log("get data fail");
      }
    });
  },

  //Add Product

  addProduct: (req, res) => {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send("no file uploaded");
    }

    let img = req.files.pict;
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

    var datenow = new Date();
    date_add = datenow;
    date_update = datenow;

    const { name, category, description, price, qty } = req.body;
    const data = {
      id_product,
      name,
      description,
      picture,
      price,
      date_add,
      date_update,
      qty
    };
    const category_name = category;
    const qtyp = qty;

    productModel
      .addProduct(data, category_name, qtyp)
      .then(resultQuery => {
        res.json({
          status: 500,
          message: "Add data success",
          data
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

  //Reduce Product

  reduceProduct: (req, res) => {
    const { name, qty, price, email, total_price } = req.body;
    const data = { name, qty, price, email, total_price };
    //console.log(data);

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

  //Update Product

  updateProduct: (req, res) => {
    const id_product = req.params.id;
    const id = id_product;
    var time = new Date();
    const date_update = time;
    const { name, description, id_category, price, qty } = req.body;
    var data;

    if (!req.files || Object.keys(req.files).length === 0) {
      //return res.status(400).send("no file uploaded");
      data = { id_category, name, description, date_update, price, qty };
    } else {
      let img = req.files.picture;
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

      var id_pct = Math.floor(Math.random() * 10) + 4;
      let picture = "img-" + Date.now() + "-" + id_pct + "." + type;

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

      img.mv("public/images/" + picture, err => {
        if (err) {
          return res.status(500).send(err);
          res.send("Sukses gagal upload");
        }
      });

      data = {
        id_category,
        name,
        description,
        date_update,
        picture,
        price,
        qty
      };
    }
    productModel
      .updateProduct(id, data)
      .then(resultQuery => {
        res.json({
          status: 200,
          message: "Update Success"
        });
      })
      .catch(err => {
        console.log(err);
        res.json({
          status: 200,
          message: "Update Fail"
        });
      });

    console.log(id_product);
    console.log(data);
  },

  //Delete Product

  deleteProduct: (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    const { id_product } = req.query;
    productModel
      .deleteProduct(id_product)

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
