const express = require('express')
const cors = require('cors')
const app = express()
const routes = require('./routes')
const loadConfig = require('../config')
loadConfig()

app.use(express.json({limit: '500mb'}))
app.options('*', cors())
app.use(cors())
app.use(routes)
 
app.listen(9005, () => console.log('asset api listening on port 9005!'))
 
module.exports = {
  app
}
 