const express = require('express') 
const VerifyToken = require('../../helper');

const { readForms, readForm, createForm, registerForm, publishForm, permissionForm } = require('../controllers/formCtrl')

const router = express.Router() 

//form
router.post('/form/forms/', VerifyToken, readForms)

router.get('/form/data/:form_id/:data_id/', VerifyToken, readForm)

router.post('/form/', VerifyToken, createForm)

router.post('/form/register/', VerifyToken, registerForm)

router.post('/form/publish/', VerifyToken, publishForm)

router.post('/form/permission/', VerifyToken, permissionForm)

module.exports = router