const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')
const saltRounds = 10;

let UserSchema = new Schema({
  email: {type: String, required: true},
  password: {type: String, required: true},
  summonerName: String,
  verified: {type: Boolean, default: false},
  verificationCode: String,
  summonerId: String,
  matches: Array,
  championStats: Array
})

let Users = mongoose.model('Users', UserSchema)

module.exports = Users

// Saves new user to database and hashes password
module.exports.newUser = function(user) {
   bcrypt.hash(user.password, saltRounds, function(err, hash) {
      if (err) return console.log(err)
      let newUser = new Users({
        email: user.email,
        password: hash
      })
    
      newUser.save(function(err, user) {
        if (err) return console.log(err)
        console.log(user)
      })
    })
}

module.exports.isMatch = function(userInfo) {
  let match = false
  Users.findOne({ email: userInfo.email}, function (err, user) {
    if (err) return console.log(err)
    bcrypt.compare(userInfo.password, user.password, function(err, res) {
      if (err) return console.log(err)
      if (res) match = true
    })
    return match
  })
}
