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

/* req stands for request, res stands for response */
app.get('/coins/:params', function (req, res) {
  const params = req.params.params ? `?${req.params.params}` : ''
  console.log(params)
  axios
    .get(`https://api.coinranking.com/v2/coins${params}`, {
      headers: {
        'x-access-token':
          'coinranking31764015111bc1ca04ddbc0dbac9585de4f1b6c87a13f739',
      },
    })
    .then((response) => {
      console.log(response.data)
      console.log('axios')
      res.json(response.data)
    })
    .catch((error) => {
      console.log(error)
    })
})

app.get('/suggestions/:params', function (req, res) {
  const params = req.params.params ? `${req.params.params}` : ''
  console.log(params)
  axios
    .get(`https://api.coinranking.com/v2/search-suggestions?query=${params}`, {
      headers: {
        'x-access-token':
          'coinranking31764015111bc1ca04ddbc0dbac9585de4f1b6c87a13f739',
      },
    })
    .then((response) => {
      res.json(response.data)
    })
    .catch((error) => {
      console.log(error)
    })
})

app.get('/test', function (req, res) {
  res.json({ test: 'test' })
})

app.listen(PORT, function () {
  console.log('Express is listening port:' + PORT + '!')
})
