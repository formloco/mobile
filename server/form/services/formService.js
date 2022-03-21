const { formsReadSQL, formReadSQL, formCreateSQL, formRegisterSQL, formStatusSQL, formUpdateSQL, formPermissionSQL } = require('../db/formDB')

const formsRead = async(data) => {
  try {
    let dataObj = await formsReadSQL(data)
    return dataObj
  } catch(e) {
    throw new Error(e.message)
  }
}

const formRead = async(form_id, data_id) => {
  try {
    let data = await formReadSQL(form_id, data_id)
    return data
  } catch(e) {
    throw new Error(e.message)
  }
}

const formCreate = async(data) => {
  try {
    await formCreateSQL(data)
  } catch(e) {
    throw new Error(e.message)
  }
}

const formRegister = async(data) => {
  try {
    let dataObj = await formRegisterSQL(data)
    return dataObj
  } catch(e) {
    throw new Error(e.message)
  }
}

const formStatus = async(data) => {
  console.log(data)
  try {
    let dataObj = await formStatusSQL(data)
    return dataObj
  } catch(e) {
    throw new Error(e.message)
  }
}

const formUpdate = async(data) => {
  try {
    let dataObj = await formUpdateSQL(data)
    return dataObj
  } catch(e) {
    throw new Error(e.message)
  }
}

const formPermission = async(data) => {
  try {
    let dataObj = await formPermissionSQL(data)
    return dataObj
  } catch(e) {
    throw new Error(e.message)
  }
}
module.exports = {
  formsRead, formRead, formCreate, formRegister, formStatus, formUpdate, formPermission
}