const express = require('express')
const router = express.Router()
const Work = require('../models/work.model')
const Trend = require('../models/trend.model')
const Arch = require('../models/architect.model')
const Comment = require('../models/comment.model')

router.get('/works', (req, res, next) => {
  Work.find({ isVerified: true })
    .then((allWorks) => {
      res.json({ allWorks })
    })
    .catch((err) => {
      next(new Error(err))
    })
})

router.get('/works/:id', (req, res, next) => {
  Work.findById(req.params.id)
    .then((work) => {
      res.json({ work })
    })
    .catch((err) => {
      next(new Error(err))
    })
})

module.exports = router
