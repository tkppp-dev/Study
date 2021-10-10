const passport = require('passport')
const local = require('./localStrategy')
const User = require('../models/user')

/**
 * Passport 로그인 과정
 * 1. 라우터를 통해 로그인 요청이 들어옴
 * 2. 라우터에서 passport.authenticate 메서드 호출
 * 3. 로그인 전략 수행
 * 4. 로그인 성공시 사용자 정보 객체와 함께 req.login 호출
 * 5. req.login 메서드가 passport.serializeUser 메서드 호출
 * 6. req.session에 사용자 아이디만 저장
 * 7. 로그인 완료
 * 
 * 로그인 이후
 * 1. 요청이 들어옴
 * 2. 라우터에 요청이 도달하기 전에 passport.session 미들웨어가 passport.deserializeUser 메서드 실행
 * 3. req.session에 저장된 아이디로 데이터베이스 사용자 조회
 * 4. 조회된 사용자 정보를 req.user에 저장
 * 5. 라우터에서 req.user 객체 사용가능
 */

module.exports = function(){
    /**
     * serializeUser : 로그인 시 실행되며 세션에 어떤 데이터를 넣을지 지정
     * 콜백의 인자인 done 함수의 두번째 인자가 세션에 넣을 데이터
     */
    passport.serializeUser((user, done) => {
        done(null, user.id)
    })

    /**
     * deserializeUser : 매 요청시 실행되며 passport.session() 메서드가 실행하는 함수
     * 세션에 저장한 데이터로 데이터베이스를 조회하며 조회한 데이터를 req.user를 통해 로그인한 사용자의 정보를 가져올 수 있다.
     */
    passport.deserializeUser(async (id, done) => {       
        try{
            let user = await User.findOne({
                where : {id},
                include : [{
                    model : User,
                    attributes : ['id', 'nick'],
                    as : 'Followers'
                }, {
                    model : User,
                    attributes : ['id', 'nick'],
                    as : 'Followings'
                }]
            })
            done(null, user)
        }catch(err){
            done(err)
        }
    })

    local()
}