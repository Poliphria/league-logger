const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt')
const User = require('../models/UserModel')
const saltRounds = 10

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

  User.findOne({ email: loginInfo.email}, function (err, user) {
    if (err) return res.status(500).json({ message: 'Internal server error' })
    bcrypt.compare(loginInfo.password, user.password, function(err, isMatch) {
      if (err) return res.status(500).json({ message: 'Internal server error' })
      if (isMatch) res.status(302).redirect('/home')
      else return res.status(401).json({ message: 'Login info is incorrect'})  
    })
  })
})

router.get('/register', function(req, res) {
  res.json({
    message: 'This is the register page'
  })
})

router.post('/register', function(req, res) {
  let userInfo = req.body

  bcrypt.genSalt(saltRounds, function(err, salt) {
    if (err) {
      res.status(500).json({ message: 'Internal server error' })
    }
    bcrypt.hash(userInfo.password, salt, function(err, hash) {
      let newUser = new User({
        email: userInfo.email,
        password: hash
      })

      newUser.save(function(err) {
          if (err) return res.status(500).json({ message: err })
          console.log('User saved')
      })
    })
  })

  res.status(302).json({ 
    message: 'You registered!'
  })
})

module.exports = router

