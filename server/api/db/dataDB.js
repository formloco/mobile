const fs = require('fs')
const { Pool } = require('pg')

const { buildPDFReport, deletePdf, readDir, escapeSingleQuote } = require('../report/reportHelpers')

// must start the node server from /node ie. node api/api.js
let currentPath = process.cwd()
let filePath = currentPath + '/files/'

const dataReadSQL = async (tenant_id, form_id) => {
  const pool = new Pool({
    user: process.env.DBUSER,
    host: process.env.HOST,
    database: tenant_id,
    password: process.env.PASSWORD,
    port: process.env.PORT
  })
  const client = await pool.connect()

  let data = []
  let tableExist = await client.query(`SELECT EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename  = '` + form_id + `')`)
  if (tableExist.rows[0].exists) {
    let formData = await client.query(`SELECT * FROM "` + form_id + `" ORDER BY id`)
    data = formData.rows
  }

  client.release()
  await pool.end()

  return data
}

const formReadSQL = async (tenant_id, form_id, data_id) => {
  const pool = new Pool({
    user: process.env.DBUSER,
    host: process.env.HOST,
    database: tenant_id,
    password: process.env.PASSWORD,
    port: process.env.PORT
  })
  const client = await pool.connect()

  let formData = await client.query(`SELECT * FROM "` + form_id + `" WHERE id = $1`, [data_id])

  client.release()
  await pool.end()

  return formData.rows[0]
}

const formSignSQL = async (dataObj) => {

  const pool = new Pool({
    user: process.env.DBUSER,
    host: process.env.HOST,
    database: dataObj['tenant_id'],
    password: process.env.PASSWORD,
    port: process.env.PORT
  })
  const client = await pool.connect()

  await client.query('UPDATE notification SET date_signed = $1, signed = true, email_signed = $2, signed_name = $3 WHERE id = $4', [dataObj["date"], dataObj["email"], dataObj["name"], dataObj["notification"]["id"]])

  let formData = await client.query(`SELECT * FROM "` + dataObj["form_id"] + `" WHERE id = $1`, [dataObj["notification"]["data_id"]])
  formData.rows[0].data["SignoffDate"] = dataObj["date"]

  const reportData = formData.rows[0].data
  let dataJSON = JSON.stringify(reportData)

  await client.query(`UPDATE "` + dataObj.form_id + `" SET date_updated = '` + dataObj.date + `', data = '` + dataJSON + `' WHERE id = ` + dataObj["notification"]["data_id"])

  client.release()
  await pool.end()

  const path = filePath + dataObj["docID"] + dataObj["notification"]["data_id"]
  const dirPath = filePath + dataObj["docID"] + dataObj["notification"]["data_id"] + '/'
  const pdfFile = filePath + dataObj["docID"] + dataObj["notification"]["data_id"] + '.pdf'

  const pics = await readDir(dirPath)
  const messages = await escapeSingleQuote(dataObj)
  
  deletePdf(pdfFile)
  buildPDFReport(dataObj["docID"], path, reportData, messages, pics, dataObj["date"])

}

