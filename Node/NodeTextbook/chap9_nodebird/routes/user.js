const express = require('express')

const { isLogin } = require('./middlewares')
const { addFollowing } = require('./controllers/user')
const User = require('../models/user')

router = express.Router()

router.post('/:id/follow', isLogin, addFollowing)  

module.exports = router