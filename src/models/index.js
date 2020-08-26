var mongoose = require('mongoose');
var config = require('../config.json')
mongoose.connect(config.db, {useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true});

exports.radio = require('./radioModel.js').index

exports.disconnect = function() {
    mongoose.disconnect()
}