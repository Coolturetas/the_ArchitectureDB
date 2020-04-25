const express = require('express')
const router = express.Router()
const Work = require('../models/work.model')
const Trend = require('../models/trend.model')
const Arch = require('../models/architect.model')
const cloudUploader = require('../configs/cloudinary.config')

router.get('/', (req, res, next) => {
	Work.find()
		.then((workFound) => res.render('works/works-index', { workFound }))
		.catch((err) => next(new Error('No se ha encontrado nada', err)))
})

router.get('/new', (req, res, next) => {
	const allPromise = [Arch.find(), Trend.find()]

	Promise.all(allPromise)
		.then((results) => res.render('works/works-add', { archs: results[0], trends: results[1] }))
		.catch((err) => next(new Error('No se han encontrado las opciones para el formulario', err)))
})

router.post('/', cloudUploader.single('photo-work'), (req, res, next) => {
	const newWork = {
		trend: req.body.trend,
		architect: req.body.architect,
		name: req.body.name,
		finished: req.body.finished,
		description: req.body.description,
		workType: req.body.workType,
		picWork: req.file.url,
	}

	Work.create(newWork)
		.then(res.redirect('/works'))
		.catch((err) => next(new Error('No se ha creado nada', err)))
})

module.exports = router
