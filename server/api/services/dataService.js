const fs = require('fs')

const { dataReadSQL, formReadSQL, formSignSQL, dataCreateSQL, dataUpdateSQL, dataDeleteSQL, listsGetSQL, emailsGetSQL, listSaveSQL } = require('../db/dataDB')

const dataRead = async(tenant_id, form_id) => {
  try {
    let data = await dataReadSQL(tenant_id, form_id)
    return data
  } catch(e) {
    throw new Error(e.message)
  }
}

const formRead = async(tenant_id, form_id, data_id) => {
  try {
    let data = await formReadSQL(tenant_id, form_id, data_id)
    return data
  } catch(e) {
    throw new Error(e.message)
  }
}

const formSign = async(data) => {
  try {
    await formSignSQL(data)
    return
  } catch(e) {
    throw new Error(e.message)
  }
}

const dataCreate = async(data) => {
  try {
    let id = await dataCreateSQL(data)
    return id
  } catch(e) {
    throw new Error(e.message)
  }
}

const dataUpdate = async(data) => {
  try {
    let res = await dataUpdateSQL(data)
    return res
  } catch(e) {
    throw new Error(e.message)
  }
}

const dataDelete = async(data) => {
  try {
    let rows = await dataDeleteSQL(data)
    return rows
  } catch(e) {
    throw new Error(e.message)
  }
}

const listsGet = async(data) => {
  try {
    let rows = await listsGetSQL(data)
    return rows
  } catch(e) {
    throw new Error(e.message)
  }
}

const emailsGet = async(data) => {
  try {
    let rows = await emailsGetSQL(data)
    return rows
  } catch(e) {
    throw new Error(e.message)
  }
}

const listSave = async(data) => {
  try {
    let rows = await listSaveSQL(data)
    return rows
  } catch(e) {
    throw new Error(e.message)
  }
}

const fileGet = async(req, res) => {
  try {
    return res.download('../files/vechicle-inspection632.pdf')
  } catch(e) {
    throw new Error(e.message)
  }
}

const dataSync = async(data) => {
  try {
    let res = await dataSyncSQL(data)
    return res
  } catch(e) {
    throw new Error(e.message)
  }
}

module.exports = {
  dataRead, formRead, formSign, dataCreate, dataUpdate, dataDelete, listsGet, emailsGet, listSave, fileGet, dataSync
}
