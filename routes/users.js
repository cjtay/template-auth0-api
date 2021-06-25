const express = require('express')
const router = express.Router()

const controllers = require('../controllers/users')

router.get('/', (req, res) => {
    res.send('hello from routes folder')
})

router.get('/other', (req, res) => {
    res.send('hello from other route!')
})

router.get('/user', controllers.getUser) 
router.get('/manage', controllers.manageUser) 


module.exports = router
