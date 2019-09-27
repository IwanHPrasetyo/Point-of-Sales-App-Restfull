const conn = require("../configs/db");

module.exports = {
  getUsers: () => {
    return new Promise((resolve, reject) => {
      conn.query("SELECT * FROM user", (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(new Error(err));
        }
      });
    });
  },

  addUser: data => {
    return new Promise((resolve, reject) => {
      conn.query("Select * from user where email=?", data.email, (err, res) => {
        if (res.length < 1) {
          conn.query("INSERT INTO user SET ?", data, (err, result) => {
            if (!err) {
              resolve(result);
            } else {
              reject(err);
            }
          });
        } else {
          reject("email exist");
        }
      })
    })
  }
};
