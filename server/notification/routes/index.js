const express = require('express') 
const VerifyToken = require('../../helper');

const { notificationAll, notificationMy, notificationCount, notificationCreate, notificationUpdate, readUpdate } = require('../controllers/notificationCtrl')

const router = express.Router()

//notification
router.post('/notifications/', VerifyToken, notificationAll)

router.post('/notification/:emailId/', VerifyToken, notificationMy)

router.post('/notification/count/:emailId/', VerifyToken, notificationCount)

router.post('/notification/', VerifyToken, notificationCreate)

router.put('/notification/', VerifyToken, notificationUpdate)

router.put('/notification/read/', readUpdate)

module.exports = router;