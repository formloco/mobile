const express = require('express')
const cors = require('cors')
const app = express()
const routes = require('./routes')
const loadConfig = require('../config')

loadConfig()

app.use(express.json({limit: '500mb'}))
app.options('*', cors())
app.use(cors())
app.use(routes, cors());
 
app.listen(9006, () => console.log('form api listening on port 9006!'));
 
module.exports = {
  app
};
 