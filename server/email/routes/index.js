const express = require('express') 
const VerifyToken = require('../../helper')

const { notification, forgotPassword, verifyEmail } = require('../controllers')
const router = express.Router()
 
router.post('/email/forgot/password/', forgotPassword)

router.post('/email/message/', VerifyToken, notification)

router.post('/email/verify/', VerifyToken, verifyEmail)

module.exports = router