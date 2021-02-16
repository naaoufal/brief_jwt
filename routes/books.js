require('dotenv').config()
const jwt = require('jsonwebtoken')
const express = require('express')
const router = express.Router()
const Books = require('../models/books')


// get All 
router.get('/', authToken, async (req, res) => {
    try {
        const books = await Books.find()
        res.json(books)
    } catch (error) {
        res.json({message : error.message})
    }
})

// add One
router.post('/', async (req, res) => {

    const book = new Books({
        name : req.body.name,
        author : req.body.author,
        price : req.body.price
    })

    try {
        const newBook = await book.save()
        res.json(newBook)
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