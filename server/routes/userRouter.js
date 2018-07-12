const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const User = require('../models/UserModel.js')

router.use(bodyParser.json())
router.use(bodyParser.urlencoded({
  extended: true
}))

router.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

router.get('/home', function(req, res) {
  res.json({ message: 'Home page'})
})

router.get('/login', function(req, res) {
  res.json({
    message: 'This is the login page'
  })
})

router.post('/login', function(req, res) {
  let loginInfo = req.body
  let found = User.isMatch(loginInfo)
  
  console.log(found)
  
  if (found) {
    res.send({ message: 'You just logged in'})
  } else {
    res.send({ message: 'Incorrect login'})
  }
})

router.get('/register', function(req, res) {
  res.json({
    message: 'This is the register page'
  })
})

router.post('/register', function(req, res) {
  let userInfo = req.body
  
  if (userInfo === undefined) {
    console.log('User info is not defined')
    res.send({ message: 'user info is not defined'})
  } else if (!userInfo.email || userInfo.email.length === 0) {
    console.log('User email is empty')
    res.send({ message: 'User email is empty'})
  } else if (!userInfo.password || userInfo.password.length === 0) {
    console.log('User password is empty')
    res.send({ message: 'User password is empty'})
  }
  
  else {
    console.log(userInfo)
    
    User.newUser(userInfo)
    
    res.send({ message: 'You just registered!'})
  }
})

module.exports = router

