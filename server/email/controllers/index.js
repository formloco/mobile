const { sendEmail, sendNotificationEmail } = require('../services')
const jwt = require('jsonwebtoken')
const api = { secret: process.env.SECRET }
const getTemplate = require('../templates/emailHelper')

const notification = async(req, res) => {
  const emailTemplate = getTemplate(req.body.tenant)

  const msg = {
    from:     req.body.emailFrom,
    to:       req.body.emailTo,
    subject:  req.body.subject,
    html:     'Hi ' +req.body.toName+','
              +'\r\n'+emailTemplate.notificationMessage
              +'\r\n'+'<p><a href="'+req.body.url+'?email='+req.body.emailTo+'&id='+req.body.messageID+'&target=blank">Click here to get access.</a></p>'
  }
  sendNotificationEmail(msg, req, res)
}

const forgotPassword = async(req, res) => {
  const token = jwt.sign({ id: .369 }, api.secret, {expiresIn: 3600})

  const emailTemplate = getTemplate(req.body.tenant)
  const msg = {
    from:     emailTemplate.fromEmail,
    to:       req.body.email,
    subject:  emailTemplate.subjectForgotPassword,
    html:     '\r\n'+'<p><a href="'+req.body.url+'?token='+token+'&email='+req.body.email+'">Click to reset password</a></p>'
  }
  sendEmail(msg, req, res)
}

const verifyEmail = async(req, res) => {
  let token = jwt.sign({ id: .369 }, api.secret, {expiresIn: 3600})
  let random = Math.floor(100000 + Math.random() * 900000)
  
  const msg = {
    from:     emailProps.fromEmail,
    to:       req.body.email,
    subject:  emailProps.subjectVerifyEmail,
    html:     +'\r\n'+'<p>Email Verification Code</p>'
              +'\r\n'+'<p>'+random+'</p>'
              +'\r\n'+'<p><a href="'+req.body.url+'?token='+token+'&email='+req.body.email+'&random='+random+'">Click to verify email.</a></p>'
  }
  sendEmail(msg, req, res)
}

module.exports = {
  notification, forgotPassword, verifyEmail
}