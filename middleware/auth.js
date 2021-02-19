require('dotenv').config()
const jwt = require('jsonwebtoken')

// authToken function mdileware funntion

module.exports = (req, res, next) => {
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