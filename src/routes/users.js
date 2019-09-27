const express = require('express')
const Route   = express.Router()

const userController = require('../controller/users')
const middleware = require('../auth/middleware')

Route
        .post('/login',middleware.checkToken,  userController.login)
        .post('/add', middleware.checkToken, userController.addUser)
        .get('/', middleware.checkToken, userController.getUsers)


module.exports = Route