var express = require('express')
var app = express()
var port = 3000
var controllers = require('./controllers')
var bodyParser = require('body-parser')

app.use(bodyParser.json()) 
app.use(bodyParser.urlencoded({ extended: true })) 

app.post('/radios/:id', controllers.radio.createProfile)
app.post('/radios/:id/location', controllers.radio.saveLocation)
app.get('/radios/:id/location', controllers.radio.getLocation)

var server = app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`)
})

module.exports = server
