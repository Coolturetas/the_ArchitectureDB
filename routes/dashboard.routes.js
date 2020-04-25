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

router.get('/validate', checkIsInRole("editor", "admin"), (req, res, next) => {
  res.render("./dashboard/validation-screen")
})

module.exports = router
