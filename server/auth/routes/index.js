const express = require('express') 
const VerifyToken = require('../../helper')

const { tempToken, fetchUser, resetEmail, enableEmail, resetPassword, disableEmail, updateEmail, createEmail, registerEmail, getPermission } = require('../controllers')
const router = express.Router()

// resets user email so the user gets prompted to enter password
router.post('/auth/resetpassword/', VerifyToken, resetPassword)
 
router.post('/auth/reset/', VerifyToken, resetEmail)

router.post('/auth/enable/', VerifyToken, enableEmail)

router.post('/auth/disable/', VerifyToken, disableEmail)

router.post('/auth/create/', VerifyToken, createEmail)

router.post('/auth/update/', VerifyToken, updateEmail)

router.post('/auth/permission/', VerifyToken, getPermission)

router.post('/auth/register/', registerEmail)

//auth
router.get('/auth/token/', tempToken)

router.post('/auth/user/', VerifyToken, fetchUser)

module.exports = router