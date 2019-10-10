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
  },

  getRevenueby: orderby => {
    return new Promise((resolve, reject) => {
      conn.query(
        "SELECT *,SUM(amount) AS income, EXTRACT(YEAR FROM DATE) AS year , DAYNAME(DATE) AS dayname, MONTHNAME(DATE) AS monthname, EXTRACT(DAY FROM DATE) AS day ,EXTRACT(MONTH FROM DATE) AS month, EXTRACT(WEEK from DATE) AS week FROM revenue GROUP BY " +
          orderby,
        (err, result) => {
          if (!err) {
            resolve(result);
          } else {
            reject(new Error(err));
          }
        }
      );
    });
  }
};
