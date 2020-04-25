const express = require('express')
const router = express.Router()
const Trend = require('../models/trend.model')
const cloudUploader = require('../configs/cloudinary.config')

//Print Architects DB
router.get('/', (req, res, next) => {
	Trend.find().then((atFound) => res.render('archTrend/at-index', { atFound }))
})

//Add new architecht
router.get('/new', (req, res, next) => res.render('archTrend/at-add'))

router.post('/', cloudUploader.single('photo-trend'), (req, res, next) => {
	const newTrend = {
		name: req.body.name,
		picTrend: req.file.url,
		description: req.body.description,
		country: req.body.country,
		bestWork: req.body.bestWork,
		year: req.body.year,
	}
	console.log(newTrend.picTrend)
	
	Trend.create(newTrend)
		.then(res.redirect('/trend'))
		.catch((err) => console.log('nada de nada', err))
})

//Show details of each architect
router.get('/show/:id', (req, res, next) => {
	Trend.findById(req.params.id)
		.then((archId) => res.render('archTrend/at-dets', archId))
		.catch((err) => next(new Error('No se puede mostrar nada', err)))
})

//Delete

module.exports = router
