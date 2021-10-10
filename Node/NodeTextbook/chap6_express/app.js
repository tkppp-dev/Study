const express = require('express')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const multer = require('multer')
const dotenv = require('dotenv')
const path = require('path')

/**
 * express 기본 미들웨어
 * 
 * morgan(opt) : 로깅용 패키지
 * 
 * static(dir) : 정적인 파일들을 제공하는 라우터 역할 
 * ex) static(path.join(__dirname,'public')) => localhost:port/로 public 폴더 안에 있는 정적 파일에 접근할 수 있음
 * 
 * body-parser : 요청에 담긴 본문 데이터를 해석해 req.body 객체로 만들어줌. 주로 폼 데이터나 AJAX 요청의 데이터를 처리하며 
 * express 내장 body-parser 대신 패키지 설치시 raw 데이터나 text 데이터 해석도 가능.
 * cf) 멀티파트 데이터(이미지, 동영상, 파일) 은 해석하지 못함 => multer 패키지 이용
 * 
 * cookie-parser(비밀키) : req.headers.cookies에 들어있던 쿠키 정보를 해석해 req.cookies 객체에 넣음.
 * 비밀키를 설정할 경우 비밀키로 서명된 쿠키를 다룰 수 있음.
 * cookie를 설정하려면 res.cookie(key, value, opt) 메서드를 사용해야함
 * cookie 삭제시 res.clearCookie(key, value, opt) 메서드를 사용해야함. 단 설정한 옵션이 모두 일치해야 함.
 * 
 * express-session(opt) : 세션 관리 패키지
 * 
 * dotenv : dotenv.config() 실행 시 process.env에 .env 파일의 정보를 저장
 * 
 * multer(opt) : 멀티파트 형식의 데이터를 업로드 할 때 사용
 * cf) 멀티파트 : enctype이 multipart/form-data인 폼을 통해 업로드하는 데이터 형식
 * multer(opt)로 만들어진 multer 객체 사용
 * multer.single(formName) : 한개만 업로드 할때
 * multer.array(formName) : 여러개를 한번에 업로드 할때
 * multer.field([name1, name2, ...]) : 한개씩 여러개 업로드 할때
 * 
 * 라우터 객체로 라우팅 분리하기
 * express.Router()로 반환된 라우터 객체에 라우팅을 설정하고
 * app.js 에서 호출해 express 객체와 연결
 * 이때 router 객체의 라우팅 주소와 app.js 에서 설정한 라우팅 주소가 합쳐져 접근 주소가 완성된다.
 * 
 * req, res 객체
 * 익스프레스의 req, res 객체는 http 모듈을 확장한 것으로 http 모듈의 메서드를 그대로 쓸 수도 있다.
 * 
 * req.app : app 객체에 접근
 * req.body : body-parser가 만들어주는 요청 본문
 * req.cookies : cookie-parser가 만들어주는 쿠키 객체
 * req.ip : 요청의 ip 주소가 담겨있다.
 * req.params : 라우트 매개변수에 대한 정보
 * req.query : 쿼리스트링에 대한 정보가 담겨있다
 * req.signedCookies : 서명된 쿠키가 담긴 객체
 * req.get(headername) : 헤더의 값을 가져오는 메서드
 * 
 * res.app : app 객체에 접근
 * res.cookie(key, value) : 쿠키를 설정할때 쓰는 메서드
 * res.clearCookie(key, value, opt) : 쿠키를 삭제할때 쓰는 메서드
 * res.end() : 데이터 없이 응답을 보냄
 * res.json() : JSON 형식으로 응답을 보냄
 * res.redirect(addr) : 리다이렉트할 주소와 함께 응답을 보냄
 * res.render(view, data) : 템플릿 엔진을 렌더링해서 응답할 때 사용하는 메서드
 * res.send(data) : 데이터와 함께 응답을 보낸대. 데이터는 문자열, HTML, 버퍼, 객체 일 수 있다.
 * res.sendFile(addr) : 경로에 위치한 파일을 응답
 * res.set(header, value) : 응답의 헤더를 설정
 * res.status(code) : 응답시의 http 상태코드 지정
 * 
 * 
 * return next() 와 next()의 차이
 * next()는 미들웨어 실행중 next()를 만나더라도 아래의 코드를 모두 실행하고 넘어감
 * return next()는 미들웨어 실행중 만났을 경우 즉시 미들웨어를 종료하고 다음 미들웨어로 넘어감
 */

const app = express()
dotenv.config()

app.use(morgan('dev'))
app.use(express.static(path.join(__dirname, 'public')))
app.use(cookieParser(process.env.COOKIE_SECRET))
app.use(session({
    resave : false,
    saveUninitialized : false,
    secret : process.env.COOKIE_SECRET,
    cookie : {
        httpOnly : true,
        secure : false
    },
    name : 'session-cookie'
}))

app.get('/', (req, res) => {
    res.send('Express Server')
})

const upload = multer({
    storage : multer.diskStorage({
        destination(req, file, done){
            done(null, 'uploads/')
        },
        filename(req,file, done){
            const ext = path.extname(file.originalname)
            done(null, path.basename(file.originalname, ext) + Date.now() + ext)
        }
    }),
    limits : {
        fileSize : 5 * 1024 * 1024  // byte 기준
    }
})

// API for the testing of next() 
app.get(
  '/next', function (req,res,next) { 
    console.log('hi there ');
    next();
    console.log('you are still here');
  }
)
  
// API for the testing of return next() 
app.get(
  '/return-next', function (req,res,next) { 
    console.log('hi there');
    return next(); 
    console.log('you are still here');
  }
)
  
app.listen(5000,()=> {
  console.log("App is running on port 5000")
})

app.post('/upload', upload.array('image'), (req, res) => {
    console.log(req.file, req.body)
    res.send('ok')
})
app.get('/upload', (req, res) => {
    res.sendFile(path.join(__dirname,'multipart.html'))
})

const indexRouter = require('./routes/index')
const userRouter = require('./routes/user')

app.use('/', indexRouter)     
app.use('/user', userRouter)    // /user + (/)userRouter 주소 = /user

app.listen(3000, () => {
    console.log('Server On')
})