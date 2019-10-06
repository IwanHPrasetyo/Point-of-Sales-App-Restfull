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
      conn.query(
        "SELECT count(*) as count FROM user where email=?",
        data.email,
        (err,
        result => {
          if (!err) {
            var count = result[0].count;
            if (count <= 0) {
              reject(new Error(err));
            } else {
              conn.query("INSERT INTO user SET ?", data, (err, result) => {
                if (!err) {
                  resolve(data);
                } else {
                  reject(err);
                }
              });
            }
          }
        })
      );
    });
  }
};
