
const { formsRead, formRead, formCreate, formRegister, formPublish, formPermission } = require('../services/formService')

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

const publishForm = async(req, res) => {
  try {
    let data = await formPublish(req.body)
    res.status(201).json({rows: data, "message": "Form published."})
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
  readForms, readForm, createForm, registerForm, publishForm, permissionForm
}