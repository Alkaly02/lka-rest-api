require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const authRoutes = require('./routes/auth.route')

global.publicPath = __dirname + '/public'

app.use(express.json())

mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true}, () => {
    console.log("Conected to mongodb, Nice coding");
})

// api
app.use('/api/auth', authRoutes)

app.listen(process.env.PORT, () => {
    console.log("Server started at port ", process.env.PORT);
})