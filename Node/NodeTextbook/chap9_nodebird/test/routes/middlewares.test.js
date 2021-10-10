const { isLogin, isNotLogin } = require('../../routes/middlewares')

function setRequest(bool){
    return {
        isAuthenticated : jest.fn(() => bool)
    }
}
const next = jest.fn()

describe('isLogin', () => {
    const next = jest.fn()
    const res = {
        status : jest.fn(() => res),    // 메소드 체이닝을 위해 res 반환
        send : jest.fn()
    }

    test('로그인 되어 있을 경우 isLogin에서 next를 반환', () => {
        const req = setRequest(true)
        isLogin(req, res, next)
        expect(next).toBeCalledTimes(1)
    })

    test('로그인이 되어있지 않으면 isLogin이 에러를 반환', () => {
        const req = setRequest(false)
        isLogin(req, res, next)
        expect(res.status).toBeCalledWith(403)
        expect(res.send).toBeCalledWith('로그인 필요')
    })
})

describe('isNotLogin', () => {
    const next = jest.fn()
    const res = {
        redirect : jest.fn()
    }
    test('로그인이 되어 있지 않을 경우 isNotLogin에서 next를 반환', () => {
        const req = setRequest(false)
        isNotLogin(req, res, next)
        expect(next).toBeCalledTimes(1)
    })

    test('로그인이 되어 있으면 isNotLogin이 에러를 반환', () => {
        const message = encodeURIComponent('로그인한 상태입니다')
        const req = setRequest(true)
        isNotLogin(req, res, next)
        expect(res.redirect).toBeCalledWith(`/?error=${message}`)
    })
})