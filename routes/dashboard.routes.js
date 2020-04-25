const express = require('express')
const router = express.Router()
const Architect = require('./../models/architect.model')
const Trend = require('./../models/trend.model')
const User = require('./../models/user.model')
const passport = require('passport')

const checkIsInRole = (...roles) => (req, res, next) => {
  if (!req.user) {
    return res.redirect('/login')
  }

  const hasRole = roles.find((role) => req.user.role === role)
  if (!hasRole) {
    return res.redirect('/login')
  }

  return next()
}

function checkAuth(req, res, next) {
  return req.isAuthenticated() ? next() : res.redirect('/login')
}

//Access to dashboard

router.get('/', checkAuth, (req, res, next) =>
  res.render('./dashboard/index', { user: req.user })
)

//access to validation screen

router.get('/validate', checkIsInRole('editor', 'admin'), (req, res, next) => {
  const architectPromise = Architect.find({ isVerified: false })
  const trendPromise = Trend.find({ isVerified: false })

  Promise.all([architectPromise, trendPromise])
    .then((results) => {
      res.render('./dashboard/validation-screen', {
        architects: results[0],
        trends: results[1],
      })
    })
    .catch((err) => {
      next(new Error(err))
    })
})

//Acceptance-Rejection

router.post(
  '/architects/accept/:id',
  checkIsInRole('editor', 'admin'),
  (req, res, next) => {
    Architect.findByIdAndUpdate(
      req.params.id,
      { isVerified: true },
      { new: true }
    )
      .then(() => {
        res.redirect('/dashboard/validate')
      })
      .catch((err) => {
        next(new Error(err))
      })
  }
)

router.post(
  '/trends/accept/:id',
  checkIsInRole('editor', 'admin'),
  (req, res, next) => {
    Trend.findByIdAndUpdate(req.params.id, { isVerified: true }, { new: true })
      .then(() => {
        res.redirect('/dashboard/validate')
      })
      .catch((err) => {
        next(new Error(err))
      })
  }
)

router.post(
  '/architects/reject/:id',
  checkIsInRole('editor', 'admin'),
  (req, res, next) => {
    Architect.findByIdAndDelete(req.params.id)
      .then(() => {
        res.redirect('/dashboard/validate')
      })
      .catch((err) => {
        next(new Error(err))
      })
  }
)

router.post(
  '/trends/reject/:id',
  checkIsInRole('editor', 'admin'),
  (req, res, next) => {
    Trend.findByIdAndDelete(req.params.id)
      .then(() => {
        res.redirect('/dashboard/validate')
      })
      .catch((err) => {
        next(new Error(err))
      })
  }
)

module.exports = router
