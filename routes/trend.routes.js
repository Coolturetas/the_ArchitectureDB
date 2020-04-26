const express = require('express')
const router = express.Router()
const Trend = require('../models/trend.model')
const Work = require('../models/work.model')
const Comment = require('../models/comment.model')
const cloudUploader = require('../configs/cloudinary.config')

function checkAuth(req, res, next) {
	return req.isAuthenticated() ? next() : res.redirect('/login')
}

function checkRoles(role) {
	return function (req, res, next) {
		return req.isAuthenticated() && req.user.role === role ? next() : res.redirect('/login')
	}
}

//Print Architects DB
router.get('/', (req, res, next) => {
	Trend.find().then((atFound) => res.render('archTrend/at-index', { atFound }))
})

//Add new trend
router.get('/new', checkAuth, (req, res, next) => res.render('archTrend/at-add'))

router.post('/', cloudUploader.single('photo-trend'), checkAuth, (req, res, next) => {
	let verification = true
	req.user.role == 'colaborator' ? (verification = false) : null

	const newTrend = {
		name: req.body.name,
		picTrend: req.file.url,
		description: req.body.description,
		country: req.body.country,
		bestWork: req.body.bestWork,
		year: req.body.year,
		isVerified: verification,
	}
	console.log(newTrend)

	Trend.create(newTrend)
		.then(res.redirect('/trend'))
		.catch((err) => console.log('No se ha creado nada', err))
})

///
///Comments
///

router.post('/post-comment/:id', checkAuth, (req, res, next) => {
	const newComment = {
		subject: req.body.subject,
		content: req.body.content,
		creatorId: req.user.id,
		postedIn: req.params.id,
	}
	Comment.create(newComment)
		.then(res.redirect(`/trend/show/${newComment.postedIn}`))
		.catch((err) => next(new Error('No se ha posteado comentario', err)))
})



//Show details of each trend
router.get('/show/:id', (req, res, next) => {
	const promiseWork = Work.find({ trend: req.params.id })
	const promiseTrend = Trend.findById(req.params.id)
	const promisePost = Comment.find({ postedIn: req.params.id }).populate('creatorId')

	Promise.all([promiseTrend, promiseWork, promisePost])
		.then((data) => res.render('archTrend/at-dets', { trend: data[0], works: data[1], posts: [2] }))
		.catch((err) => next(new Error('No se ha encontrado nada', err)))
})

//Delete
router.post('/delete/:id', checkAuth, (req, res, next) => {
	if (req.user.role == 'admin' || req.user.role == 'editor') {
		Trend.findByIdAndRemove(req.params.id)
			.then(res.redirect('/trend'))
			.catch((err) => next(new Error('No se ha borrado nada', err)))
	}
})

//Edit
router.get('/edit/:id', checkAuth, (req, res, next) => {
	Trend.findById(req.params.id)
		.then((toEdit) => res.render('archTrend/at-edit', toEdit))
		.catch((err) => next(new Error('No se ha encontrado nada para editar', err)))
})

router.post('/edit/:id', checkAuth, cloudUploader.single('photo-trend'), (req, res, next) => {
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
