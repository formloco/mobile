Mailgun = require('mailgun-js')

const mailgun = new Mailgun({apiKey: process.env.MAILGUN_KEY, domain: process.env.MAILGUN_DOMAIN})

function sendEmail(msg, req, res) {
  mailgun.messages().send(msg).then(resp => {
    res.status(201).send({message: 'Email sent to ' + req.body.email})
  })
  .catch(err => {
    res.status(500).send('Failed to send email.')
  })
}

function sendNotificationEmail(msg, req, res) {
  mailgun.messages().send(msg).then(() => {
    res.status(201).send({message: 'Email sent to ' + req.body.emailTo})
  })
  .catch(err => {
    console.log(err)
    res.status(500).send('Failed to send email.')
  })
}

module.exports = { sendEmail, sendNotificationEmail }