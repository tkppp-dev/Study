const root = require('app-root-path')
jest.mock(root + '/models/user')
const User = require(root + '/models/user')
const { addFollowing } = require(root + '/routes/controllers/user')

describe('addFollowing', () => {
    const req = {
        user : {
            id : 1
        },
        params : {
            id : 2
        },
    }
    const res = {
        status : jest.fn(() => res),
        send : jest.fn(),
    }
    const next = jest.fn()

    test('사용자를 찾아 팔로잉을 추가하고 success를 응답해야 함', async () => {
        User.findOne.mockReturnValue(Promise.resolve({
            addFollowing(id){
                return Promise.resolve(true)
            }
        }))
        await addFollowing(req, res, next)
        expect(res.send).toBeCalledWith('success')
    })

    test('사용자를 찾지 못한다면 상태코드 404를 설정하고 no user를 응답해야 함', async () => {
        User.findOne.mockReturnValue(null)
        await addFollowing(req, res, next)
        expect(res.status).toBeCalledWith(404)
        expect(res.send).toBeCalledWith('no user')
    })

    test('DB에서 에러가 발생하면 next(error) 호출', async () => {
        const err = '테스트용 에러'
        User.findOne.mockReturnValue(Promise.reject(err))
        await addFollowing(req, res, next)
        expect(next).toBeCalledWith(err)
    })
    
})