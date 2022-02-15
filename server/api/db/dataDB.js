const vehicleInspectionPDF = require('../report/vehicleInspection')
const meaningfulSiteTourPDF = require('../report/meaningfulSiteTour')
const spotCheckSafetyPDF = require('../report/spotCheckSafety')
const worksiteSafetyInspectionPDF = require('../report/worksiteSafetyInspection')

const moment = require('moment')
const { Pool } = require('pg')

let currentPath = process.cwd().slice(0, -3)
let docPath = currentPath + 'files/'

const fs = require('fs')

const pool = new Pool({
  user: process.env.DBUSER,
  host: process.env.HOST,
  database: process.env.TENANT,
  password: process.env.PASSWORD,
  port: process.env.PORT
})

function buildPDFReport(docID, form_id, pdfPath, dataID, pics, signDate, comments) {

  if (docID == 'vehicle-inspection') {
    vehicleInspectionPDF(form_id, pdfPath, dataID, pics, signDate, comments), (err) => {
      if (err) return err
    }
  }

  if (docID == 'worksite-safety-inspection') {
    worksiteSafetyInspectionPDF(form_id, pdfPath, dataID, pics, signDate, comments), (err) => {
      if (err) return err
    }
  }

  if (docID == 'spot-check-safety') {
    
    spotCheckSafetyPDF(form_id, pdfPath, dataID, pics, signDate, comments), (err) => {
      if (err) return err
    }
  }

  if (docID == 'meaningful-site-tour') {
    meaningfulSiteTourPDF(form_id, pdfPath, dataID, pics, signDate, comments), (err) => {
      if (err) return err
    }
  }

}

const dataReadSQL = async (tenant_id, form_id) => {
  let client = await pool.connect()
  let data = []
  let tableExist = await client.query(`SELECT EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename  = '` + form_id + `')`)
  if (tableExist.rows[0].exists) {
    let formData = await client.query(`SELECT * FROM "` + form_id + `" ORDER BY id`)
    data = formData.rows
  }
  return data
}

const formReadSQL = async (form_id, data_id) => {
  let client = await pool.connect()
  let formData = await client.query(`SELECT * FROM "` + form_id + `" WHERE id = $1`, [data_id])

  client.release()
  return formData.rows[0]
}

const formSignSQL = async (data) => {
  let client = await pool.connect()

  await client.query('UPDATE notification SET date_signed = $1, signed = true, email_signed = $2, signed_name = $3 WHERE id = $4', [new Date().toLocaleString("en-US", { timeZone: "America/Edmonton" }), data["email"], data["name"], data["notificationID"]])

  let comment = await client.query('SELECT comment FROM notification WHERE id = $1', [data["notificationID"]])
  let comments = comment.rows[0]["comment"]
  client.release()

  const pdfPath = docPath + data["docName"] + '.pdf'

  fs.unlink(pdfPath, (err) => {
    if (err) return err
  })

  let pics = []
  let fileNames = []
  const dirname = docPath + data["docName"] + '/'

  if (fs.existsSync(dirname)) {
    fileNames = fs.readdirSync(dirname)
    fileNames.forEach(file => {
      const content = fs.readFileSync(dirname + file)
      pics.push(content)
    })
  }

  buildPDFReport(data["docID"], data["formID"], pdfPath, data["dataID"], pics, data["date"], comments)

  return data["dataID"]
}

const dataCreateSQL = async (dataObj) => {

  let client = await pool.connect()

  const docID = dataObj["formObj"]["form"]["id"]

  let obj = ``

  if (dataObj.data) {
    // array index 5 is the data object from the client
    // escape speech data is needed for insert into json obj
    // strings that contain single quote => ' = ''
    dataObj.data[5] = dataObj.data[5].replace(/'/g, "''")

    dataObj.data.forEach(element => {
      obj = obj + `'` + element + `',`
    })
    obj = obj.slice(0, -1)
  }
  else obj = `'` + dataObj["user"]["email"] + `'` + ',' + `'` + moment().format('YYYYMMDD, h:mm:ss') + `'`

  let tableExist = await client.query(`SELECT EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename  = '` + dataObj["formObj"]["form_id"] + `')`)
  // check to see if main form structure exists, if not create it
  if (!tableExist.rows[0].exists) {
    let formJSON = JSON.stringify(dataObj["formObj"]["form"])
    let columns = dataObj["formObj"]["form"]["columns"].replace(/`/g, "'")

    let user_created = {
      email: dataObj["user"]["email"],
      date_created: new Date()
    }
    let userCreated = JSON.stringify(user_created)

    await client.query(`INSERT INTO form(form_id, form, pin, tenant_id, is_published, is_data, user_created, type, name) VALUES ( '` + dataObj["formObj"]["form_id"] + `', '` + formJSON + `', '` + dataObj["formObj"]["form"]["pin"] + `', '` + dataObj["user"]["tenant_id"] + `', ` + dataObj["formObj"]["is_published"] + `, ` + dataObj["formObj"]["is_data"] + `, '` + userCreated + `', '` + dataObj["type"] + `', '` + dataObj["name"] + `')`)
    await client.query(`CREATE SEQUENCE IF NOT EXISTS id_seq`)
    await client.query(`CREATE TABLE IF NOT EXISTS "` + dataObj["formObj"]["form_id"] + `" (` + columns + `)`)
  }

  // insert new form with data
  const newFormID = await client.query(`INSERT INTO "` + dataObj["formObj"]["form_id"] + `" (` + dataObj["columns"] + `) VALUES (` + obj + `) RETURNING id`)
  const dataID = newFormID["rows"]["0"]["id"]

  if (dataObj.correctiveActions && dataObj.correctiveActions.length > 0) {

    dataObj.correctiveActions.forEach(action => {
      client.query(`INSERT INTO inspection(form_id, data_id, corrective_action, corrective_action_label, type, location, date_requested, date_completed, person_responsible) VALUES ( '` + dataObj["formObj"]["form_id"] + `', ` + dataID + `, '` + action["correctiveActionRequired"] + `', '` + action["label"] + `', '` + action["type"] + `', '` + dataObj.location + `', '` + action["dateToComplete"] + `', '` + action["dateCompleted"] + `', '` + action["personResponsible"] + `')`)
    })

  }

  // ensure form meta data is set to is_data = true
  await client.query(`UPDATE form SET is_data = true WHERE form_id = '` + dataObj["formObj"]["form_id"] + `'`)

  // pdfPath for database link
  const pdfPath = docPath + docID + dataID + '.pdf'
  const pdfLink = dataObj.formObj.form.id + dataID + '.pdf'

  // update form data with path to pdf
  await client.query(`UPDATE "` + dataObj["formObj"]["form_id"] + `" SET pdf = '` + pdfLink + `' WHERE id = ` + dataID)

  let pics = JSON.parse(dataObj["pics"])

  // store base64 for update to document later
  if (pics.length > 0) {
    fs.mkdir(docPath + docID + dataID, (err) => {

      if (err) return err

      // write image file
      pics.forEach((element, index) => {
        let imgData = JSON.stringify(element)
        let base64Data = `"` + imgData.slice(24)
        const buffer = Buffer.from(base64Data, "base64")
        let cnt = index + 1
        fs.writeFile(docPath + docID + dataID + '/' + cnt, buffer, (err) => {
          if (err) return err
        })
      })
    })
  }

  const comments = [{
    "date": dataObj["date"],
    "message": "Created by " + dataObj["user"]["email"]
  }]

  client.release()

  buildPDFReport(docID, dataObj["formObj"]["form_id"], pdfPath, dataID, pics, null, comments)

  return dataID
}

