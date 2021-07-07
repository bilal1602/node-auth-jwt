const express = require('express')
const jwt = require('jsonwebtoken')

const app = express()

app.get('/api', (req,res) => res.json({ message: 'Welcome to API'}))

app.post('/api/post', (req,res) => res.json({message: 'Post Created'}))

app.post('/api/login', verifyToken,(req, res) => {
    // Mock User
    const user = {
        id: 1,
        username:'Bilal',
        email: 'bilal.sajjad786@gmail.com'
    }
    
    jwt.sign({user}, 'secretKey',(err, token)=>res.json({token}))
})

// Verify Token
function verifyToken(req,res,next){
    // Get auth header value
    const bearerHeader = req.header['authorization'];
    // Check if bearer is undefined
    if(typeof bearerHeader !== 'undefined') {

    } else {
        // Forbidden
        res.sendStatus()
    }
}

app.listen(5000, ()=> console.log('Server listening on port 5000'))