const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')

const User = require('../models/user')

/**
 * Strategy : 로그인 전략
 * Strategy 에서 넘겨주는 done(err, data, info)가 passport.authenticate의 두번째 인수로 전달된다.
 */
module.exports = function(){
    passport.use(new LocalStrategy({
        usernameField : 'email',
        passwordField : 'password'
    }, async (email, password, done) => { 
        try{
            const existUser = await User.findOne({ where : { email } })
            if(existUser){
                const result = await bcrypt.compare(password, existUser.password)
                if(result){
                    done(null, existUser)
                }else{
                    done(null, false, {message: '비밀번호가 일치하지 않습니다.'})
                }
            }else{
                done(null, false, {message: '가입되지 않은 회원입니다.'})
            }
        }catch(err){
            console.error(err)
            done(err)
        }
    }))
}