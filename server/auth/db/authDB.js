const { Pool } = require('pg')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { v4: uuidv4 } = require('uuid')

const loadConfig = require('../../config')
loadConfig()
console.log(process.env)
const pool = new Pool({
  user: process.env.DBUSER,
  host: process.env.HOST,
  database: process.env.TENANT,
  password: process.env.PASSWORD,
  port: process.env.PORT
})
console.log(pool)
const emailRegisterSQL = async (data) => {
  console.log('here',data)
  const client = await pool.connect()
console.log(data)
  let obj = {}
  let checkEmail = await client.query('SELECT * FROM email WHERE email = $1', [data["email"]])
console.log(checkEmail)
  // account registration
  if (checkEmail.rowCount === 1 && checkEmail.rows[0].enabled === null) {

    const hashedPassword = bcrypt.hashSync(data["password"], 8)

    await client.query('UPDATE public.email SET enabled = $1, password = $2 WHERE email = $3', [true, hashedPassword, data["email"]])
    updatedEmail = await client.query('SELECT email FROM email WHERE email = $1', [data["email"]])
    obj = {
      row: updatedEmail.rows[0],
      message: 'Registion successful.'
    }
  }

  // account registered, new device
  if (checkEmail.rowCount === 1 && checkEmail.rows[0].enabled === true) {
    console.log('got over here')
    const emailPassword = await client.query('SELECT password FROM public.email WHERE email = $1', [data["email"]])
    
    if (emailPassword.rowCount === 1) {
      let passwordIsValid = bcrypt.compareSync(data["password"], emailPassword.rows[0].password)

      if (!passwordIsValid) obj = { message: 'Failed to authenticate.' }

      if (passwordIsValid) {
        updatedEmail = await client.query('SELECT email FROM email WHERE email = $1', [data["email"]])
        obj = {
          row: updatedEmail.rows[0],
          message: 'Registion successful.'
        }
      }
    }
  }

  // account reset
  if (checkEmail.rowCount === 1 && checkEmail.rows[0].enabled === null) {
    await client.query('UPDATE public.email SET enabled = $1 WHERE email = $2', [true, data["email"]])
    updatedEmail = await client.query('SELECT email FROM email WHERE email = $1', [data["email"]])
    obj = {
      row: updatedEmail.rows[0],
      message: 'Account retrieved.'
    }
  }

  // account disabled
  if (checkEmail.rowCount === 1 && checkEmail.rows[0].enabled === false) {
    obj = {
      message: 'Account disabled.'
    }
  }

  if (checkEmail.rowCount === 0) {
    obj = {
      message: 'Account does not exist.'
    }
  }

  client.release()
  return obj
}

const userFetchSQL = async (data) => {
  const client = await pool.connect()
  user = await client.query('SELECT name, email, admin, worker, supervisor FROM email WHERE email = $1', [data["email"]])
  client.release()
  return user.rows[0]
}

const emailResetSQL = async (data) => {
  const client = await pool.connect()
  await client.query('UPDATE public.email SET enabled = $1 WHERE id = $2', [null, data["id"]])
  const list = await client.query(`SELECT email, name, worker, supervisor FROM email`)
  client.release()
  return list.rows
}

const emailUpdateSQL = async (data) => {
  const client = await pool.connect()
  await client.query('UPDATE public.email SET name = $1, email = $2, admin = $3, worker = $4, supervisor = $5, manager = $6 WHERE id = $7', [data["name"], data["email"], data["admin"], data["worker"], data["supervisor"], data["manager"], data["id"]])
  const list = await client.query(`SELECT name, email, worker, supervisor, admin, enabled FROM email`)
  client.release()
  return list.rows
}

const passwordResetSQL = async (data) => {
  const client = await pool.connect()
  const hashedPassword = bcrypt.hashSync(data["password"], 8)

  await client.query('UPDATE public.email SET password = $1 WHERE email = $2', [hashedPassword, data["email"]])
  obj = {
    message: 'Password reset successful.'
  }

  client.release()
  return obj
}

const emailCreateSQL = async (data) => {
  const client = await pool.connect()
  let checkEmail = await client.query('SELECT email FROM email WHERE email = $1', [data["email"]])

  if (checkEmail.rowCount !== 1) {
    await client.query('INSERT INTO email(name, email, worker, supervisor) VALUES ($1, $2, $3, $4)', [data["name"], data["email"], data["worker"], data["supervisor"]])
  }
  const list = await client.query(`SELECT name, email, worker, supervisor FROM email`)
  client.release()
  return list.rows
}

const emailEnableSQL = async (data) => {
  const client = await pool.connect()
  user = await client.query('SELECT admin, worker, supervisor, manager FROM email WHERE email = $1', [data["email"]])

  await client.query('UPDATE public.email SET enabled = $1 WHERE id = $2', [null, data["id"]])
  const list = await client.query(`SELECT name, email, worker, supervisor FROM email`)
  client.release()
  return list.rows
}

const emailDisableSQL = async (data) => {
  const client = await pool.connect()
  await client.query('UPDATE public.email SET enabled = $1 WHERE id = $2', [false, data["id"]])
  const list = await client.query(`SELECT name, email, worker, supervisor FROM email`)
  client.release()
  return list.rows
}

const permissionGetSQL = async (data) => {
  const client = await pool.connect()
  await client.query('UPDATE public.email SET enabled = $1 WHERE id = $2', [false, data["id"]])
  const list = await client.query(`SELECT name, email, worker, supervisor FROM email`)
  client.release()
  return list.rows
}

// const permissionSetSQL = async (data) => {
//   console.log(data)
//   const client = await pool.connect()
//   await client.query('UPDATE public.email SET manager = $1 WHERE email = $2', [data["permission"], data["email"]])
//   client.release()
//   return
// }

module.exports = {
  userFetchSQL, emailResetSQL, passwordResetSQL, emailUpdateSQL, emailCreateSQL, emailDisableSQL, emailEnableSQL, emailRegisterSQL, permissionGetSQL
}