const express = require('express')
const router = express.Router()
const Work = require('../models/work.model')
const Trend = require('../models/trend.model')
const Arch = require('../models/architect.model')

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

router.get('/architects', (req, res, next) => {
  Arch.find({ isVerified: true })
    .then((allArchs) => {
      res.json({ allArchs })
    })
    .catch((err) => {
      next(new Error(err))
    })
})

router.get('/architects/:id', (req, res, next) => {
  Arch.findById(req.params.id)
    .then((arch) => {
      res.json({ arch })
    })
    .catch((err) => {
      next(new Error(err))
    })
})

router.get('/trend', (req, res, next) => {
  Trend.find({ isVerified: true })
    .then((allTrends) => {
      res.json({ allTrends })
    })
    .catch((err) => {
      next(new Error(err))
    })
})

router.get('/trend/:id', (req, res, next) => {
  Trend.findById(req.params.id)
    .then((trend) => {
      res.json({ trend })
    })
    .catch((err) => {
      next(new Error(err))
    })
})

module.exports = router
