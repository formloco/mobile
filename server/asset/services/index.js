const fs = require('fs')

const { assetsGetSQL, assetGetSQL, logGetSQL, categoryGetSQL, statusGetSQL, assetUpdateSQL, assetCreateSQL, assetDeleteSQL, markerAddSQL, markerDeleteSQL } = require('../db')

const assetsGet = async(tenant_id) => {
  try {
    let data = await assetsGetSQL(tenant_id)
    return data
  } catch(e) {
    throw new Error(e.message)
  }
}

const assetGet = async(id) => {
  try {
    let data = await assetGetSQL(id)
    return data
  } catch(e) {
    throw new Error(e.message)
  }
}

const logGet = async(tenant_id, page_size, page_index) => {
  try {
    let data = await logGetSQL(tenant_id, page_size, page_index)
    return data
  } catch(e) {
    throw new Error(e.message)
  }
}

const categoryGet = async(tenant_id) => {
  try {
    let data = await categoryGetSQL(tenant_id)
    return data
  } catch(e) {
    throw new Error(e.message)
  }
}

const statusGet = async(id) => {
  try {
    let data = await statusGetSQL(id)
    return data
  } catch(e) {
    throw new Error(e.message)
  }
}

const assetUpdate = async(data) => {
  try {
    let rows = await assetUpdateSQL(data)
    return rows
  } catch(e) {
    throw new Error(e.message)
  }
}

const assetCreate = async(data) => {
  try {
    let rows = await assetCreateSQL(data)
    return rows
  } catch(e) {
    throw new Error(e.message)
  }
}

const assetDelete = async(data) => {
  try {
    let rows = await assetDeleteSQL(data)
    return rows
  } catch(e) {
    throw new Error(e.message)
  }
}

const markerAdd = async(data) => {
  try {
    let rows = await markerAddSQL(data)
    return rows
  } catch(e) {
    throw new Error(e.message)
  }
}

const markerDelete = async(data) => {
  try {
    let rows = await markerDeleteSQL(data)
    return rows
  } catch(e) {
    throw new Error(e.message)
  }
}

module.exports = {
  assetsGet, assetGet, logGet, categoryGet, statusGet, assetUpdate, assetCreate, assetDelete, markerAdd, markerDelete
}
