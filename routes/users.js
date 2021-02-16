require('dotenv').config()
const jwt = require('jsonwebtoken')
const express = require('express')
const router = express.Router()
const Users = require('../models/users')


// get All 
router.get('/', authToken, async (req, res) => {
    try {
        const users = await Users.find()
        res.json(users.filter(user => user.name === req.user.nameOfuser))
    } catch (error) {
        res.json({message : error.message})
    }
})

// add One
router.post('/', async (req, res) => {

    const user = new Users({
        name : req.body.name,
        phone : req.body.phone,
        password : req.body.password
    })

    try {
        const newUser = await user.save()
        res.json(newUser)
    } catch (error) {
        res.json({message : error.message})
    }
})


// authToken function 
function authToken (req, res, next) {
    const autHeader = req.headers['authorization']
    const token = autHeader && autHeader.split(' ')[1]

    if(token == null){
        return res.sendStatus(403)
    }

    jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
        if(err) {
            return res.sendStatus(403)
        }
        req.user = user
        next()
    })
}


module.exports = router