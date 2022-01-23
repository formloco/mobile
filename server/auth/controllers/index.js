
const { tokenTemp, userFetch, emailReset, passwordReset, emailDisable, emailEnable, emailUpdate, emailCreate, emailRegister, permissionGet } = require('../services')

const tempToken = async(req, res) => {
  try {
    let data = await tokenTemp()
    res.status(201).json(data)
  } catch(e) {
    res.sendStatus(500)
  }
}

const fetchUser = async(req, res) => {
  try {
    let data = await userFetch(req.body)
    res.status(201).json(data)
  } catch(e) {
    res.sendStatus(500)
  }
}

const resetEmail = async(req, res) => {
  try {
    let data = await emailReset(req.body)
    res.status(201).json(data)
  } catch(e) {
    res.sendStatus(500)
  }
}

const resetPassword = async(req, res) => {
  try {
    let data = await passwordReset(req.body)
    res.status(201).json(data)
  } catch(e) {
    res.sendStatus(500)
  }
}

const enableEmail = async(req, res) => {
  try {
    let data = await emailEnable(req.body)
    res.status(201).json(data)
  } catch(e) {
    res.sendStatus(500)
  }
}

const disableEmail = async(req, res) => {
  try {
    let data = await emailDisable(req.body)
    res.status(201).json(data)
  } catch(e) {
    res.sendStatus(500)
  }
}

const updateEmail = async(req, res) => {
  try {
    let data = await emailUpdate(req.body)
    res.status(201).json(data)
  } catch(e) {
    res.sendStatus(500)
  }
}

const createEmail = async(req, res) => {
  try {
    let data = await emailCreate(req.body)
    res.status(201).json(data)
  } catch(e) {
    res.sendStatus(500)
  }
}

const registerEmail = async(req, res) => {
  try {
    let data = await emailRegister(req.body)
    let code = 201
    if (!data.row) code = 401
    res.status(code).json(data)
  } catch(e) {
    res.sendStatus(500)
  }
}

const getPermission = async(req, res) => {
  try {
    let data = await permissionGet(req.body)
    let code = 201
    if (!data.row) code = 401
    res.status(code).json(data)
  } catch(e) {
    res.sendStatus(500)
  }
}

module.exports = {
  tempToken, fetchUser, resetEmail, resetPassword, disableEmail, enableEmail, updateEmail, createEmail, registerEmail, getPermission
}
