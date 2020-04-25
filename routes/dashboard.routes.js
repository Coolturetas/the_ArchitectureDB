const express = require('express')
const router = express.Router()
const Architect = require('./../models/architect.model')
const Trend = require('./../models/trend.model')
const User = require('./../models/user.model')
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

//Access to dashboard

router.get('/', checkAuth, (req, res, next) =>
  res.render('./dashboard/index', { user: req.user })
)

module.exports = router
