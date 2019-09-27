const userModel = require("../models/users");
const jwt = require("jsonwebtoken"); 
const conn = require("../configs/db");
const uuidv1 = require("uuid/v1");

module.exports = {

  getUsers: (req, res) =>{
    userModel.getUsers()
        .then(resultQuery =>{
            res.json({
                status : 200,
                message: 'Show data success',
                data:resultQuery
            })
        })
        .catch(err =>{
            console.log(err)
            res.json({
                status:400,
                message:'Show data fail'
            })
        })
},
  
  login(req, res) {
    var { email, password } = req.body;

    // For the given username fetch user from DB
    conn.query(
      "Select * from user where email = ? and password = ?",
      [email, password],
      (err, result) => {
        let [data] = result;

        var mockedUsername = data.email;
        var mockedPassword = data.password;

        if (email && password) {
          if (email === mockedUsername && password === mockedPassword) {
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
            });
          }
        } else {
          res.json({
            success: false,
            message: "Authentication failed! Please check the request"
          });
        }
      }
    );
  },

  addUser: (req, res) => {
    const str = "";
    const id_user = uuidv1(null, str, 15);
    const { email, password } = req.body;
    const data = { id_user, email, password };

    c

    userModel.addUser(data).then(resultQuery => {
      res
        .json({
          status: 500,
          message: "Add user success",
          data: resultQuery
        })
        .catch(err => {
          res.json({
            status: 500,
            message: "Add user fail"
          });
        });
    });
  }
};
