const express = require('express')
const router = express.Router()
const Architect = require('./../models/architect.model')
const Work = require('../models/work.model')
const cloudUploader = require('../configs/cloudinary.config')

//Creation

router.get('/create', (req, res, next) => {
	res.render('./architects/create')
})

router.post('/create', cloudUploader.single('photo-arch'), (req, res, next) => {
	const newArch = {
		name: req.body.name,
		country: req.body.country,
		flagshipWork: req.body.flagshipWork,
		photo: req.file.url,
	}

	Architect.create(newArch)
		.then(() => {
			res.redirect('/architects')
		})
		.catch((err) => {
			next(new Error('No se ha creado arquitecto', err))
		})
})

//Edition

router.get('/edit/:id', (req, res, next) => {
	Architect.findById(req.params.id)
		.then((architect) => {
			res.render('./architects/edit', architect)
		})
		.catch((err) => {
			next(new Error(err))
		})
})

router.post('/edit/:id', cloudUploader.single('photo-arch'), (req, res, next) => {
	const editArch = {
		name: req.body.name,
		country: req.body.country,
		flagshipWork: req.body.flagshipWork,
		photo: req.file.url,
	}

	console.log(editArch)

	Architect.findByIdAndUpdate(req.params.id, editArch, { new: true })
		.then((architect) => {
			res.redirect(`/architects/view/${architect._id}`)
		})
		.catch((err) => {
			next(new Error(err))
		})
})

//Deletion

router.post('/delete/:id', (req, res, next) => {
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
	const promiseWork = Work.find({ architect: req.params.id })
	const promiseArch = Architect.findById(req.params.id)

	Promise.all([promiseArch, promiseWork])
		.then((data) => res.render('architects/detail', { arch: data[0], works: data[1] }))
		.catch((err) => next(new Error('No se ha encontrado nada', err)))
})

module.exports = router
