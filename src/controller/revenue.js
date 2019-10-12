const revenueModel = require("../models/revenue");

module.exports = {
  getRevenue: (req, res) => {
    revenueModel
      .getRevenue()
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

  getRevenueby: (req, res) => {
    const { orderby } = req.query;
    console.log(orderby);
    revenueModel
      .getRevenueby(orderby)
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

  getOrder: (req, res) => {
    const { by } = req.query;
    revenueModel
      .getOrder(by)
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

  getIncome: (req, res) => {
    revenueModel
      .getIncome()
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
  }
};
