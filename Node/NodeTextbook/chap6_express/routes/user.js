const express = require('express')

const router = express.Router();

router.get('/', (req, res) => {
    res.send('Hello User')
})
router.get('/:id', (req, res) => {
    console.log(req.params)     // 주소
    console.log(req.query)      // ? 이후 데이터

    res.send([req.params, req.query])
})

module.exports = router