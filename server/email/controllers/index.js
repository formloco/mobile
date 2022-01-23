const fs = require('fs')
const jwt = require('jsonwebtoken')
const path = require('path')
const footer = fs.readFileSync(path.resolve(__dirname, '../templates/footer.html'))

const { sendEmail, sendNotificationEmail } = require('../services')

const loadConfig = require('../../config')
loadConfig()

const api = { secret: process.env.SECRET }

const notification = async(req, res) => {
  const msg = {
    from:     req.body.emailFrom,
    to:       req.body.emailTo,
    subject:  req.body.subject,
    html:     'Hi ' +req.body.toName+','
              +'\r\n'+'<p>A Summit Earth form notification has been submitted that requires your attention.</p>'
              +'\r\n'+'<p><a href="'+req.body.url+'?email='+req.body.emailTo+'&id='+req.body.messageID+'&target=blank">Click here to get access.</a></p>'
  }
  sendNotificationEmail(msg, req, res)
}

const forgotPassword = async(req, res) => {
  let token = jwt.sign({ id: .369 }, api.secret, {expiresIn: 3600})
  const msg = {
    from:     'HSE@summitearth.com',
    to:       req.body.email,
    subject:  'summit earth forms password reset',
    html:     '\r\n'+'<p><a href="'+req.body.url+'?token='+token+'&email='+req.body.email+'">Click to reset password</a></p>'
  }
  sendEmail(msg, req, res)
}

module.exports = {
  notification, forgotPassword
}