const express = require('express') 
const VerifyToken = require('../../helper')

const { getAssets, getAsset, getLog, getCategory, getStatus, updateAsset, createAsset, deleteAsset, addMarker, deleteMarker } = require('../controllers')

const router = express.Router()

// asset
router.get('/asset/assets/', getAssets)

router.get('/asset/', VerifyToken, getAsset)

router.get('/asset/log/', getLog)

router.get('/asset/status/', getStatus)

router.get('/asset/category/', getCategory)

router.put('/asset/update/', VerifyToken, updateAsset)

router.post('/asset/create/', VerifyToken, createAsset)

router.post('/asset/delete/', VerifyToken, deleteAsset)

// map
router.post('/asset/addmarker/', VerifyToken, addMarker)

router.post('/asset/deletemarker/', VerifyToken, deleteMarker)

module.exports = router