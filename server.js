require('dotenv').config()
const express = require('express')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const app = express()


// connect our database:
mongoose.connect("mongodb://localhost/bookmanagement", {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
const db = mongoose.connection;

db.on("error", (error) => console.error(error))
db.once("open", () => console.log("Connected to DataBase !!!"))

app.use(express.json())



// use routes
const booksroute = require("./routes/books.js")
app.use("/books", booksroute)

const usersroute = require("./routes/users.js")
app.use("/users", usersroute)


app.listen(3000)