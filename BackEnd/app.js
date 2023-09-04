const express = require('express')
const app = express()
const errorMiddleWare = require('./middleware/error')
const cookieParser = require("cookie-parser")
const bodyParser = require('body-parser')
// const fileUpload = require("express-fileupload")
const multer = require('multer')
const upload = multer()
const dotenv = require('dotenv')

//config

dotenv.config({path:"BackEnd/config/config.env"})

app.use(express.json())
app.use(cookieParser())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(upload.array())

// app.use(fileUpload())


// Route Import
const productRoute = require('./routes/productRoute')
const userRoute = require('./routes/userRoute')
const orderRoute = require('./routes/orderRoutes')
const payment = require("./routes/paymentRoutes")



app.use('/api/v1',productRoute)
app.use('/api/v1',userRoute)
app.use('/api/v1',orderRoute)
app.use('/api/v1',payment)

app.use(errorMiddleWare)

module.exports = app