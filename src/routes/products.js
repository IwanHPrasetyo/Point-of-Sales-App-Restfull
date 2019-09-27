const express   = require('express')
const Route     = express.Router()
const cors      = require('cors')
const middleware = require('../auth/middleware')

 var corsOptions = {
         origin: 'http://localhost:5888',
         optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
       }

const productController = require('../controller/products')

Route
        .get('/',cors(), middleware.checkToken, productController.getProduct)
        .post('/reduce/:name', cors(corsOptions), middleware.checkToken, productController.reduceProduct)
        .get('/search/:name', cors(), middleware.checkToken, productController.getProductbyName)
        .get('/sort/:data', cors(), middleware.checkToken, productController.getProductSort)
        .post('/add', cors(corsOptions), middleware.checkToken, productController.addProduct)
        .patch('/update/:id', cors(corsOptions), middleware.checkToken, productController.updateProduct)
        .delete('/delete/:id', cors(corsOptions), middleware.checkToken, productController.deleteProduct)


module.exports = Route