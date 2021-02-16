require('dotenv').config()
const jwt = require('jsonwebtoken')
const express = require('express')
const router = express.Router()
const Users = require('../models/users')
const authToken = require('../middleware/auth')


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





module.exports = router