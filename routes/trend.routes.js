const express = require('express')
const router = express.Router()
const multer = require('multer')
const uploadLocal = multer({ dest: './public/uploads/' })
const Trend = require('../models/trend.model')
const cloudUploader = require('../configs/cloudinary.config')

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

//Print Architects DB
router.get('/', (req, res, next) => {
	Trend.find().then((atFound) => res.render('archTrend/at-index', { atFound }))
})

//Add new architecht
router.get('/new', checkAuth, (req, res, next) => res.render('archTrend/at-add'))
router.post('/', checkAuth, uploadLocal.single('picTrend'), (req, res, next) => {

	let verification = true
	req.user.role == 'colaborator' ? (verification = false) : null
	
	const newTrend = {
		name: req.body.name,
		picTrend: `uploads/${req.file.filename}`,
		description: req.body.description,
		country: req.body.country,
		bestWork: req.body.bestWork,
		year: req.body.year,
		isVerified: verification
	}
	Trend.create(newTrend)
		.then((data) => res.redirect('/trend'))
		.catch((err) => next(new Error('No se ha creado nada, torpe', err)))
})

//Show details of each architect
router.get('/show/:id', (req, res, next) => {
	Trend.findById(req.params.id)
		.then((archId) => res.render('archTrend/at-dets', archId))
		.catch((err) => next(new Error('No se puede mostrar nada', err)))
})

module.exports = router
