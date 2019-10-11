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
  },

  getOrder: by => {
    return new Promise((resolve, reject) => {
      let orderby = by;
      let to = 10;
      if (orderby == "day") {
        to = 10;
      } else if (orderby == "month") {
        to = 7;
      } else if (orderby == "year") {
        to = 4;
      }

      conn.query(
        "SELECT *, SUBSTR(DATE,1, " +
          to +
          ") AS dateday, SUBSTR(CURDATE(),1, " +
          to +
          ") AS datenow FROM revenue  HAVING dateday = datenow",
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

  getIncome: () => {
    return new Promise((resolve, reject) => {
      conn.query(
        "SELECT  (SELECT sum(amount) FROM revenue WHERE DATE(date) = DATE(NOW() - INTERVAL 1 DAY)) AS daylast,(SELECT sum(amount) FROM revenue WHERE DATE(date) = DATE(NOW() - INTERVAL 0 DAY)) AS daynow,(SELECT sum(amount) FROM revenue WHERE YEAR(date) = YEAR(CURDATE())) AS yearnow ,(SELECT sum(amount) FROM revenue WHERE YEAR(date) = YEAR(CURDATE())-1) AS yearlast,(SELECT COUNT(*) FROM revenue WHERE WEEK(date) = WEEK(CURDATE())-1) AS lastweek, (SELECT COUNT(*) FROM revenue WHERE WEEK(date) = WEEK(CURDATE())) AS weeknow ",
        (err, resultnow) => {
          if (!err) {
            resolve(resultnow);
          } else {
            reject(new Error(err));
          }
        }
      );
    });
  }
};
