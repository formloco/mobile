const jwt = require('jsonwebtoken')
const bcrypt  = require('bcryptjs')
const { logger } = require('../../winston')

const { userFetchSQL, emailResetSQL, passwordResetSQL, emailUpdateSQL, emailCreateSQL, emailDisableSQL, emailEnableSQL, emailRegisterSQL, permissionGetSQL, emailSignupSQL, tenantFetchSQL, signinKioskeSQL } = require('../db/authDB')

const tokenTemp = async() => {
  try {
    let token = jwt.sign({ id: .369 }, process.env.SECRET, {expiresIn: 86400})
    return { token: token }
  } catch(e) {
    logger.error('Failed temp token.', 'auth', 'tempToken')
    throw new Error(e.message)
  }
}

const userFetch = async(data) => {
  try {
    let row = await userFetchSQL(data)
    return row
  } catch(e) {
    logger.error('Failed user fetch.', 'auth', 'userFetch')
    throw new Error(e.message)
  }
}

const emailReset = async(data) => {
  try {
    let rows = await emailResetSQL(data)
    return rows
  } catch(e) {
    logger.error('Failed email reset.', 'auth', 'emailReset')
    throw new Error(e.message)
  }
}

const passwordReset = async(data) => {
  try {
    let obj = await passwordResetSQL(data)
    return obj
  } catch(e) {
    logger.error('Failed password reset.', 'auth', 'passwordReset')
    throw new Error(e.message)
  }
}

const emailEnable = async(data) => {
  try {
    let rows = await emailEnableSQL(data)
    return rows
  } catch(e) {
    logger.error('Failed email enable.', 'auth', 'emailEnable')
    throw new Error(e.message)
  }
}

const emailDisable = async(data) => {
  try {
    let rows = await emailDisableSQL(data)
    return rows
  } catch(e) {
    logger.error('Failed email disable.', 'auth', 'emailDisable')
    throw new Error(e.message)
  }
}

const emailUpdate = async(data) => {
  try {
    let rows = await emailUpdateSQL(data)
    return rows
  } catch(e) {
    logger.error('Failed email update.', 'auth', 'emailUpdate')
    throw new Error(e.message)
  }
}

const emailCreate = async(data) => {
  try {
    let rows = await emailCreateSQL(data)
    return rows
  } catch(e) {
    logger.error('Failed email create.', 'auth', 'emailCreate')
    throw new Error(e.message)
  }
}

const emailRegister = async(data) => {
  try {
    let row = await emailRegisterSQL(data)
    return row
  } catch(e) {
    logger.error('Failed email register.', 'auth', 'emailRegister')
    throw new Error(e.message)
  }
}

const permissionGet = async(data) => {
  try {
    let rows = await permissionGetSQL(data)
    return rows
  } catch(e) {
    logger.error('Failed permission get.', 'auth', 'permissionGet')
    throw new Error(e.message)
  }
}

const emailSignup = async(data) => {
  try {
    return await emailSignupSQL(data)
  } catch(e) {
    logger.error('Failed email ssign up.', 'auth', 'emailSignup')
    throw new Error(e.message)
  }
}

const tenantFetch = async(data) => {
  try {
    let rows = await tenantFetchSQL(data)
    return rows
  } catch(e) {
    logger.error('Failed tenant fetch.', 'auth', 'tenantFetch')
    throw new Error(e.message)
  }
}

const signinKioske = async(data) => {
  try {
    let obj = await signinKioskeSQL(data)
    return obj
  } catch(e) {
    logger.error('Failed signin kioske.', 'auth', 'signinKioske')
    throw new Error(e.message)
  }
}



module.exports = {
  tokenTemp, userFetch, emailReset, passwordReset, emailDisable, emailEnable, emailUpdate, emailCreate, emailRegister, permissionGet, emailSignup, tenantFetch, signinKioske
}
