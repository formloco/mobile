const fs = require('fs')
const { Pool } = require('pg')
const { v4: uuidv4 } = require('uuid')

const formsReadSQL = async (data) => {
  console.log(data)
  const pool = new Pool({
    user: process.env.DBUSER,
    host: process.env.HOST,
    database: data['tenant_id'],
    password: process.env.PASSWORD,
    port: process.env.PORT
  })

  let client = await pool.connect()

  let userForms = []
  const forms = await client.query(`SELECT form FROM public.form WHERE date_archived is null AND is_list = false`)

  if (forms.rowCount > 0) {
    const permissions = await client.query(`SELECT manager FROM public.email WHERE email = $1`, [data["email"]])

    let manager
    if (permissions.rowCount > 0)
      manager = permissions.rows[0].manager

    forms.rows.forEach(form => {
      if (!form.manager) userForms.push(form)
      else if (form.manager === manager) userForms.push(form)
    })
  }

  client.release()
  await pool.end()
  return userForms
}

const formReadSQL = async (form_id, data_id) => {
  const pool = new Pool({
    user: process.env.DBUSER,
    host: process.env.HOST,
    database: data['tenant_id'],
    password: process.env.PASSWORD,
    port: process.env.PORT
  })

  let client = await pool.connect()
  const data = await client.query(`SELECT * FROM "$1" WHERE id = $2`, [form_id, data_id])
  client.release()
  await pool.end()
  return data.rows
}

const formCreateSQL = async (data) => {

  const pool = new Pool({
    user: process.env.DBUSER,
    host: process.env.HOST,
    database: data['tenant_id'],
    password: process.env.PASSWORD,
    port: process.env.PORT
  })

  let client = await pool.connect()

  let formJSON = JSON.stringify(data)
  let userCreated = JSON.stringify(data['user_created'])

  if (data['name'] == null) data['name'] = ''

  let form = await client.query(`INSERT INTO public.form(form_id, name, type, form, is_data, is_published, is_list, user_created) VALUES ( '` + data["form_id"] + `', '` + data["name"] + `', '` + data["type"] + `', '` + formJSON + `', '` + data["is_data"] + `', '` + data["is_published"] + `', '` + data["is_list"] + `', '` + userCreated + `') returning id`)

  client.release()
  await pool.end()
  return form.rows
}

// creates form and uuid data table
const formRegisterSQL = async (data) => {
  const pool = new Pool({
    user: process.env.DBUSER,
    host: process.env.HOST,
    database: data['tenant_id'],
    password: process.env.PASSWORD,
    port: process.env.PORT
  })

  client = await pool.connect()

  let form = await client.query(`SELECT form_id FROM public.form WHERE name = '` + data["name"] + `' AND date_archived is null`)

  if (form.rowCount === 0) {

    form_id = uuidv4()
    formJSON = JSON.stringify(data['formObj'])
    userCreated = JSON.stringify(data['user_created'])

    await client.query(`INSERT INTO public.form(form_id, name, type, form, is_manager, is_data, is_published, is_list, is_deployed, user_created) VALUES ( '` + form_id + `', '` + data["name"] + `', 'custom', '` + formJSON + `', '` + `', ` + false + `, ` + false + `, ` + false + `, ` + false + `, ` + false + `, '` + userCreated + `')`)
    await client.query(`CREATE SEQUENCE IF NOT EXISTS id_seq`)
    await clientTenant.query(`CREATE TABLE IF NOT EXISTS "` + form_id + `("id" int4 NOT NULL DEFAULT nextval('id_seq'::regclass), user_updated varchar, user_created jsonb, date_updated timestamp, date_created timestamp, pdf text, data jsonb, PRIMARY KEY ("id"))`)
  }
  else form_id = form.rows[0].form_id

  client.release()
  await pool.end()

  let obj = { form_id: form_id }

  return obj
}

const formStatusSQL = async (data) => {
  const pool = new Pool({
    user: process.env.DBUSER,
    host: process.env.HOST,
    database: data['tenant_id'],
    password: process.env.PASSWORD,
    port: process.env.PORT
  })
  let client = await pool.connect()

  formJSON = JSON.stringify(data['formObj'])

  await client.query('UPDATE public.form SET date_last_access = $1, is_published = $2, is_deployed = $3, form = $4 WHERE form_id = $5', [data["date_last_access"], data["is_published"], data["is_deployed"], formJSON, data["form_id"]])

  client.release()
  await pool.end()

  const obj = {
    message: 'Successfully Updated.'
  }

  return obj
}

const formUpdateSQL = async (data) => {
  const pool = new Pool({
    user: process.env.DBUSER,
    host: process.env.HOST,
    database: data['tenant_id'],
    password: process.env.PASSWORD,
    port: process.env.PORT
  })
  
  formJSON = JSON.stringify(data)
  let client = await pool.connect()
  await client.query('UPDATE public.form SET name = $1, form = $2, date_last_access = $3, is_data = $4, is_published = $5 WHERE form_id = $6', [data["name"], formJSON, data["date_last_access"], data["is_data"], data["is_published"], data["form_id"]])

  client.release()
  await pool.end()

  const obj = {
    message: 'Successfully Saved.'
  }

  return obj
}

const formPermissionSQL = async (data) => {
  console.log(data)
  const pool = new Pool({
    user: process.env.DBUSER,
    host: process.env.HOST,
    database: data['tenant_id'],
    password: process.env.PASSWORD,
    port: process.env.PORT
  })

  let client = await pool.connect()

  formJSON = JSON.stringify(data["formObj"])

  await client.query('UPDATE public.form SET is_manager = $1, form = $2 WHERE form_id = $3', [data["is_manager"], formJSON, data["form_id"]])
  const forms = await client.query(`SELECT * FROM public.form WHERE date_archived is null AND is_list = false`)
  client.release()

  await pool.end()
  return forms.rows
}

module.exports = {
  formsReadSQL, formReadSQL, formCreateSQL, formRegisterSQL, formStatusSQL, formUpdateSQL, formPermissionSQL
}

