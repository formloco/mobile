const { allNotificationSQL, myNotificationSQL, countNotificationSQL, createNotificationSQL, updateNotificationSQL, updateReadSQL } = require('../db/notificationDB')

const allNotification = async() => {
  try {
    let data = await allNotificationSQL()
    return data
  } catch(e) {
    throw new Error(e.message)
  }
}

const myNotification = async(email) => {
  try {
    let data = await myNotificationSQL(email)
    return data
  } catch(e) {
    throw new Error(e.message)
  }
}

const countNotification = async(email) => {
  try {
    let data = await countNotificationSQL(email)
    return data
  } catch(e) {
    throw new Error(e.message)
  }
}

const createNotification = async(data) => {
  try {
    let rows = await createNotificationSQL(data)
    return rows
  } catch(e) {
    throw new Error(e.message)
  }
}

const updateNotification = async(data) => {
  try {
    let rows = await updateNotificationSQL(data)
    return rows
  } catch(e) {
    throw new Error(e.message)
  }
}

const updateRead = async(data) => {
  try {
    await updateReadSQL(data)
    return
  } catch(e) {
    throw new Error(e.message)
  }
}

module.exports = {
  allNotification, myNotification, countNotification, createNotification, updateNotification, updateRead
}
