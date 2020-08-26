var mongoose = require('mongoose')

var schema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true,
        integer: true
    },   
    alias: String,
    allowed_locations: [{
        type: String
    }],
    location: String
})

exports.index = mongoose.model('radio', schema)


