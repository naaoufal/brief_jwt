const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema({

    name : {
        type : String
    },
    author : {
        type : String
    },
    price : {
        type : Number
    }

})

module.exports = mongoose.model('books', bookSchema)