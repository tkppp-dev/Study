const express = require('express')
const dotenv = require('dotenv')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const logger = require('morgan')
const nunjucks = require('nunjucks')
const path = require('path')

const passport = require('passport')

dotenv.config()

const { sequelize } = require('./models')
sequelize.sync({ force : false })
    .then(() => {
        console.log('Database Connect Success')
    })
    .catch(err => {
        console.error(err)
    })

const app = express();
app.set('view engine','html')
nunjucks.configure('views',{
    express : app,
    watch : true
})

const passportConfig = require('./passport/index')
passportConfig()

app.use(logger('dev'))
app.use(express.static(path.join(__dirname,'public')))
app.use(express.static(path.join(__dirname, 'uploads')))
app.use(express.urlencoded({ extended : false }))
app.use(cookieParser(process.env.COOKIE_SECRET))
app.use(session({
    resave : false,
    saveUninitialized : false,
    secret : process.env.COOKIE_SECRET,
    cookie : {
        httpOnly : true,
        secure : false
    },
}))

app.use(passport.initialize())
app.use(passport.session())

// Routing
const pageRouter = require('./routes/page')
const authRouter = require('./routes/auth')
const postRouter = require('./routes/post')
const userRouter = require('./routes/user')

app.use('/', pageRouter)
app.use('/auth', authRouter)
app.use('/post', postRouter)
app.use('/user', userRouter)

app.use((req, res, next) => {
    const err = new Error(`${req.method} ${req.url} 라우터가 없습니다`)
    err.status = 404
    next(err)
})

app.use((err, req, res, next) => {
    res.locals.message = err.message
    res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
    res.status = (err.status || 500)
    res.render('error')
})

app.listen(3000, () => {
    console.log('Server On')
})