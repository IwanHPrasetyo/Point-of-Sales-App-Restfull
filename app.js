const exppress = require("express");
const app = exppress();
const bodyParser = require("body-parser");
const logger = require("morgan");
//const cors = require("cors");
//const request = require("superagent");
require("dotenv/config");



app.use(exppress.static("./"));

const fileUpload = require("express-fileupload");

const routerNav = require("./src/index");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(logger("dev"));
app.use(fileUpload());

const port = process.env.PORT || 5000;


app.listen(port, () => {
  console.log("Port connecting" + port);
});

app.use("/", routerNav);

app.get("*", (req, res) => {
  res.send("404 Not Found");
});
