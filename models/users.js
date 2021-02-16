const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({

    name : {
        type : String
    },
    phone : {
        type : Number
    },
    password : {
        type : String
    }

})

module.exports = mongoose.model('users', userSchema)