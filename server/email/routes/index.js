const express = require('express') 
const VerifyToken = require('../../helper')

const { notification, forgotPassword } = require('../controllers')
const router = express.Router()
 
router.post('/email/forgot/password/', forgotPassword)

router.post('/email/message/', VerifyToken, notification)

module.exports = router