// updates list item
const dataUpdateSQL = async (dataObj) => {

  if (!dataObj.data)
    return { message: 'Nothing to Update' }

  let formJSON = JSON.stringify(dataObj.data)
  // escape single quote
  formJSON = formJSON.replace(/'/g, "''")

  let client = await pool.connect()

  await client.query(`UPDATE "` + dataObj.form_id + `" SET date_updated = '` + dataObj.date + `', data = '` + formJSON + `' WHERE id = ` + dataObj.data_id)

  const docId = dataObj.data.id
  if (dataObj.data.correctiveAction && dataObj.data.correctiveAction.length > 0) {
    await client.query(`DELETE inspection WHERE form_id = '` + form.form_id + `')`)

    for (let j = 0; j < dataObj.data.correctiveAction.length; j++) {
      await client.query(`INSERT INTO inspection(form_id, data_id, corrective_action, corrective_action_label, type, location, date_requested, date_completed, person_responsible) VALUES ( '` + dataObj["formObj"]["form_id"] + `', ` + dataObj.data_id + `, '` + action["correctiveActionRequired"] + `', '` + action["label"] + `', '` + action["type"] + `', '` + dataObj.location + `', '` + action["dateToComplete"] + `', '` + action["dateCompleted"] + `', '` + action["personResponsible"] + `')`)
    }
  }

  client.release()

  const directory = docPath + dataObj.id + dataObj.data_id

  let count = 0
  fs.readdir(directory, (err, files) => {
    if (err) return;
    count = files.length
  });

  // store base64 for update to document later
  if (dataObj.pics.length > 0) {
    fs.mkdir(directory, (err) => {
      if (err) return
    })

    // let pics = JSON.parse(dataObj["pics"])

    dataObj.pics.forEach((element) => {
      let base64Data = `"` + element.slice(24)
      const buffer = Buffer.from(base64Data, "base64")
      fs.writeFile(directory + '/' + count, buffer, (err) => {
        if (err) return
      })

    })
  }

  const pdfPath = docPath + dataObj.id + dataObj.data_id + '.pdf'

  const comments = [{
    "date": dataObj.data.header.Date,
    "message": "Updated by " + dataObj.data.header.Worker
  }]

  buildPDFReport(dataObj.id, dataObj.form_id, pdfPath, dataObj.data_id, dataObj.pics, null, comments)

  return { message: 'Report Update Successful' }
}

// deletes list item
const dataDeleteSQL = async (data) => {
  let client = await pool.connect()
  const form = await client.query('SELECT form_id FROM form WHERE name = $1', [data["name"]])
  await client.query(`DELETE FROM "` + form.rows[0]["form_id"] + `" WHERE id = ` + data["id"])
  let updatedData = await client.query(`SELECT * FROM "` + form.rows[0]["form_id"] + `"`)
  return updatedData.rows
}

const listsGetSQL = async (data) => {
  let client = await pool.connect()

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

  return listArray
}

const emailsGetSQL = async (data) => {
  let client = await pool.connect()
  const list = await client.query(`SELECT * FROM email`)
  client.release()
  return list.rows
}

const listSaveSQL = async (data) => {
  let client = await pool.connect()
  const form = await client.query('SELECT form_id FROM form WHERE name = $1', [data["name"]])
  await client.query(`INSERT INTO "` + form.rows[0]["form_id"] + `" (data) VALUES ('` + data["value"] + `')`)
  let updatedData = await client.query(`SELECT * FROM "` + form.rows[0]["form_id"] + `"`)
  client.release()
  return updatedData.rows
}

module.exports = {
  dataReadSQL, formReadSQL, formSignSQL, dataCreateSQL, dataUpdateSQL, dataDeleteSQL, listsGetSQL, emailsGetSQL, listSaveSQL
}

