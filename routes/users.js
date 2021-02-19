require('dotenv').config()
const jwt = require('jsonwebtoken')
const express = require('express')
const router = express.Router()
const Users = require('../models/users')
const authToken = require('../middleware/auth')


// get All 
router.get('/all', authToken, async (req, res) => {
    try {
        const users = await Users.find()
        res.json(users.filter(user => user.name === req.user.nameOfuser))
    } catch (error) {
        res.json({message : error.message})
    }
})

// add One
router.post('/add', async (req, res) => {

    

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

router.post('/login', (req, res, next) => {

    const {name} = req.body

    if(!req.body.name){
        res.status(400)
    } else {
        Users.findOne({
            name : name
        }).exec().then(user => {
                if(!user){
                    res.json({message : "You re not allowed"})
                } else {
                const name = req.body.name
                    const us = {nameOfuser : name}
                                
                    const accessToken = jwt.sign(us, process.env.ACCESS_TOKEN)

                    res.json({accessToken : accessToken})

                    res.user = user
                    next()
                }
            }
            
        )
    }

})





module.exports = router