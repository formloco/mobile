let currentPath = process.cwd().slice(0, -3)
let docPath = currentPath + 'files/'

const { dataRead, formRead, formSign, dataCreate, dataUpdate, dataDelete, listsGet, emailsGet, listSave, dataSync } = require('../services/dataService')

const readData = async(req, res) => {
  try {
    let data = await dataRead(req.params.tenant_id, req.params.form_id)
    res.status(201).json(data)
  } catch(e) {
    res.sendStatus(500)
  }
}

const readForm = async(req, res) => {
  try {
    let data = await formRead(req.params.tenant_id, req.params.form_id, req.params.data_id)
    res.status(201).json(data)
  } catch(e) {
    res.sendStatus(500)
  }
}

const signForm = async(req, res) => {
  try {
    await formSign(req.body)
    res.status(201).json({"message": "Form Signed"})
  } catch(e) {
    res.sendStatus(500)
  }
}

const createData = async(req, res) => {
  try {
    let id = await dataCreate(req.body)
    res.status(201).json(id)
  } catch(e) {
    res.sendStatus(500)
  }
}

const updateData = async(req, res) => {
  try {
    let data = await dataUpdate(req.body)
    res.status(201).json({data})
  } catch(e) {
    res.sendStatus(500)
  }
}

const deleteData = async(req, res) => {
  try {
    let data = await dataDelete(req.body)
    res.status(201).json({rows: data})
  } catch(e) {
    res.sendStatus(500)
  }
}

const getLists = async(req, res) => {
  try {
    let data = await listsGet(req.body)
    res.status(201).json(data)
  } catch(e) {
    res.sendStatus(500)
  }
}

const getEmails = async(req, res) => {
  try {
    let data = await emailsGet(req.body)
    res.status(201).json(data)
  } catch(e) {
    res.sendStatus(500)
  }
}

const saveList = async(req, res) => {
  try {
    let data = await listSave(req.body)
    res.status(201).json({rows: data})
  } catch(e) {
    res.sendStatus(500)
  }
}

const getPDF = async(req, res) => {
  const fileName = '../files/'+req.params.name+'.pdf'
  res.download(fileName, (err) => {
    if (err) {
      res.status(500).send({
        message: "Could not download the file. " + err,
      })
    }
  })
}

const syncData = async(req, res) => {
  try {
    let data = await dataSync(req.body)
    res.status(201).json({"message": "Data Sync'ed"})
  } catch(e) {
    res.sendStatus(500)
  }
}

module.exports = {
  readData, readForm, signForm, createData, updateData, deleteData, getLists, getEmails, saveList, getPDF, syncData
}
