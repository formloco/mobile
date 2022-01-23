const fs = require('fs')
const { Pool } = require('pg')
const { v4: uuidv4 } = require('uuid')

const pool = new Pool({
  user: process.env.DBUSER,
  host: process.env.HOST,
  database: process.env.TENANT,
  password: process.env.PASSWORD,
  port: process.env.PORT
})

const formsReadSQL = async (data) => {
  let client = await pool.connect()
  const forms = await client.query(`SELECT name, form_id, is_published, is_manager FROM public.form WHERE date_archived is null AND is_list = false`)
  
  const permissions = await client.query(`SELECT manager FROM public.email WHERE email = $1`, [data["email"]])
  const manager = permissions.rows[0].manager
  let userForms = []
  forms.rows.forEach(form => {
    if (!form.manager) userForms.push(form)
    else if (form.manager === manager) userForms.push(form)
  })
  client.release()
  return userForms
}

const formReadSQL = async (form_id, data_id) => {
  let client = await pool.connect()
  const data = await client.query(`SELECT * FROM "$1" WHERE id = $2`,[form_id, data_id])
  client.release()
  return data.rows
}

const formCreateSQL = async (data) => {
  let client = await pool.connect()

  let formJSON = JSON.stringify(data["form"])
  let userCreated = JSON.stringify(data["user_created"])

  if (data["name"] == null) data["name"] = ''

  let form = await client.query(`INSERT INTO public.form(form_id, name, type, form, tenant_id, is_data, is_published, is_list, pin, user_created) VALUES ( '` + data["form_id"] + `', '` + data["name"] + `', '` + data["type"] + `', '` + formJSON + `', '` + data["tenant_id"] + `', ` + data["is_data"] + `, ` + data["is_published"] + `, ` + data["is_list"] + `, '` + data["form"]["pin"] + `', '` + userCreated + `') returning id`)

  client.release()

  return form.rows
}

// takes form structure from client and updates database
const formRegisterSQL = async (data) => {

  client = await pool.connect()

  let form = await client.query(`SELECT form_id FROM public.form WHERE name = '` + data["name"] + `' AND date_archived is null`)

  if (form.rowCount === 0) {
    
    form_id = uuidv4()
    formJSON = JSON.stringify(data["formObj"])
    columns = JSON.stringify(data["formObj"]["form"]["columns"])
    userCreated = JSON.stringify(data["user_created"])

    columns = columns.replace(/`/g, "'")
    columns = columns.replace(/"/g, "")
    
    await client.query(`CREATE SEQUENCE IF NOT EXISTS form_id_seq`)
    await client.query(`CREATE TABLE IF NOT EXISTS public.form ("id" int4 NOT NULL DEFAULT nextval('form_id_seq'::regclass),form_id uuid, tenant_id uuid, name varchar, form jsonb, pin varchar, date_last_access timestamp DEFAULT now(), date_created timestamp DEFAULT now(), date_archived timestamp, user_created jsonb, user_updated jsonb, user_archive int4, is_data bool, is_list bool, type varchar, is_published bool, is_manager bool, PRIMARY KEY ("id"))`)
    await client.query(`INSERT INTO public.form(form_id, name, type, form, tenant_id, is_manager, is_data, is_published, is_list,  pin, user_created) VALUES ( '` + form_id + `', '` + data["name"] + `', 'custom', '` + formJSON + `', '` + data["tenant_id"] + `', ` + false + `, ` + false + `, ` + false + `, ` + false + `, '369', '` + userCreated + `')`)
    await client.query(`CREATE SEQUENCE IF NOT EXISTS id_seq`)
    await client.query(`CREATE TABLE IF NOT EXISTS "` + form_id + `" (` + columns + `)`)
  }
  else form_id = form.rows[0].form_id

  client.release()

  let obj = { form_id: form_id }

  return obj
}

const formPublishSQL = async (data) => {
  let client = await pool.connect()
  await client.query('UPDATE public.form SET is_published = $1 WHERE form_id = $2', [data["is_published"], data["form_id"]])
  client.release()
  const forms = await client.query(`SELECT * FROM public.form WHERE date_archived is null AND is_list = false AND type = 'custom'`)
  console.log(forms.rows)
  return forms.rows
}

const formPermissionSQL = async (data) => {
  let client = await pool.connect()
  await client.query('UPDATE public.form SET is_manager = $1 WHERE form_id = $2', [data["is_manager"], data["form_id"]])
  const forms = await client.query(`SELECT * FROM public.form WHERE date_archived is null AND is_list = false`)
  client.release()
  return forms.rows
}

module.exports = {
  formsReadSQL, formReadSQL, formCreateSQL, formRegisterSQL, formPublishSQL, formPermissionSQL
}

