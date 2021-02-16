require('dotenv').config()
const jwt = require('jsonwebtoken')
const express = require('express')
const router = express.Router()
const Books = require('../models/books')
const authToken = require('../middleware/auth')


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
router.post('/', authToken, async (req, res) => {

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


module.exports = router