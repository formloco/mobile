const express = require('express') 
const VerifyToken = require('../../helper');

const { notificationAll, notificationMy, notificationCount, notificationCreate, notificationUpdate, readUpdate } = require('../controllers/notificationCtrl')

const router = express.Router()

//notification
router.post('/notification/', VerifyToken, notificationAll)

router.post('/notification/:email/', VerifyToken, notificationMy)

router.post('/notification/count/:email/', VerifyToken, notificationCount)

router.post('/notification/', VerifyToken, notificationCreate)

router.put('/notification/', VerifyToken, notificationUpdate)

router.put('/notification/read/', readUpdate)

module.exports = router;