let currentPath = process.cwd().slice(0, -3)
let docPath = currentPath + 'files/'

const { assetsGet, assetGet, logGet, categoryGet, statusGet, assetUpdate, assetCreate, assetDelete, markerAdd, markerDelete } = require('../services')

const getAssets = async(req, res) => {
  try {
    let data = await assetsGet(req.query.tenant_id)
    res.status(201).json(data)
  } catch(e) {
    res.sendStatus(500)
  }
}

const getAsset = async(req, res) => {
  try {
    let data = await assetGet(req.params.id)
    res.status(201).json(data)
  } catch(e) {
    res.sendStatus(500)
  }
}

const getLog = async(req, res) => {
  try {
    const data = await logGet(req.query.tenant_id, req.query.page_size, req.query.page_index)
    res.status(201).json(data)
  } catch(e) {
    res.sendStatus(500)
  }
}

const getCategory = async(req, res) => {
  try {
    const data = await categoryGet(req.query.tenant_id)
    res.status(201).json(data)
  } catch(e) {
    res.sendStatus(500)
  }
}

const getStatus = async(req, res) => {
  try {
    const data = await statusGet(req.query.tenant_id)
    res.status(201).json(data)
  } catch(e) {
    res.sendStatus(500)
  }
}

const updateAsset = async(req, res) => {
  try {
    const data = await assetUpdate(req.body)
    res.status(201).json(data)
  } catch(e) {
    res.sendStatus(500)
  }
}

const createAsset = async(req, res) => {
  try {
    await assetCreate(req.body)
    res.status(201).json({"message": "Form Signed"})
  } catch(e) {
    res.sendStatus(500)
  }
}

const deleteAsset = async(req, res) => {
  try {
    await assetDelete(req.body)
    res.status(201).json({"message": "Form Signed"})
  } catch(e) {
    res.sendStatus(500)
  }
}

const addMarker = async(req, res) => {
  try {
    await markerAdd(req.body)
    res.status(201).json({"message": "Form Signed"})
  } catch(e) {
    res.sendStatus(500)
  }
}

const deleteMarker = async(req, res) => {
  try {
    await markerDelete(req.body)
    res.status(201).json({"message": "Form Signed"})
  } catch(e) {
    res.sendStatus(500)
  }
}

module.exports = {
  getAssets, getAsset, getLog, getCategory, getStatus, getCategory, updateAsset, createAsset, deleteAsset, addMarker, deleteMarker
}
