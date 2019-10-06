const userModel = require("../models/users");
const jwt = require("jsonwebtoken");
const conn = require("../configs/db");
const uuidv1 = require("uuid/v1");
const bcrypt = require("bcrypt");
const saltRounds = 10;

module.exports = {
  getUsers: (req, res) => {
    userModel
      .getUsers()
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

  login(req, res) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    return new Promise((resolve, reject) => {
      var { email, pass } = req.body;

      conn.query(
        "Select * from user where email = ?",
        [email],
        (err, result) => {
          if (!err) {
            var user = result.length;
            var mockedUsername;
            var mockedPassword;

            if (user <= 0) {
              console.log("Username and Password Incorect");
              res.json({
                success: false,
                message: "Incorect Email and Password"
              });
            } else {
              mockedUsername = result[0].email;
              mockedPassword = result[0].password;
              var passworddcryp = bcrypt.compareSync(pass, mockedPassword);
              console.log(passworddcryp);

              if (passworddcryp == true) {
                let token = jwt.sign({ email }, process.env.SECRET_KEY, {
                  expiresIn: "24h" // expires in 24 hours
                });

                // return the JWT token for the future API calls
                res.json({
                  success: true,
                  message: "Authentication successful!",
                  token: token
                });
              } else {
                res.json({
                  success: false,
                  message: "Incorrect username or password"
                  // reject("Akun Tidak Terdaftar")
                });
              }
            }

            resolve(result);
          } else {
            reject(new Error(err));
          }
        }
      );
    });
  },

  addUser: (req, res) => {
    const str = "";
    const id_user = uuidv1(null, str, 15);
    var { email } = req.body;
    var pass = req.body.pass;
    var password = bcrypt.hashSync(pass, saltRounds);
    const data = { id_user, email, password };

    userModel
      .addUser(data)
      .then(resultQuery => {
        res.json({
          status: 500,
          message: "Register user success",
          data: data
        });
      })
      .catch(err => {
        res.json({
          status: 500,
          message: "Email Alredy Exist"
        });
      });
  }
};