const dataCreateSQL = async (dataObj) => {

  const pool = new Pool({
    user: process.env.DBUSER,
    host: process.env.HOST,
    database: dataObj['tenant_id'],
    password: process.env.PASSWORD,
    port: process.env.PORT
  })
  const client = await pool.connect()

  const docID = dataObj["form"]["id"]

  let userCreated = JSON.stringify(dataObj['user'])

  if (dataObj['data']) {
    // escape speech data is needed for insert into json obj
    dataObj['data'] = dataObj['data'].replace(/'/g, "''")
  }

  // check to see if main form structure exists, if not create it
  let tableExist = await client.query(`SELECT EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename  = '` + dataObj["form"]["form_id"] + `')`)
  if (!tableExist.rows[0].exists) {
    await client.query(`CREATE SEQUENCE IF NOT EXISTS id_seq`)
    await client.query(`CREATE TABLE IF NOT EXISTS "` + dataObj["form"]["form_id"] + `" (id int4 NOT NULL DEFAULT nextval('id_seq'::regclass), user_updated varchar, user_created jsonb, date_updated timestamp, date_created timestamp, pdf text, data jsonb, PRIMARY KEY (id))`)
  }

  const newFormID = await client.query(`INSERT INTO "` + dataObj["form"]["form_id"] + `" (user_created, date_created, data) VALUES ('` + userCreated + `', '` + dataObj["date"] + `', '` + dataObj['data'] + `') RETURNING id`)

  const dataID = newFormID.rows[0].id
  const path = filePath + docID + dataID
  const pdfLink = dataObj["form"]["id"] + dataID + '.pdf'

  await client.query(`UPDATE "` + dataObj["form"]["form_id"] + `" SET pdf = '` + pdfLink + `' WHERE id = '` + dataID + `'`)
  await client.query(`UPDATE form SET is_data = true WHERE form_id = '` + dataObj["form"]["form_id"] + `'`)

  if (dataObj.correctiveActions && dataObj.correctiveActions.length > 0) {
    dataObj.correctiveActions.forEach(action => {
      client.query(`INSERT INTO inspection(form_id, data_id, action_item, corrective_action, corrective_action_label, type, location, date_requested, date_completed, person_responsible) VALUES ( '` + dataObj["form"]["form_id"] + `', ` + dataID + `, '` + action["actionItem"] + `', '` + `, '` + action["correctiveActionRequired"] + `', '` + action["label"] + `', '` + action["type"] + `', '` + dataObj.location + `', '` + action["dateToComplete"] + `', '` + action["dateCompleted"] + `', '` + action["personResponsible"] + `')`)
    })
  }

  const comments = [{
    "date": dataObj["date"],
    "message": "Created by " + dataObj["user"]["email"]
  }]

  let messages = []
  if (comments !== null) {
    for (let j = 0; j < comments.length; j++) {
      let str = JSON.stringify(comments[j])
      str = str.replace(/{/g, '')
      str = str.replace(/}/g, '')
      str = str.replace(/"/g, '')
      str = str.replace(/:/g, ': ')
      str = str.split(",").join("\n")
      messages.push(str)
    }
  }
  
  // store base64 for update to document later
  fs.mkdir(path, (err) => {
    if (err) return err
  })
  
  if (dataObj["pics"].length > 0) {
    let pics = []
    dataObj["pics"].forEach((element, index) => {
      let base64Data = `"` + element.replace(/^data:image\/jpeg;base64,/, "")
      const buffer = Buffer.from(base64Data, "base64")
      fs.writeFile(path + '/' + index + '.jpeg', buffer, (err) => {
        if (err) return err
      })
      pics.push({ image: element, width: 500 })
    })
    buildPDFReport(docID, path, JSON.parse(dataObj["data"]), messages, pics)
  }
  else {
    buildPDFReport(docID, path, JSON.parse(dataObj["data"]), messages)
  }

  client.release()
  await pool.end()

  return dataID
}

// updates list item
const dataUpdateSQL = async (dataObj) => {
  const pool = new Pool({
    user: process.env.DBUSER,
    host: process.env.HOST,
    database: dataObj['tenant_id'],
    password: process.env.PASSWORD,
    port: process.env.PORT
  })
  const client = await pool.connect()

  if (!dataObj.data)
    return { message: 'Nothing to Update' }

  const docId = dataObj.id
  if (dataObj['data']) {
    // escape speech data is needed for insert into json obj
    dataObj['data'] = dataObj['data'].replace(/'/g, "''")
  }

  await client.query(`UPDATE "` + dataObj.form_id + `" SET date_updated = '` + dataObj.date + `', data = '` + dataObj['data'] + `' WHERE id = ` + dataObj.data_id)

  if (dataObj.data.correctiveAction && dataObj.data.correctiveAction.length > 0) {
    await client.query(`DELETE inspection WHERE data_id = '` + dataObj.data_id + `')`)

    for (let j = 0; j < dataObj.data.correctiveAction.length; j++) {
      await client.query(`INSERT INTO inspection(form_id, data_id, action_item, corrective_action, corrective_action_label, type, location, date_requested, date_completed, person_responsible) VALUES ( '` + dataObj["formObj"]["form_id"] + `', ` + dataObj.data_id + `, '` + action["actionItem"] + `', '` + action["correctiveActionRequired"] + `', '` + action["label"] + `', '` + action["type"] + `', '` + dataObj.location + `', '` + action["dateToComplete"] + `', '` + action["dateCompleted"] + `', '` + action["personResponsible"] + `')`)
    }
  }

  let comment = await client.query('SELECT comment FROM notification WHERE data_id = $1', [dataObj.data_id])
  let comments = comment.rows[0]["comment"]

  client.release()
  await pool.end()

  let messages = []
  if (comments !== null) {
    for (let j = 0; j < comments.length; j++) {
      let str = JSON.stringify(comments[j])
      str = str.replace(/{/g, '')
      str = str.replace(/}/g, '')
      str = str.replace(/"/g, '')
      str = str.replace(/:/g, ': ')
      str = str.split(",").join("\n")
      messages.push(str)
    }
  }

  let pics = []
  const path = filePath + dataObj.id + dataObj.data_id

  fs.readdir(path + '/', (err, files) => {
    if (err) return;
    let count = files.length + 1

    // store base64 for update to document later
    if (dataObj.pics.length > 0) {
      dataObj.pics.forEach((element) => {
        let base64Data = `"` + element.replace(/^data:image\/jpeg;base64,/, "")
        const buffer = Buffer.from(base64Data, "base64")
        fs.writeFile(path + '/' + count + '.jpeg', buffer, (err) => {
          if (err) return
        })
        count = count + 1
      })

      fileNames = []
      fs.readdir(path + '/', (err, files) => {
        if (err) return
        else {
          files.forEach(file => {
            const contents = fs.readFileSync(path + '/' + file, { encoding: 'base64' })
            pics.push({ image: 'data:image/jpeg;base64,' + contents, width: 500 })
          })
          fs.unlink(path + '.pdf', (err) => {
            if (err) return
            buildPDFReport(docId, path, JSON.parse(dataObj.data), messages, pics)
          })
        }
      })
    }
    else {
      fs.unlink(path + '.pdf', (err) => {
        if (err) return
        buildPDFReport(docId, path, JSON.parse(dataObj.data), messages, pics)
      })
    }
  })
  return { message: 'Report Update Successful' }
}

// deletes list item
const dataDeleteSQL = async (data) => {
  const pool = new Pool({
    user: process.env.DBUSER,
    host: process.env.HOST,
    database: data['tenant_id'],
    password: process.env.PASSWORD,
    port: process.env.PORT
  })
  const client = await pool.connect()

  const form = await client.query('SELECT form_id FROM form WHERE name = $1', [data["name"]])
  await client.query(`DELETE FROM "` + form.rows[0]["form_id"] + `" WHERE id = ` + data["id"])
  let updatedData = await client.query(`SELECT * FROM "` + form.rows[0]["form_id"] + `"`)

  client.release()
  await pool.end()

  return updatedData.rows
}

const listsGetSQL = async (data) => {
  const pool = new Pool({
    user: process.env.DBUSER,
    host: process.env.HOST,
    database: data['tenant_id'],
    password: process.env.PASSWORD,
    port: process.env.PORT
  })
  const client = await pool.connect()

  let listArray = []

  let lists = await client.query(`SELECT * FROM form WHERE is_list = true`)

  for (let i = 0; i < lists.rows.length; i++) {

    let listRows = []
    let tableExist = await client.query(`SELECT EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename  = '` + lists.rows[i].form_id + `')`)

    if (tableExist.rows[0].exists) {
      let listData = await client.query(`SELECT id, data FROM "` + lists.rows[i].form_id + `"`)
      listRows = listData.rows
    }
    listArray.push({ name: lists.rows[i].name, form_id: lists.rows[i].form_id, rows: listRows })
  }

  client.release()
  await pool.end()

  return listArray
}

const emailsGetSQL = async (data) => {
  const pool = new Pool({
    user: process.env.DBUSER,
    host: process.env.HOST,
    database: data['tenant_id'],
    password: process.env.PASSWORD,
    port: process.env.PORT
  })
  const client = await pool.connect()

  const list = await client.query(`SELECT * FROM email`)

  client.release()
  await pool.end()

  return list.rows
}

const listSaveSQL = async (data) => {
  const pool = new Pool({
    user: process.env.DBUSER,
    host: process.env.HOST,
    database: data['tenant_id'],
    password: process.env.PASSWORD,
    port: process.env.PORT
  })
  const client = await pool.connect()

  const form = await client.query('SELECT form_id FROM form WHERE name = $1', [data["name"]])
  await client.query(`INSERT INTO "` + form.rows[0]["form_id"] + `" (data) VALUES ('` + data["value"] + `')`)
  let updatedData = await client.query(`SELECT * FROM "` + form.rows[0]["form_id"] + `"`)

  client.release()
  await pool.end()

  return updatedData.rows
}

const dataSyncSQL = async (dataArray) => {

  const pool = new Pool({
    user: process.env.DBUSER,
    host: process.env.HOST,
    database: dataObj['tenant_id'],
    password: process.env.PASSWORD,
    port: process.env.PORT
  })
  const client = await pool.connect()

  const docID = dataObj["form"]["id"]

  let userCreated = JSON.stringify(dataObj['user'])

  if (dataObj['data']) {
    // escape speech data is needed for insert into json obj
    dataObj['data'] = dataObj['data'].replace(/'/g, "''")
  }

  // check to see if main form structure exists, if not create it
  let tableExist = await client.query(`SELECT EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename  = '` + dataObj["form"]["form_id"] + `')`)
  if (!tableExist.rows[0].exists) {
    await client.query(`CREATE SEQUENCE IF NOT EXISTS id_seq`)
    await client.query(`CREATE TABLE IF NOT EXISTS "` + dataObj["form"]["form_id"] + `" (id int4 NOT NULL DEFAULT nextval('id_seq'::regclass), user_updated varchar, user_created jsonb, date_updated timestamp, date_created timestamp, pdf text, data jsonb, PRIMARY KEY (id))`)
  }

  const newFormID = await client.query(`INSERT INTO "` + dataObj["form"]["form_id"] + `" (user_created, date_created, data) VALUES ('` + userCreated + `', '` + dataObj["date"] + `', '` + dataObj['data'] + `') RETURNING id`)

  const dataID = newFormID.rows[0].id
  const path = filePath + docID + dataID
  const pdfLink = dataObj["form"]["id"] + dataID + '.pdf'

  await client.query(`UPDATE "` + dataObj["form"]["form_id"] + `" SET pdf = '` + pdfLink + `' WHERE id = '` + dataID + `'`)
  await client.query(`UPDATE form SET is_data = true WHERE form_id = '` + dataObj["form"]["form_id"] + `'`)

  if (dataObj.correctiveActions && dataObj.correctiveActions.length > 0) {
    dataObj.correctiveActions.forEach(action => {
      client.query(`INSERT INTO inspection(form_id, data_id, action_item, corrective_action, corrective_action_label, type, location, date_requested, date_completed, person_responsible) VALUES ( '` + dataObj["form"]["form_id"] + `', ` + dataID + `, '` + action["actionItem"] + `', '` + `, '` + action["correctiveActionRequired"] + `', '` + action["label"] + `', '` + action["type"] + `', '` + dataObj.location + `', '` + action["dateToComplete"] + `', '` + action["dateCompleted"] + `', '` + action["personResponsible"] + `')`)
    })
  }

  const comments = [{
    "date": dataObj["date"],
    "message": "Created by " + dataObj["user"]["email"]
  }]

  const formData = await client.query(`SELECT * FROM "` + dataObj["form"]["form_id"] + `" WHERE id = $1`, [dataID])
  const reportData = formData.rows[0]

  // store base64 for update to document later
  if (dataObj["pics"].length > 0) {
    let pics = []
    fs.mkdir(filePath + docID + dataID, (err) => {
      if (err) return err
    })

    dataObj["pics"].forEach((element, index) => {
      let base64Data = `"` + element.replace(/^data:image\/jpeg;base64,/, "")
      const buffer = Buffer.from(base64Data, "base64")
      fs.writeFile(path + '/' + index + '.jpeg', buffer, (err) => {
        if (err) return err
      })
      pics.push({ image: element, width: 500 })
    })

    buildPDFReport(docID, path, reportData, comments, pics)
  }
  else buildPDFReport(docID, path, reportData, comments)

  client.release()
  await pool.end()

  return dataID
}

module.exports = {
  dataReadSQL, formReadSQL, formSignSQL, dataCreateSQL, dataUpdateSQL, dataDeleteSQL, listsGetSQL, emailsGetSQL, listSaveSQL, dataSyncSQL
}

