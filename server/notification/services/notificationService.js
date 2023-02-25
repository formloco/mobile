const { allNotificationSQL, myNotificationSQL, countNotificationSQL, createNotificationSQL, updateNotificationSQL, updateReadSQL } = require('../db/notificationDB')
const { logger } = require('../../winston')

const allNotification = async(req) => {
  try {
    let data = await allNotificationSQL(req)
    return data
  } catch(e) {
    logger.error('Failed all notification.', 'notification', 'allNotification')
    throw new Error(e.message)
  }
}

const myNotification = async(req) => {
  try {
    let data = await myNotificationSQL(req)
    return data
  } catch(e) {
    logger.error('Failed all notification.', 'notification', 'allNotification')
    throw new Error(e.message)
  }
}

const countNotification = async(req) => {
  try {
    let data = await countNotificationSQL(req)
    return data
  } catch(e) {
    logger.error('Failed all notification.', 'notification', 'allNotification')
    throw new Error(e.message)
  }
}

const createNotification = async(data) => {
  try {
    let rows = await createNotificationSQL(data)
    return rows
  } catch(e) {
    logger.error('Failed all notification.', 'notification', 'allNotification')
    throw new Error(e.message)
  }
}

const updateNotification = async(data) => {
  try {
    let rows = await updateNotificationSQL(data)
    return rows
  } catch(e) {
    logger.error('Failed all notification.', 'notification', 'allNotification')
    throw new Error(e.message)
  }
}

const updateRead = async(data) => {
  try {
    await updateReadSQL(data)
    return
  } catch(e) {
    logger.error('Failed all notification.', 'notification', 'allNotification')
    throw new Error(e.message)
  }
}

module.exports = {
  allNotification, myNotification, countNotification, createNotification, updateNotification, updateRead
}
