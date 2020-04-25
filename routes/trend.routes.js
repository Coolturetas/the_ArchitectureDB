const express = require('express')
const router = express.Router()
const Trend = require('../models/trend.model')
const Work = require('../models/work.model')
const cloudUploader = require('../configs/cloudinary.config')

//Print Trend DB
router.get('/', (req, res, next) => {
	Trend.find().then((atFound) => res.render('archTrend/at-index', { atFound }))
})

//Add new trend
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
		.catch((err) => console.log('No se ha creado nada', err))
})

//Show details of each trend
router.get('/show/:id', (req, res, next) => {
	const promiseWork = Work.find({ trend: req.params.id })
	const promiseTrend = Trend.findById(req.params.id)

	Promise.all([promiseTrend, promiseWork])
		.then((data) => res.render('archTrend/at-dets', { trend: data[0], works: data[1] }))
		.catch((err) => next(new Error('No se ha encontrado nada', err)))
})

//Delete
router.post('/delete/:id', (req, res, next) => {
	Trend.findByIdAndRemove(req.params.id)
		.then(res.redirect('/trend'))
		.catch((err) => next(new Error('No se ha borrado nada', err)))
})

//Edit
router.get('/edit/:id', (req, res, next) => {
	Trend.findById(req.params.id)
		.then((toEdit) => res.render('archTrend/at-edit', toEdit))
		.catch((err) => next(new Error('No se ha encontrado nada para editar', err)))
})

router.post('/edit/:id', cloudUploader.single('photo-trend'), (req, res, next) => {
	const editTrend = {
		name: req.body.name,
		picTrend: req.file.url,
		description: req.body.description,
		country: req.body.country,
		bestWork: req.body.bestWork,
		year: req.body.year,
	}
	Trend.findByIdAndUpdate(req.params.id, editTrend, { new: true })
		.then(res.redirect('/trend'))
		.catch((err) => next(new Error('No se ha editado nada', err)))
})

module.exports = router
