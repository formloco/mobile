const express = require('express') 
const VerifyToken = require('../../helper')

const { readData, readForm, signForm, createData, updateData, deleteData, getLists, getEmails, saveList, getPDF } = require('../controllers/dataCtrl')

const router = express.Router()
 
//file
router.get('/api/pdf/:name/', VerifyToken, getPDF)

//data
router.get('/api/:tenant_id/:form_id/', VerifyToken, readData)

router.get('/api/form/:tenant_id/:form_id/:data_id/', VerifyToken, readForm)

router.put('/api/form/sign/', VerifyToken, signForm)

router.post('/api/', VerifyToken, createData)

// updates list item, returns updated list
router.put('/api/', VerifyToken, updateData)

// deletes list item, returns updated list
router.post('/api/delete/', VerifyToken, deleteData)

router.post('/api/lists/', getLists)

router.post('/api/emails/', VerifyToken, getEmails)

//creates list
router.post('/api/list/', VerifyToken, saveList)

module.exports = router