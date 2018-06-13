const mongoose = require('mongoose')
const Schema = mongoose.Schema

let UserSchema = new Schema({
  email: {type: String, required: true},
  password: {type: String, required: true},
  summonerName: String,
  verificationCode: String,
  summonerId: String,
  matches: Array,
  championStats: Array
})

let Users = mongoose.model('Users', UserSchema)

module.exports = Users
