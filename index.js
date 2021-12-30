const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')
const path = require('path')

const mongoURL = 'mongodb://localhost:27017/apotiksederhana'

mongoose.connect(mongoURL, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Alhamdulilah Kita Berhasil Connect')
}).catch(() => {
    console.log('Astaga Kita Gagal Nih')
})

const directory = path.join(__dirname, '/statics/')
app.use(express.static(directory))
app.use(cors())

app.use(bodyParser.json({
    extended: true,
    limit: '20mb'
}))

app.use(bodyParser.urlencoded({
    extended: true,
    limit: '20mb'
}))

// routes
app.use('/user', require('./routes/User'))
app.use('/obat', require('./routes/Obat'))
app.use('/order', require('./routes/Order'))

app.listen(5000, () => {
    console.log('Server Nya Udah Jalan Nih')
})