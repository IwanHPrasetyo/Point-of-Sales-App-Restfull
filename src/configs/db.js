const mysql = require("mysql");
const config = require("./config");

const connection = mysql.createConnection(config.database.mysql);

connection.connect(err => {
  if (err) console.log("error: ${err}");
  console.log("DB Connected");
});

module.exports = connection;
