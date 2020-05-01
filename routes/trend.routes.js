const express = require('express')
const router = express.Router()
const Trend = require('../models/trend.model')
const Work = require('../models/work.model')
const Comment = require('../models/comment.model')
const cloudUploader = require('../configs/cloudinary.config')

function checkAuth(req, res, next) {
	return req.isAuthenticated() ? next() : res.redirect('/login')
}

//Print Architects DB
router.get('/', (req, res, next) => {
	Trend.find({ isVerified: true }).then((atFound) => res.render('archTrend/at-index', { atFound, user: req.user }))
})

//Add new trend
router.get('/new', checkAuth, (req, res, next) => res.render('archTrend/at-add'))

router.post('/', cloudUploader.single('photo-trend'), checkAuth, (req, res, next) => {
	let verification = true
	req.user.role == 'colaborator' ? (verification = false) : null

	const newTrend = {
		name: req.body.name,
		description: req.body.description,
		country: req.body.country,
		bestWork: req.body.bestWork,
		year: req.body.year,
		isVerified: verification,
	}

	if (req.file === undefined) {
		newTrend.picTrend = 'https://res.cloudinary.com/dxf11hxhh/image/upload/v1587913924/theArchitectureDB/default_dh4el6.jpg'
	} else {
		newTrend.picTrend = req.file.url
	}

	Trend.create(newTrend)
		.then(res.redirect('/trend'))
		.catch((err) => console.log('No se ha creado nada', err))
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
		description: req.body.description,
		country: req.body.country,
		bestWork: req.body.bestWork,
		year: req.body.year,
		isVerified: verification,
	}

	if (req.file) {
		editTrend.picTrend = req.file.url
	}

	Trend.findByIdAndUpdate(req.params.id, editTrend)
		.then(res.redirect('/trend'))
		.catch((err) => next(new Error('No se ha editado nada', err)))
})

///
///Comments
///
//Create comment
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
//Delete comment
router.post('/post-comment/delete/:id', checkAuth, (req, res, next) => {
	const placePosted = req.body.reference
	Comment.findById(req.params.id)
		.then((result) => (result.creatorId == req.user.id || checkIsInRole('editor', 'admin') ? result.id : res.redirect(`/architects/view/${placePosted}`)))
		.then((resultId) => Comment.findByIdAndRemove(resultId))
		.then(() => res.redirect(`/trend/show/${placePosted}`))
		.catch((err) => next(new Error('No se ha borrado tu comentario', err)))
})

//Show details of each trend
router.get('/show/:id', (req, res, next) => {
	const promiseWork = Work.find({ trend: req.params.id })
	const promiseTrend = Trend.findById(req.params.id)
	const promisePost = Comment.find({ postedIn: req.params.id }).populate('creatorId')
	Promise.all([promiseTrend, promiseWork, promisePost])
		.then((data) => res.render('archTrend/at-dets', { trend: data[0], works: data[1], posts: data[2], user: req.user }))
		.catch((err) => next(new Error('No se ha encontrado nada', err)))
})

module.exports = router
