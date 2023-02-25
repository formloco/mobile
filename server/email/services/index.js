Mailgun = require('mailgun-js')

const { logger } = require('../../winston')
const mailgun = new Mailgun({apiKey: process.env.MAILGUN_KEY, domain: process.env.MAILGUN_DOMAIN})

function sendEmail(msg, req, res) {
  mailgun.messages().send(msg).then(resp => {
    logger.info(resp, 'email')
    res.status(201).send({message: 'Email sent to ' + req.body.email})

  })
  .catch(msg => {
    logger.error('Failed to send email.', 'email', 'sendEmail')
    res.status(500).send('Failed to send email.')
  })
}

function sendNotificationEmail(msg, req, res) {
  mailgun.messages().send(msg).then(() => {
    res.status(201).send({message: 'Email sent to ' + req.body.emailTo})
  })
  .catch(err => {
    res.status(500).send('Failed to send email.')
  })
}

module.exports = { sendEmail, sendNotificationEmail }