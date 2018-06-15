const express = require('express')
const router = express.Router()
const User = require('../models/UserModel.js')
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt')
const hash = require('../helpers/hash')

router.use(bodyParser.json())
router.use(bodyParser.urlencoded({
  extended: true
}))

router.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

router.get('/', function(req, res) {
  res.json({ message: 'Home page'})
})

router.get('/login', function(req, res) {
  res.send('This is the login page')
})

router.post('/login', function(req, res) {
  res.send('This is the login page')
})

router.post('/register', function(req, res) {
  let userInfo = req.body;

  hash(userInfo)

  res.json({
    message: 'You just registered!'
  })

})

module.exports = router

