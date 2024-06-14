 const CosmosClient = require('@azure/cosmos').CosmosClient
 const config = require('./config')
 const waqqlyList = require('./routes/waqqlyList')
 const waqqlyDAO = require('./models/waqqlyDAO')

 const express = require('express')
 const path = require('path')
 const logger = require('morgan')
 const cookieParser = require('cookie-parser')
 const bodyParser = require('body-parser')

 const app = express()

 app.set('views', path.join(__dirname, 'views'))
 app.set('view engine', 'jade')

 app.use(logger('dev'))
 app.use(bodyParser.json())
 app.use(bodyParser.urlencoded({ extended: false }))
 app.use(cookieParser())
 app.use(express.static(path.join(__dirname, 'public')))

 const cosmosClient = new CosmosClient({
   endpoint: config.host,
   key: config.authKey
 })
 const WaqqlyDAO = new waqqlyDAO(cosmosClient, config.databaseId, config.containerId)
 const WaqqlyList = new waqqlyList(WaqqlyDAO)
 WaqqlyDAO
   .init(err => {
     console.error(err)
   })
   .catch(err => {
     console.error(err)
     console.error(
       'Shutting down because there was an error settinig up the database.'
     )
     process.exit(1)
   })

 app.get('/', (req, res, next) => WaqqlyList.showWalkers(req, res).catch(next))
 app.post('/addtask', (req, res, next) => WaqqlyList.addWalker(req, res).catch(next))
 app.get('/completetask', (req, res, next) =>
   WaqqlyList.completeTask(req, res).catch(next)
 )
 app.set('view engine', 'jade')

 app.use(function(req, res, next) {
   const err = new Error('Not Found')
   err.status = 404
   next(err)
 })

 app.use(function(err, req, res, next) {
   res.locals.message = err.message
   res.locals.error = req.app.get('env') === 'development' ? err : {}

   res.status(err.status || 500)
   res.render('error')
 })

 module.exports = app