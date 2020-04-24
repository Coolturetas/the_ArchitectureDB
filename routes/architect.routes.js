const express = require('express')
const router = express.Router()
const multer = require('multer')
const uploadLocal = multer({ dest: './public/uploads/' })
const Arch = require('../models/arch.model')

//Print Architects DB
router.get('/', (req, res, next) => {
	Arch.find().then((archsFound) => res.render('architects/archs-index', { archsFound }))
})

//Add new architecht
router.get('/new-arch', (req, res, next) => res.render('architects/archs-add'))
router.post('/new-arch', uploadLocal.single('picArch'), (req, res, next) => {
	const newArch = {
		name: req.body.name,
		picArch: `uploads/${req.file.filename}`,
		description: req.body.description,
		country: req.body.country,
		bestWork: req.body.bestWork,
	}

	Arch.create(newArch)
		.then((data) => res.redirect('/'))
		.catch((err) => next(new Error('No se ha creado nada, torpe', err)))
})

//Show details of each architect


module.exports = router
