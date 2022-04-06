
const { formsRead, formRead, formCreate, formRegister, formStatus, formUpdate, formPermission } = require('../services/formService')

const readForms = async(req, res) => {
  try {
    let data = await formsRead(req.body)
    res.status(201).json(data)
  } catch(e) {
    res.sendStatus(500)
  }
}

const readForm = async(req, res) => {
  try {
    let data = await formRead(req.params.form_id, req.params.data_id)
    res.status(201).json(data)
  } catch(e) {
    res.sendStatus(500)
  }
}

const createForm = async(req, res) => {
  try {
    await formCreate(req.body)
    res.status(201).json({"message": "Form created."})
  } catch(e) {
    res.sendStatus(500)
  }
}

const registerForm = async(req, res) => {
  try {
    let data = await formRegister(req.body)
    res.status(201).json({rows: data, "message": "Form registered."})
  } catch(e) {
    res.sendStatus(500)
  }
}

const statusForm = async(req, res) => {
  try {
    let data = await formStatus(req.body)
    res.status(201).json(data)
  } catch(e) {
    res.sendStatus(500)
  }
}

const updateForm = async(req, res) => {
  try {
    let data = await formUpdate(req.body)
    res.status(201).json(data)
  } catch(e) {
    res.sendStatus(500)
  }
}

const permissionForm = async(req, res) => {
  try {
    let data = await formPermission(req.body)
    res.status(201).json({rows: data, "message": "Permissions set."})
  } catch(e) {
    res.sendStatus(500)
  }
}

module.exports = {
  readForms, readForm, createForm, registerForm, statusForm, updateForm, permissionForm
}