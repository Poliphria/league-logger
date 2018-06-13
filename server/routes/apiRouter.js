const express = require('express')
const router = express.Router()

router.post('/', function(req, res) {
  res.json( {
    message: 'Message from \/api'
  })
})

module.exports = router
