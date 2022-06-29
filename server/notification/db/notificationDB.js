const { Pool } = require('pg')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { v4: uuidv4 } = require('uuid')


const allNotificationSQL = async (req) => {
  const pool = new Pool({
    user: process.env.DBUSER,
    host: process.env.HOST,
    database: req.body.tenant_id,
    password: process.env.PASSWORD,
    port: process.env.PORT
  })
  const client = await pool.connect()

  const allNotifications = await client.query(`SELECT * FROM public.notification`)

  client.release()
  await pool.end()
  return allNotifications.rows
}

const myNotificationSQL = async (req) => {
  const pool = new Pool({
    user: process.env.DBUSER,
    host: process.env.HOST,
    database: req.body.tenant_id,
    password: process.env.PASSWORD,
    port: process.env.PORT
  })
  const client = await pool.connect()

  const myNotifications = await client.query('Select id, date, date_signed, form_name, form_id, email_to, email_to_id, email_from, email_from_id, email_signed, signed_name, data_id, read, description, pdf, comment FROM public.notification inner join public.email_notification on public.notification.id = public.email_notification.notification_id WHERE public.email_notification.email_id = $1 ORDER BY date desc', [req.params.emailId])
  client.release()
  await pool.end()
  return myNotifications.rows
}

const countNotificationSQL = async (req) => {
  const pool = new Pool({
    user: process.env.DBUSER,
    host: process.env.HOST,
    database: req.body.tenant_id,
    password: process.env.PASSWORD,
    port: process.env.PORT
  })
  const client = await pool.connect()
  
  const myNotifications = await client.query('Select count(*) FROM public.notification inner join public.email_notification on public.notification.id = public.email_notification.notification_id WHERE public.email_notification.email_id = $1 AND read = false', [req.emailId])

  client.release()
  await pool.end()
  return myNotifications.rows[0]
}

const createNotificationSQL = async (data) => {
  const pool = new Pool({
    user: process.env.DBUSER,
    host: process.env.HOST,
    database: data['tenant_id'],
    password: process.env.PASSWORD,
    port: process.env.PORT
  })
  const client = await pool.connect()
  const comment = JSON.stringify(data["comment"])

  let emailToID = await client.query('Select id from public.email WHERE email = $1', [data["email_to"]])
  if (emailToID.rowCount === 0) emailToID = await client.query('INSERT INTO email(name, email) VALUES ($1, $2) RETURNING ID', [data["supervisor_name"], data["email_to"]])

  let emailFromID = await client.query('Select id from public.email WHERE email = $1', [data["email_from"]])
  if (emailFromID.rowCount === 0) emailFromID = await client.query('INSERT INTO email(name, email) VALUES ($1, $2) RETURNING ID', [data["worker_name"], data["email_from"]])

  const notificationID = await client.query('INSERT INTO notification(date, form_name, form_id, email_to, email_to_id, email_from, email_from_id, data_id, read, description, pdf, corrective_action, comment) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) RETURNING ID', [data["date"], data["form_name"], data["form_id"], data["email_to"], emailToID.rows[0].id, data["email_from"], emailFromID.rows[0].id, data["data_id"], false, data["description"], data["pdf"], data["correctiveAction"], comment])

  await client.query('INSERT INTO email_notification(notification_id, email_id) VALUES ($1, $2)', [notificationID.rows[0].id, emailToID.rows[0].id])
  await client.query('INSERT INTO email_notification(notification_id, email_id) VALUES ($1, $2)', [notificationID.rows[0].id, emailFromID.rows[0].id])

  const myNotifications = await client.query('Select id, date, date_signed, form_name, form_id, email_to, email_to_id, email_from, email_from_id, email_signed, signed_name, data_id, read, description, pdf, comment FROM public.notification inner join public.email_notification on public.notification.id = public.email_notification.notification_id WHERE public.email_notification.email_id = $1 ORDER BY date desc', [emailFromID.rows[0].id])

  client.release()
  await pool.end()
  return myNotifications.rows
}

const updateNotificationSQL = async (data) => {
  const pool = new Pool({
    user: process.env.DBUSER,
    host: process.env.HOST,
    database: data['tenant_id'],
    password: process.env.PASSWORD,
    port: process.env.PORT
  })
  const client = await pool.connect()

  messages = []

  const toRow = await client.query('Select name from public.email WHERE id = $1', [data["email_to_id"]])
  const fromRow = await client.query('Select name from public.email WHERE id = $1', [data["email_from_id"]])

  let commentRow = await client.query('Select comment FROM public.notification WHERE id = $1', [data["notificationID"]])

  messages = commentRow.rows[0].comment

  const messageObj = {
    to: toRow.rows[0]["name"],
    from: fromRow.rows[0]["name"],
    date: data["date"],
    message: data["message"]
  }

  messages.push(messageObj)

  const notificationID = await client.query('UPDATE public.notification SET comment = ($1), read = false WHERE id = ($2) RETURNING ID', [JSON.stringify(messages), data["notificationID"]])
  const myNotifications = await client.query('Select id, date, form_name, form_id, email_to, email_to_id, email_from, email_from_id, email_signed, signed_name, data_id, read, description, pdf, comment FROM public.notification inner join public.email_notification on public.notification.id = public.email_notification.notification_id WHERE public.email_notification.email_id = $1 ORDER BY date desc', [fromRow.rows[0].id])

  client.release()

  const obj = {
    toName: toRow.rows[0]["name"],
    notificationID: notificationID.rows[0].id,
    notifications: myNotifications.rows,
    comments: messages
  }

  await pool.end()
  return obj
}

const updateReadSQL = async (data) => {
  const pool = new Pool({
    user: process.env.DBUSER,
    host: process.env.HOST,
    database: data['tenant_id'],
    password: process.env.PASSWORD,
    port: process.env.PORT
  })
  const client = await pool.connect()

  await client.query('UPDATE public.notification SET read = true WHERE id = ($1)', [data["notificationID"]])

  client.release()
  await pool.end()
  return

}

module.exports = {
  allNotificationSQL, myNotificationSQL, countNotificationSQL, createNotificationSQL, updateNotificationSQL, updateReadSQL
}