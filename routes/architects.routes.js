const express = require('express')
const router = express.Router()
const Architect = require('./../models/architect.model')

//Creation

router.get('/create', (req, res, next) => {
  res.render('./architects/create')
})

router.post('/create', (req, res, next) => {
  const { name, country, flagshipWork } = req.body

  Architect.create({ name, country, flagshipWork })
    .then(() => {
      res.redirect('/architects')
    })
    .catch((err) => {
      next(new Error(err))
    })
})

//Listing and detail view

router.get('/', (req, res, next) => {
  Architect.find()
    .then((architects) => {
      res.render('./architects/index', { architects })
    })
    .catch((err) => {
      next(new Error(err))
    })
})

router.get('/:id', (req, res, next) => {
  Architect.findById(req.params.id)
    .then((architect) => {
      res.render('./architects/detail', architect)
    })
    .catch((err) => {
      next(new Error(err))
    })
})

module.exports = router
