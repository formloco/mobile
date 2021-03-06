const express = require('express') 
const VerifyToken = require('../../helper');

const { readForms, readForm, createForm, registerForm, statusForm, updateForm, permissionForm } = require('../controllers/formCtrl')

const router = express.Router() 

//form
router.post('/form/forms/', VerifyToken, readForms)

router.get('/form/data/:form_id/:data_id/', VerifyToken, readForm)

router.post('/form/', VerifyToken, createForm)

router.post('/form/register/', VerifyToken, registerForm)

router.post('/form/status/', VerifyToken, statusForm)

router.put('/form/', VerifyToken, updateForm)

router.post('/form/permission/', VerifyToken, permissionForm)

module.exports = router