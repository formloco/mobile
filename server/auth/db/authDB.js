const { Pool } = require('pg')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { v4: uuidv4 } = require('uuid')

const pool = new Pool({
  user: process.env.DBUSER,
  host: process.env.HOST,
  database: process.env.TENANT,
  password: process.env.PASSWORD,
  port: process.env.PORT
})

const emailRegisterSQL = async (data) => {

  const client = await pool.connect()
  let obj = {}
  let checkEmail = await client.query('SELECT * FROM email WHERE email = $1', [data["email"]])
  // console.log(obj, checkEmail)
  if (checkEmail.rowCount === 0) {
    obj = {
      message: 'Account does not exist.'
    }
    client.release()
    return obj
  }
  else {
    console.log('row',obj)
    obj = {
      row: updatedEmail.rows[0],
      message: 'Registion successful.'
    }
    
  }
  console.log('but',obj, checkEmail.rows[0])
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

  // account disabled
  if (checkEmail.rowCount === 1 && checkEmail.rows[0].enabled === false) {
    obj = {
      row: updatedEmail.rows[0],
      message: 'Account disabled.'
    }
  }

  client.release()
  console.log(obj)
  return obj
}

const userFetchSQL = async (data) => {
  console.log(data)
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

  let obj = {}
  let checkEmail = await client.query('SELECT email FROM email WHERE email = $1', [data["email"]])

  if (checkEmail.rowCount !== 1) {
    await client.query('INSERT INTO email(name, email, worker, supervisor) VALUES ($1, $2, $3, $4)', [data["name"], data["email"], data["worker"], data["supervisor"]])
    const list = await client.query(`SELECT name, email, worker, supervisor, enabled FROM email`)
    obj = { rows: list.rows, msg: 'Email created' }
  }
  else obj = { rows: [], msg: 'Email already exists' }

  client.release()

  return obj
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

const emailSignupSQL = async (data) => {

  pool.options.database = 'kioske'
  let client = await pool.connect()

  let user = await client.query(`SELECT id FROM public.user WHERE email = '` + data["email"] + `'`)

  if (user.rowCount !== 0) {
    client.release()
    return
  }

  let tenant_id = uuidv4()

  let hashedPassword = bcrypt.hashSync(data["password"], 8)
  let settings = JSON.stringify([{ isDarkMode: false }])
  let members = JSON.stringify([])

  await client.query(`INSERT INTO public.user(tenant_id, role, password, email, handle, settings, members) VALUES ('` + tenant_id + `', 'Owner', '` + hashedPassword + `', '` + data["email"] + `', '` + data["handle"] + `', '` + settings + `', '` + members + `') returning id`)

  let userObj = JSON.stringify({ user: 'formloco', date_created: new Date() })

  await client.query(`INSERT INTO public.tenant(tenant_id, email, user_created) VALUES ('` + tenant_id + `', '` + data["email"] + `', '` + userObj + `')`)

  await client.query(`CREATE DATABASE "` + tenant_id + `"`)

  pool.options.database = tenant_id
  let clientTenant = await pool.connect()

  await clientTenant.query(`CREATE SEQUENCE form_id_seq`)

  await clientTenant.query(`CREATE TABLE public.form ("id" int4 NOT NULL DEFAULT nextval('form_id_seq'::regclass),form_id uuid, tenant_id uuid, name varchar, form jsonb, pin varchar, date_last_access timestamp DEFAULT now(), date_created timestamp DEFAULT now(), date_archived timestamp, user_created jsonb, user_updated jsonb, user_archive int4, is_data bool, is_list bool, type varchar, is_published bool, is_manager bool, PRIMARY KEY ("id"))`)

  await clientTenant.query(`CREATE SEQUENCE notification_id_seq`)

  await clientTenant.query(`CREATE TABLE public.notification ("id" int4 NOT NULL DEFAULT nextval('notification_id_seq'::regclass), date timestamp, date_signed timestamp, form_name text, email_to text, data_id int4, read bool, description text, pdf text, comment jsonb, signed bool, email_signed text, corrective_action bool, form_id text, signed_name text, PRIMARY KEY ("id"))`)

  await clientTenant.query(`CREATE SEQUENCE inspection_id_seq`)

  await clientTenant.query(`CREATE TABLE public.inspection ("id" int4 NOT NULL DEFAULT nextval('inspection_id_seq'::regclass), form_id uuid, data_id int4, action_item text, corrective_action text, corrective_action_label text, type text, location text, date_requested timestamp, date_completed timestamp, date_submitted timestamp, person_responsible text, PRIMARY KEY ("id"))`)

  await clientTenant.query(`CREATE SEQUENCE email_id_seq`)

  await clientTenant.query(`CREATE TABLE public.email ("id" int4 NOT NULL DEFAULT nextval('email_id_seq'::regclass), name text, email text, enabled bool, worker bool, supervisor bool, password text, admin bool, manager bool, PRIMARY KEY ("id"))`)

  await clientTenant.query(`CREATE TABLE public.email_notification ( notification_id int4 NOT NULL, email_id int4 NOT NULL)`)

  clientTenant.release()

  return {
    message: "Signup sucessful.",
    tenant_id: tenant_id
  }

}

const tenantFetchSQL = async (data) => {

  pool.options.database = 'kioske'
  let client = await pool.connect()

  let user = await client.query(`SELECT * FROM public.user WHERE email = '` + data["email"] + `'`)
console.log(user.rows, data["password"])
  client.release()

  let passwordIsValid = bcrypt.compareSync(data["password"], user.rows[0]["password"])
    console.log(passwordIsValid)
  if (!passwordIsValid)
    return { message: 'Failed to authenticate.' }
  else {
    let tenant_id
    if (user.rowCount > 0) tenant_id = user.rows[0].tenant_id
  
    return {
      message: "Authentication sucessful.",
      tenant_id: tenant_id
    }

  }

}

module.exports = {
  userFetchSQL, emailResetSQL, passwordResetSQL, emailUpdateSQL, emailCreateSQL, emailDisableSQL, emailEnableSQL, emailRegisterSQL, permissionGetSQL, emailSignupSQL, tenantFetchSQL
}