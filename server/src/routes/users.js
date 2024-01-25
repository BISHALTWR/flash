const express = require('express')
const {registerNewUser,loginUser} = require('../controllers/users')
const {executeJS} = require('../execute/executeJS')
const router = express.Router();
router.post('/register',registerNewUser )
router.post('/login',loginUser )
router.post('/executeJS',executeJS)

module.exports = router