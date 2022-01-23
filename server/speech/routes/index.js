const express = require('express') 
const VerifyToken = require('../../helper');

const { transcribeVoice} = require('../controllers')

const router = express.Router() 

router.post('/speech/transcribe/', VerifyToken, transcribeVoice)

module.exports = router