const bcrypt = require('bcrypt')
const User = require('../models/UserModel')
const saltRounds = 10

module.exports = function(userInfo) {
    let s = bcrypt.genSalt(saltRounds, function(err, salt) {
        if (err) return err
        bcrypt.hash(userInfo.password, salt, function(err, hash) {
            if (err) return err
            let newUser = new User({
                email: userInfo.email,
                password: hash
            })

            newUser.save(function(err, result) {
                if (err) return err
                console.log(result)
            })
        })

    })
}