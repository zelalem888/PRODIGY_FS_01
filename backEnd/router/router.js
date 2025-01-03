const express = require('express');
const {createUser, getUser} = require('../controller/controller')
const verifyToken = require('../midddleWare/authMiddleWare');

const routers = express.Router()

routers.post('/signup', createUser)

routers.post('/signin', getUser )


routers.get('/protected-route', verifyToken, (req, res) => {
    res.status(200).json({ message: 'this is wired' });

  });

  
module.exports = routers
