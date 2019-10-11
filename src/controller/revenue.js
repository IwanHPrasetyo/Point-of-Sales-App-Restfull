const revenueModel = require("../models/revenue");
const uuidv1 = require("uuid/v1");
const redis = require("redis");
const client = redis.createClient();
const revenueRedKey = "user : revenue";

module.exports = {
  getRevenue: (req, res) => {
    revenueModel
      .getRevenue()
      .then(resultQuery => {
        client.setex(revenueRedKey, 3600, JSON.stringify(resultQuery));
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
        client.setex(revenueRedKey, 3600, JSON.stringify(resultQuery));
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
        client.setex(revenueRedKey, 3600, JSON.stringify(resultQuery));
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
        client.setex(revenueRedKey, 3600, JSON.stringify(resultQuery));
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
