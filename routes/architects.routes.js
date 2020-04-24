const express = require('express')
const router = express.Router()
const Architect = require('./../models/architect.model')

router.get('/', (req, res, next) => {
  Architect.find()
    .then((architects) => {
      res.render('./architects/index', { architects })
    })
    .catch((err) => {
      next(new Error(err))
    })
})

module.exports = router
