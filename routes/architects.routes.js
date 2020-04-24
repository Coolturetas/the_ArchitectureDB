const express = require('express')
const router = express.Router()
const Architect = require('./../models/architect.model')

router.get("/", (req, res, next) => res.render("./architects/index"))

module.exports = router