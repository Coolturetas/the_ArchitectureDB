const express = require('express')
const router = express.Router()
const Architect = require('./../models/architect.model')
const passport = require('passport')

function checkAuth(req, res, next) {
  return req.isAuthenticated() ? next() : res.redirect('/login')
}

function checkRoles(role) {
  return function (req, res, next) {
    return req.isAuthenticated() && req.user.role === role
      ? next()
      : res.redirect('/login')
  }
}

//Creation

router.get('/create', checkAuth, (req, res, next) => {
  res.render('./architects/create')
})

router.post('/create', checkAuth, (req, res, next) => {
  const { name, country, flagshipWork } = req.body

  Architect.create({ name, country, flagshipWork })
    .then(() => {
      res.redirect('/architects')
    })
    .catch((err) => {
      next(new Error(err))
    })
})

//Edition

router.get('/edit/:id', checkAuth, (req, res, next) => {
  Architect.findById(req.params.id)
    .then((architect) => {
      res.render('./architects/edit', architect)
    })
    .catch((err) => {
      next(new Error(err))
    })
})

router.post('/edit/:id', checkAuth, (req, res, next) => {
  const { name, country, flagshipWork } = req.body

  Architect.findByIdAndUpdate(
    req.params.id,
    { name, country, flagshipWork },
    { new: true }
  )
    .then((architect) => {
      res.redirect(`/architects/view/${architect._id}`)
    })
    .catch((err) => {
      next(new Error(err))
    })
})

//Deletion

router.post('/delete/:id', checkAuth, (req, res, next) => {
  Architect.findByIdAndDelete(req.params.id)
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

router.get('/view/:id', (req, res, next) => {
  Architect.findById(req.params.id)
    .then((architect) => {
      res.render('./architects/detail', architect)
    })
    .catch((err) => {
      next(new Error(err))
    })
})

module.exports = router
