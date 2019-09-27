const exppress      = require('express')
const app           = exppress()
const bodyParser    = require('body-parser')
const logger        = require('morgan')
require('dotenv/config')


const fileUpload    = require('express-fileupload')

const routerNav = require('./src/index')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(logger('dev'))
app.use(fileUpload())


const port = process.env.SERVER_PORT || 5888


app.listen(port,() =>{
    console.log("Port connecting")
})

app.use('/', routerNav)

app.get('*', (req, res) =>{
    res.send('404 Not Found')
})