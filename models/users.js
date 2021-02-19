const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({

    name : {
        type : String,
        required : [true, "Error name"]
    },
    phone : {
        type : Number
    },
    password : {
        type : String
    }

})

module.exports = mongoose.model('users', userSchema)