const { dataReadSQL, formReadSQL, formSignSQL, dataCreateSQL, dataUpdateSQL, dataDeleteSQL, listsGetSQL, emailsGetSQL, listSaveSQL } = require('../db/dataDB')
const { logger } = require('../../winston')

const dataRead = async(tenant_id, form_id) => {
  try {
    let data = await dataReadSQL(tenant_id, form_id)
    return data
  } catch(e) {
    logger.error('Failed data read.', 'api', 'dataRead')
    throw new Error(e.message)
  }
}

const formRead = async(tenant_id, form_id, data_id) => {
  try {
    let data = await formReadSQL(tenant_id, form_id, data_id)
    return data
  } catch(e) {
    logger.error('Failed form read.', 'api', 'formRead')
    throw new Error(e.message)
  }
}

const formSign = async(data) => {
  try {
    await formSignSQL(data)
    return
  } catch(e) {
    logger.error('Failed form read.', 'api', 'formRead')
    throw new Error(e.message)
  }
}

const dataCreate = async(data) => {
  try {
    let id = await dataCreateSQL(data)
    return id
  } catch(e) {
    logger.error('Failed data create.', 'api', 'dataCreate')
    throw new Error(e.message)
  }
}

const dataUpdate = async(data) => {
  try {
    let res = await dataUpdateSQL(data)
    return res
  } catch(e) {
    logger.error('Failed data update.', 'api', 'dataUpdate')
    throw new Error(e.message)
  }
}

const dataDelete = async(data) => {
  try {
    let rows = await dataDeleteSQL(data)
    return rows
  } catch(e) {
    logger.error('Failed data delete.', 'api', 'dataDelete')
    throw new Error(e.message)
  }
}

const listsGet = async(data) => {
  try {
    let rows = await listsGetSQL(data)
    return rows
  } catch(e) {
    logger.error('Failed get lists.', 'api', 'listsGet')
    throw new Error(e.message)
  }
}

const emailsGet = async(data) => {
  try {
    let rows = await emailsGetSQL(data)
    return rows
  } catch(e) {
    logger.error('Failed get emails.', 'api', 'emailsGet')
    throw new Error(e.message)
  }
}

const listSave = async(data) => {
  try {
    let rows = await listSaveSQL(data)
    return rows
  } catch(e) {
    logger.error('Failed list save.', 'api', 'listSave')
    throw new Error(e.message)
  }
}

const dataSync = async(data) => {
  try {
    let res = await dataSyncSQL(data)
    return res
  } catch(e) {
    logger.error('Failed data sync.', 'api', 'dataSync')
    throw new Error(e.message)
  }
}

module.exports = {
  dataRead, formRead, formSign, dataCreate, dataUpdate, dataDelete, listsGet, emailsGet, listSave, dataSync
}
