const conn = require("../configs/db");

module.exports = {
  getRevenue: () => {
    return new Promise((resolve, reject) => {
      conn.query("SELECT * from revenue ORDER BY date desc", (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(new Error(err));
        }
      });
    });
  }
};
