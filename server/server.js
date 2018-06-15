const express = require('express')
const app = express()
const errorhandler = require('errorhandler')
const mongoose = require('mongoose')
const logger = require('morgan')
const bodyParser = require('body-parser')

const port = 8081
const indexRouter = require('./routes/userRouter.js')
const apiRouter = require('./routes/apiRouter.js')

app.disable('x-powered-by')

mongoose.connect('mongodb://localhost/test')
  .then(function () {console.log('Connection successful!')})
  .catch(function(err) { console.error(err) } )

app.use(logger('dev'))
app.use(bodyParser.json())

// use only in development
if (process.env.NODE_ENV == 'development') {
  app.use(errorhandler())
}

app.use('/', indexRouter)
app.use('/api', apiRouter)

app.listen(port, function() {
  console.log(`Listening on port ${port}`)
})
