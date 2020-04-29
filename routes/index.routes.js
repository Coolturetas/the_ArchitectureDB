const express = require('express')
const router = express.Router()

router.get('/', (req, res) => res.render('index', { user: req.user }))
router.get('/charts', (req, res) => res.render('data-visualization'))

module.exports = router
