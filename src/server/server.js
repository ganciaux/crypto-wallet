var express = require('express')
var app = express()
var axios = require('axios')
const cors = require('cors')

var PORT = 8080

const corsOptions = {
  //origin: process.env.CLIENT_URL,
  origin: 'http://127.0.0.1:3000',
  credentials: true,
  allowedHeaders: ['sessionId', 'Content-Type'],
  exposedHeaders: ['sessionId'],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue: false,
}

app.use(cors(corsOptions))

app.get('/test', function (req, res) {
  res.json({ test: 'test' })
})

app.listen(PORT, function () {
  console.log('Express is listening port:' + PORT + '!')
})
