const http = require('http')
const fs = require('fs').promises
const url = require('url')
const qs = require('querystring')

/**
 * 쿠키에
 * 쿠키는 브라우저에 저장된 데이터로 서버에 요청을 보낼때 저장된 쿠키를 요청 헤더의 Cookie에 담아 보냄
 * 서버에서 쿠키를 설정하려면 응답 헤더의 Set-Cookie에 키값 쌍으로 저장해서 전달
 * 
 * 세션
 * 쿠키는 클라이언트에 저장되는 데이터이기에 털릴 가능성이 높음. 따라서 개인정보같은 데이터는 쿠키에 저장해서는 안됨
 * 대신 서버에 있는 세션에 데이터를 저장하고 쿠키에 세션에 접근할 수 있는 키를 준다면 쿠키와 같은 구현이 가능한다.
 */

function parseCookie(cookie=''){
    return cookie.split(';')
            .map(v => v.split('='))
            .reduce((acc, [k,v]) => {
                acc[k.trim()] = decodeURIComponent(v)
                return acc
            }, {})
}

const session = {}

http.createServer(async (req, res) => {
    const cookies = parseCookie(req.headers.cookie)

    if(req.url.startsWith('/login')){
        const { query } = url.parse(req.url)
        const { name } = qs.parse(query)
        const expires = new Date()
        const uniqueInt = Date.now()

        expires.setMinutes(expires.getMinutes() + 5)
        session[uniqueInt] = {
            name,
            expires
        }

        res.writeHead(302,{
            Location : '/',
            'Set-Cookie' : `session=${uniqueInt}; Expires=${expires.toUTCString()}; HttpOnly; Path=/`
        })
        res.end()
    }
    else if(cookies.session && session[cookies.session].expires > new Date()){
        res.writeHead(200, {'Content-Type' : 'text/plain; charset=utf-8'})
        res.end(`${session[cookies.session].name}님 안녕하세요`)
    }
    else{
        try{
            const data = await fs.readFile('./cookie.html')
            res.writeHead(200, {'Content-Type' : 'text/html; charset=utf-8'})
            res.end(data)
        }catch(err){
            res.writeHead(500, {'Content-Type' : 'text/plain; charset=utf-8'})
            console.log(err.message)
        }
    }
}).listen(8080, () => {
    console.log('Server On')
})