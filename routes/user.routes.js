const express = require('express')
const router = express.Router()
const User = require('../models/user.model')
const cloudUploader = require('../configs/cloudinary.config')

router.get('/:id', (req, res, next) => {
  User.findById(req.params.id)
    .then((user) => {
      res.render('./user/details', user)
    })
    .catch((err) => {
      next(new Error(err))
    })
})

module.exports = router
