const express = require('express')
const passport = require('passport')
const bcrypt = require('bcrypt')
const { isLogin, isNotLogin } = require('./middlewares')
const User = require('../models/user')

const router = express.Router()

router.post('/join', isNotLogin, async (req, res, next) => {
    const {email, nick, password} = req.body
    
    try{
        const exUser = await User.findOne({ where : {email}})
        if(exUser){
            return res.redirect('/join?error=exist')
        }
        const hash = await bcrypt.hash(password, 12)
        await User.create({
            email,
            nick,
            password : hash
        })
        return res.redirect('/')
    }catch(err){
        console.error(err)
        return next(err)
    }
})

router.post('/login', isNotLogin, (req, res, next) => {
    // 두번째 인수의 콜백 인수는 Strategy에서 넘겨받은 것
    passport.authenticate('local', (authError, user, info) => {
        if(authError){
            console.error(authError)
            return next(authError)
        }
        if(!user){
            return res.redirect(`/?loginError=${info.message}}`)
        }
        return req.login(user, loginError => {
            if(loginError){
                console.error(loginError)
                return next(loginError)
            }
            return res.redirect('/')
        })
    })(req, res, next)
})

router.get('/logout', isLogin, (req, res, next) => {
    req.logout()
    req.session.destroy()
    res.redirect('/')
})

module.exports = router