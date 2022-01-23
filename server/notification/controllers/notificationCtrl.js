
const { allNotification, myNotification, countNotification, createNotification, updateNotification, updateRead } = require('../services/notificationService')

const notificationAll = async(req, res) => {
  try{
    let data = await allNotification()
    res.status(201).json(data)
  }catch(e){
    res.sendStatus(500)
  }
}

const notificationMy = async(req, res) => {
  try{
    let data = await myNotification(req.params.email)
    res.status(201).json(data)
  }catch(e){
    res.sendStatus(500)
  }
}

const notificationCount = async(req, res) => {
  try{
    let data = await countNotification(req.params.email)
    res.status(201).json(data)
  }catch(e){
    res.sendStatus(500)
  }
}

const notificationCreate = async(req, res) => {
  try{
    let data = await createNotification(req.body)
    res.status(201).json({data: data, "message": "Notification Created"})
  }catch(e){
    res.sendStatus(500)
  }
}

const notificationUpdate = async(req, res) => {
  try{
    let data = await updateNotification(req.body)
    res.status(201).json({data: data, "message": "Notification Updated"})
  }catch(e){
    res.sendStatus(500)
  }
}

const readUpdate = async(req, res) => {
  try{
    await updateRead(req.body)
    res.status(201).json({"message": "Notification Updated"})
  }catch(e){
    res.sendStatus(500)
  }
}

module.exports = {
  notificationAll, notificationMy, notificationCount, notificationCreate, notificationUpdate, readUpdate
}
