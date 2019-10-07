const conn = require("../configs/db");
const fs = require("fs");
const redis = require("redis");
const client = redis.createClient();

module.exports = {
  getProducts: (name, limit, page, sortBy, sortType) => {
    const pageInt = parseInt(page, 10);
    const limitInt = parseInt(limit, 10);
    return new Promise((resolve, reject) => {
      // conn.query('SELECT product.*, category.name FROM product JOIN category ON product.id_category = category.id_category WHERE product.name like ? ORDER BY '+sortBy+' '+sortType+' LIMIT ?,? ',[`%${name}%`, pageInt, limitInt],
      conn.query(
        "SELECT p.id_product, p.name, c.name AS category, p.price, p.date_add, p.date_update, p.description, p.picture, p.qty FROM product as p JOIN category AS c ON p.id_category = c.id_category where p.name LIKE '%" +
          name +
          "%' ORDER BY " +
          sortBy +
          " " +
          sortType +
          " LIMIT " +
          pageInt +
          " , " +
          limitInt,
        (err, result) => {
          if (!err) {
            resolve(result);
          } else {
            reject(new Error(err));
          }
        }
      );
    });
  },

  getProductsbyName: data => {
    return new Promise((resolve, reject) => {
      conn.query(
        "Select * from product where name = ?",
        data,
        (err, result) => {
          if (!err) {
            resolve(data);
          } else {
            reject(new Error(err));
          }
        }
      );
    });
  },

  getProductSort: data => {
    return new Promise((resolve, reject) => {
      conn.query(
        "SELECT p.id_product, p.name, c.name AS category, p.price, p.date_add, p.date_update, p.description, p.qty FROM product AS p JOIN category AS c ON p.id_category = c.id_category ORDER BY " +
          data +
          "",
        (err, result) => {
          if (!err) {
            resolve(result);
          } else {
            reject(new Error(err));
          }
        }
      );
    });
  },

  addProduct: (data, category_name, qtyp) => {
    return new Promise((resolve, reject) => {
      conn.query(
        "SELECT * from product where name= ?",
        data.name,
        (err, otp) => {
          if (otp.length > 0) {
            conn.query(
              "UPDATE product SET qty = qty+? where name = ?",
              [qtyp, data.name],
              (err, uptdres) => {
                if (!err) {
                  resolve(uptdres);
                } else {
                  reject(err);
                }
              }
            );
          } else {
            conn.query(
              "SELECT * from category where name=?",
              category_name,
              (err, resc) => {
                if (resc.length > 0) {
                  id_category = resc[0].id_category;
                  conn.query(
                    "INSERT INTO product SET ?, id_category = ?",
                    [data, id_category],
                    (err, resi) => {
                      if (!err) {
                        resolve(resi);
                      } else {
                        reject(err);
                      }
                    }
                  );
                } else {
                  reject("CATAGORY NOT FOUND");
                }
              }
            );
          }
        }
      );
    });
  },

  reduceProduct: data => {
    return new Promise((resolve, reject) => {
      conn.query(
        "SELECT * from product where name= ?",
        data.name,
        (err, resu) => {
          //var qty = data.qty + result[0].qty
          const min = resu[0].qty - data.qty;

          if (min > 0) {
            if (resu.length > 0) {
              conn.query(
                "UPDATE product SET qty = ? where name = ?",
                [min, data.name],
                (err, res) => {
                  if (!err) {
                    resolve(data);
                  } else {
                    reject(new Error(err));
                  }
                }
              );
            } else {
              reject(new Error(err));
            }
          } else {
            reject(new Error(err));
          }
        }
      );
    });
  },

  //Update Product

  updateProduct: (id, data) => {
    return new Promise((resolve, reject) => {
      conn.query(
        "Update product SET ? Where id_product = ?",
        [data, id],
        (err, result) => {
          if (!err) {
            resolve(data);
          } else {
            reject(new Error(err));
          }
        }
      );
    });
  },

  deleteProduct: data => {
    return new Promise((resolve, reject) => {
      conn.query(
        "SELECT * from product where id_product=?",
        [data],
        (errr, resu) => {
          let [pct] = resu;

          if (!errr) {
            fs.unlink("public/images/" + pct.picture, ero => {
              if (ero) {
                console.log("delete file success");
              }
            });
          } else {
            console.log("delete file fail");
          }

          conn.query(
            "DELETE from product where id_product=?",
            [data],
            (err, result) => {
              if (!err) {
                resolve(data);
              } else {
                reject(new Error(err));
              }
            }
          );
        }
      );
    });
  }
};
